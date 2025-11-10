import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeProvider from "../context/ThemeProvider"; // Changed from named to default import

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <main className="flex-1 p-4 container mx-auto">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

