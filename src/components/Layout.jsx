import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout({ children }) {
    return (
        <div className="layout">
            <Navbar />
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    );
}