
import { Inter } from "next/font/google";
import '.././globals.css';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen bg-slate-800">
            <Navbar/>
            {children}
          </div>
        </body>
    </html>
  );
}
