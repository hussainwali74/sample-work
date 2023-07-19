import React from "react";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <div className="flex">
          {/* sidebar */}

          <div className="bg-[#202123] max-w-sm h-screen overflow-y-auto md:min-w-[20rem]">
            <Sidebar />
          </div>
          {/* client provider */}
          <div className="bg-[#343541] flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
