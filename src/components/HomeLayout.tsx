import Navbar from "./HomeNavbar";
import Footer from "./HomeFooter";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />

            {/* Page Content */}
            <main className="flex mt-20  px-4">
                {/* Children components will render below the fixed header */}
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
