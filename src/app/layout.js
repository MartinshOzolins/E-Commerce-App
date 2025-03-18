import { ClerkProvider } from "@clerk/nextjs";
import MainNavBar from "../../components/navbar/MainNavBar";
import "./globals.css";
import CartContextProvider from "../../contexts/CartContextProvider";
import Footer from "../../components/static/Footer";

export const metadata = {
  title: "GoodsHub Store | All-in-One",
  description:
    "GoodsHub Store provides various categories of products starting with groceries and ending with cars!",
};

export default function RootLayout({ children }) {
  return (
    <CartContextProvider>
      <ClerkProvider>
        <html lang="en">
          <body className="w-screen h-screen box-border">
            {" "}
            <MainNavBar />
            {children}
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </CartContextProvider>
  );
}
