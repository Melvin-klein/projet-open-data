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
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <DataProvider>
                    <Navbar />
                    {children}
                    <Panel />
                </DataProvider>
                <Footer />
            </body>
        </html>
    );
}
