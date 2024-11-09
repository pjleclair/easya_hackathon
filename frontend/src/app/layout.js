"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import { AppConfig, UserSession } from "@stacks/connect";

import { UserContext } from "./UserContext";
import Navbar from "./components/Navbar";

import { MarketProvider } from "./MarketContext";
import ConnectWallet from "./components/ConnectWallet";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState({});

  const appConfig = new AppConfig();
  const userSession = new UserSession({ appConfig });

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen text-white bg-gradient-radial from-white via-pink-200 to-indigo-100 ">
          {userData !== undefined ? (
            <UserContext.Provider value={{ userData, userSession }}>
              <MarketProvider>
                <div className="fixed top-0 right-0">
                  <ConnectWallet
                    userSession={userSession}
                    userData={userData}
                    setUserData={setUserData}
                  />
                </div>
                <div className="flex">
                  <Navbar />
                  {children}
                </div>
              </MarketProvider>
            </UserContext.Provider>
          ) : (
            ""
          )}
        </div>
      </body>
    </html>
  );
}
