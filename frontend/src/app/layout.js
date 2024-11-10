"use client";

import "./globals.css";

import { Toaster } from 'react-hot-toast';

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
        <div className="min-h-screen text-black bg-gradient-radial from-[#5761b2] to-[#1fc5a8] ">
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
          <Toaster position="bottom-right"/>
        </div>
      </body>
    </html>
  );
}
