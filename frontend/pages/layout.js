import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <main className="flex flex-grow flex-col ">{children}</main>
      <Footer />
    </div>
  );
}
