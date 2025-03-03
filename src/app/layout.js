import { ClerkProvider } from "@clerk/nextjs";
import MainNavBar from "../components/navbar/MainNavBar";
import "./globals.css";

export const metadata = {
  title: "GoodsHub Store | All-in-One",
  description:
    "GoodsHub Store provides various categories of products starting with groceries and ending with cars!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="w-screen h-screen box-border">
          {" "}
          <MainNavBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
