import Footer from "./footer";
import Header from "./header";
import Search from "./search";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}