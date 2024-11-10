;; Constants
(define-constant COLLATERAL_RATIO u110) ;; 110% collateral requirement
(define-constant bUSD_RATE u10) ;; Fixed bUSD rate
(define-constant OWNER 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM) ;; Owner address
(define-constant PRICE_ADJUSTMENT u10) ;; Price adjustment factor

;; Maps
(define-map options uint {quantity: uint, price: uint})
(define-map holdings {user: principal, option-id: uint} uint)
(define-map collateral {user: principal} {sBTC_locked: uint, bUSD_minted: uint, id: uint})
(define-map user_id_map uint principal) ;; Map stake `id` to user principal

;; Data variables
(define-data-var next_id uint u0)

;; Oracle function to fetch BTC price (stubbed here for simplicity)
(define-read-only (fetch-price-btc)
  (let (
    (height block-height)
    ;; Calculate a pseudo-random price between u7 and u14
    (price (+ u7 (mod height u8))) ;; u8 because (14 - 7 + 1) = 8 possible values
  )
    price
  )
)


;; Stake sBTC to mint bUSD
(define-public (stake (amount uint))
  (let (
        (btc-price (fetch-price-btc)) ;; Fetch BTC price
        (collateral-value (* amount btc-price))
        ;; Calculate required collateral (collateral-value * COLLATERAL_RATIO / 100)
        (required-collateral (/ (* collateral-value u100) COLLATERAL_RATIO))
        (bUSD_mint (/ collateral-value bUSD_RATE))
        (stake-id (var-get next_id))
      )
    (if (>= (stx-get-balance tx-sender) amount)
        (begin
          ;; Mint bUSD for the user and store collateral
          (stx-transfer? amount tx-sender OWNER)
          (map-set collateral {user: tx-sender} {sBTC_locked: amount, bUSD_minted: bUSD_mint, id: stake-id})
          ;; Map stake id to user
          (map-set user_id_map stake-id tx-sender)
          (var-set next_id (+ stake-id u1))
          (ok bUSD_mint)
        )
        (err u2) ;; Error: Insufficient collateral
    )
  )
)

;; Withdraw your bUSD as back to STX
(define-public (withdraw (amount uint))
  (let (
        ;; Fetch user's collateral details
        (collateral-data (map-get? collateral {user: tx-sender}))
      )
    (if (is-some collateral-data)
        (let (
              (current-collateral (unwrap! collateral-data (err u3))) ;; Should not happen
              (sBTC_locked (get sBTC_locked current-collateral))
              (bUSD_minted (get bUSD_minted current-collateral))
              (stake-id (get id current-collateral))
            )
          (if (>= sBTC_locked amount)
              (let (
                    (btc-price (fetch-price-btc)) ;; Fetch BTC price
                    (collateral-value (* amount btc-price))
                    ;; Calculate the amount of bUSD to burn
                    (bUSD_burn (/ collateral-value bUSD_RATE))
                  )
                ;; Check if the user has enough bUSD minted to burn
                (if (>= bUSD_minted bUSD_burn)
                    (begin
                      ;; Transfer STX from OWNER back to tx-sender
                      (stx-transfer? amount OWNER tx-sender)
                      ;; Burn bUSD from the user via the bUSD token contract
                      (let ((burn-result (contract-call? BUSD_CONTRACT burn tx-sender bUSD_burn)))
                        (match burn-result
                          burn-success
                          (begin
                            ;; Update the collateral map
                            (map-set collateral {user: tx-sender}
                              {
                                sBTC_locked: (- sBTC_locked amount),
                                bUSD_minted: (- bUSD_minted bUSD_burn),
                                id: stake-id
                              })
                            ;; If sBTC_locked is now zero, remove the collateral entry
                            (if (is-eq (- sBTC_locked amount) u0)
                                (begin
                                  (map-delete collateral {user: tx-sender})
                                  (map-delete user_id_map stake-id)
                                )
                                nop)
                            (ok amount)
                          )
                          (err e)
                          (err e)
                        )
                      )
                    )
                    (err u4) ;; Error: Insufficient bUSD to burn
                )
              )
              (err u5) ;; Error: Insufficient staked amount to withdraw
          )
        )
        (err u6) ;; Error: No collateral found for user
    )
  )
)


;; Owner-only function to create option
(define-public (create-option (option-id uint) (quantity uint))
  (if (is-eq tx-sender OWNER)
      (if (is-some (map-get? options option-id))
          (err u3) ;; Error: Option ID exists
          (begin
            ;; Initialize option with price of 5000 (0.5 USD or 5 bUSD at rate of 10)
            (map-set options option-id {quantity: quantity, price: u5000})
            (ok option-id)
          )
      )
      (err u4) ;; Error: Unauthorized
  )
)

