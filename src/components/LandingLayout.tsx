import Navbar from "./LandingNavbar";
import Footer from "./LandingFooter";
import Chatbot from "./Chatbot";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />

            {/* Page Content */}
            <main className="mt-20">
                {/* Children components will render below the fixed header */}
                {children}
            </main>
            <Chatbot/>
            <Footer />
        </>
    );
};

export default Layout;
