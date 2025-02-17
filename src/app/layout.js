"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import DataProvider from "@/contexts/data-provider";
import Footer from "@/components/footer";
import Panel from "@/components/panel";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
            >
                <DataProvider>
                    <Navbar />
                    <div className="flex-1 h-full overflow-y-auto">
                            {children}
                            <Panel />
                        <Footer />
                    </div>
                </DataProvider>
            </body>
        </html>
    );
}