;; Adjust option price
(define-private (adjust-price (current-price uint) (quantity uint) (is-buy bool))
  (if is-buy
      (+ current-price (* quantity PRICE_ADJUSTMENT))
      (if (> current-price (* quantity PRICE_ADJUSTMENT))
          (- current-price (* quantity PRICE_ADJUSTMENT))
          u0)
  )
)

;; Buy option with bUSD
(define-public (buy-option (option-id uint) (quantity uint))
  (match (map-get? options option-id)
    option-data
    (let (
          (cost (* quantity (get price option-data)))
          (user-collateral (unwrap! (map-get? collateral {user: tx-sender}) (err u5)))
          (bUSD_balance (get bUSD_minted user-collateral))
         )
      (if (>= bUSD_balance cost)
          (let (
                (new-quantity (+ (get quantity option-data) quantity))
                (new-price (adjust-price (get price option-data) quantity true))
                (new-holding (+ (default-to u0 (map-get? holdings {user: tx-sender, option-id: option-id})) quantity))
               )
            (begin
              ;; Deduct bUSD, update holdings, and adjust option price
              (map-set collateral {user: tx-sender}
                {
                  sBTC_locked: (get sBTC_locked user-collateral),
                  bUSD_minted: (- bUSD_balance cost),
                  id: (get id user-collateral)
                })
              (map-set options option-id {quantity: new-quantity, price: new-price})
              (map-set holdings {user: tx-sender, option-id: option-id} new-holding)
              (ok new-holding)
            )
          )
          (err u6) ;; Error: Insufficient bUSD balance
      )
    )
    (err u7) ;; Error: Option does not exist
  )
)

;; Sell option and receive bUSD
(define-public (sell-option (option-id uint) (quantity uint))
  (match (map-get? options option-id)
    option-data
    (let ((user-holding (default-to u0 (map-get? holdings {user: tx-sender, option-id: option-id}))))
      (if (>= user-holding quantity)
          (let (
                (new-quantity (- (get quantity option-data) quantity))
                (new-price (adjust-price (get price option-data) quantity false))
                (user-collateral (unwrap! (map-get? collateral {user: tx-sender}) (err u5)))
                (proceeds (* quantity (get price option-data)))
               )
            (begin
              ;; Add proceeds in bUSD, update holdings, and adjust option price
              (map-set collateral {user: tx-sender}
                {
                  sBTC_locked: (get sBTC_locked user-collateral),
                  bUSD_minted: (+ (get bUSD_minted user-collateral) proceeds),
                  id: (get id user-collateral)
                })
              (map-set options option-id {quantity: new-quantity, price: new-price})
              (map-set holdings {user: tx-sender, option-id: option-id} (- user-holding quantity))
              (ok (- user-holding quantity))
            )
          )
          (err u8) ;; Error: Insufficient holdings
      )
    )
    (err u7) ;; Error: Option does not exist
  )
)

;; Read-only function to get option details
(define-read-only (get-option (option-id uint))
  (map-get? options option-id)
)

;; Read-only function to get holdings for tx-sender
(define-read-only (get-holding (option-id uint))
  (default-to u0 (map-get? holdings {user: tx-sender, option-id: option-id}))
)

;; Read-only function to get a stake by ID
(define-read-only (get-stake-by-id (stake-id uint))
  (let ((user-address (map-get? user_id_map stake-id)))
    (if (is-some user-address)
        (let ((user (unwrap-panic user-address)))
          (map-get? collateral {user: user})
        )
        none
    )
  )
)

(define-public (call-bluff (id uint))
  (let ((user-address (map-get? user_id_map id)))
    (if (is-some user-address)
        (let ((user (unwrap-panic user-address)))
          (match (map-get? collateral {user: user})
            stake-details
            (let (
                  (btc-price (fetch-price-btc))
                  ;; Calculate required collateral: (bUSD_minted * bUSD_RATE * COLLATERAL_RATIO) / 100
                  (collateral-required (/ (* (get bUSD_minted stake-details) bUSD_RATE COLLATERAL_RATIO) u100))
                  (collateral-value (* (get sBTC_locked stake-details) btc-price))
                 )
              (if (< collateral-value collateral-required)
                  (begin
                    ;; Liquidate sBTC and reward caller
                    (map-set collateral {user: tx-sender}
                      {
                        sBTC_locked: (/ (* (get sBTC_locked stake-details) u9) u10), ;; Reward caller with 90%
                        bUSD_minted: u0,
                        id: (get id stake-details)
                      })
                    (map-delete collateral {user: user})
                    (map-delete user_id_map id)
                    (ok "Bluff called and rewarded")
                  )
                  (err u10) ;; Error: Incorrect bluff
              )
            )
            (err u9) ;; Error: Stake not found
          )
        )
        (err u9) ;; Error: Stake not found
    )
  )
)

