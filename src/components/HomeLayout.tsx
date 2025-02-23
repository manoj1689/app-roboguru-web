import Navbar from "./HomeNavbar";
import Footer from "./HomeFooter";
import Sidebar from "./Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <ProtectedRoute>

            <Navbar />
            <div className="max-lg:block lg:hidden">
                <Sidebar />
            </div>
            {/* Page Content */}
            <main className="flex mt-20 container mx-auto gap-4  px-4">
                <div className="max-lg:hidden block">
                    <Sidebar />
                </div>
                <div className="flex w-full">
                    {/* Children components will render below the fixed header */}
                    {children}
                </div>

            </main>
            <Footer />
            </ProtectedRoute>

        </>
    );
};

export default Layout;
