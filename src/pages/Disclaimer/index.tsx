import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from '../../components/LandingLayout'
const Disclaimer = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <>
        <Layout>
 
            <section className="mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                <div
                    onClick={() => handleNavigation("/Landing")}
                    className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                >
                    <span><FaArrowLeft size={16} /></span>
                    <span>Back</span>
                </div>
                <div className="container mx-auto text-center rounded">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">Disclaimer</h1>
                    <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium">
                        Effective Date: January 1, 2025 | Last Updated: January 1, 2025
                    </p>
                </div>
            </section>
            
            <main className="container mx-auto py-8">
                <div className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold">Educational Purpose Only</h2>
                    <p className="text-lg leading-relaxed">
                        RoboGuru is an AI-powered educational platform designed to assist students, teachers, and learners with study resources, homework help, and exam preparation.
                    </p>
                    <ul className="list-disc ml-6 mt-2">
                        <li>The content, study materials, and AI-generated responses are provided for informational and educational purposes only.</li>
                        <li>RoboGuru does not replace professional academic guidance from teachers, educators, or subject-matter experts.</li>
                        <li>While we strive for accuracy, we do not guarantee that all answers, explanations, or solutions are error-free or comprehensive.</li>
                    </ul>
                </div>

                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold">No Guarantees & Warranties</h2>
                    <p className="text-lg leading-relaxed">
                        RoboGuru is provided "as is" without any guarantees or warranties, express or implied.
                    </p>
                    <ul className="list-disc ml-6 mt-2">
                        <li>We do not guarantee uninterrupted, error-free, or always-available services.</li>
                        <li>We do not guarantee that our AI-generated solutions are always accurate, complete, or suitable for every academic need.</li>
                        <li>Users assume full responsibility for how they use the app's content and services.</li>
                    </ul>
                </section>

                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold">Limitation of Liability</h2>
                    <p className="text-lg leading-relaxed">
                        By using RoboGuru, you agree that:
                    </p>
                    <ul className="list-disc ml-6 mt-2">
                        <li>We are not liable for any direct, indirect, incidental, consequential, or special damages arising from the use of the app.</li>
                        <li>We are not responsible for any incorrect answers, misinterpretations, or any loss incurred due to reliance on RoboGuru’s AI-generated solutions.</li>
                        <li>We do not endorse any third-party links, content, or advertisements that may appear on the platform.</li>
                    </ul>
                </section>

                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold">Third-Party Services & Advertisements</h2>
                    <ul className="list-disc ml-6 mt-2">
                        <li>RoboGuru may integrate third-party services, APIs, or advertisements to enhance user experience.</li>
                        <li>We do not control, endorse, or assume responsibility for the content, accuracy, or policies of third-party services.</li>
                        <li>Users engaging with third-party services do so at their own risk and should review their respective terms and policies.</li>
                    </ul>
                </section>

                <section className="bg-white shadow-md rounded-lg p-4 mb-8">
                    <h2 className="text-2xl font-bold">User Responsibilities</h2>
                    <ul className="list-disc ml-6 mt-2">
                        <li>Users are responsible for using RoboGuru ethically and legally.</li>
                        <li>Any misuse, including unauthorized content distribution, plagiarism, or inappropriate usage, is strictly prohibited and may result in account suspension.</li>
                        <li>We reserve the right to update or modify this Disclaimer at any time without prior notice. Continued use of the app signifies acceptance of the latest version.</li>
                    </ul>
                </section>

                <section className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                    <p className="text-lg leading-relaxed">
                        For any concerns, queries, or feedback regarding this Disclaimer, please contact us:
                    </p>
                    <ul className="list-disc ml-6 mt-2">
                        <li><strong>Email:</strong> support@roboguru.com</li>
                        <li><strong>Phone:</strong> +1 234 567 890</li>
                        <li><strong>Address:</strong> 123 RoboGuru Lane, AI City, Techland</li>
                    </ul>
                    <p className="text-lg leading-relaxed mt-4"><strong>For legal inquiries:</strong></p>
                    <ul className="list-disc ml-6 mt-2">
                        <li><strong>Email:</strong> admin@eramlabs.com</li>
                        <li><strong>Phone:</strong> +91-8750860676</li>
                        <li><strong>Address:</strong> 163 - GF Pocket 2, Jasola, New Delhi 1100025</li>
                    </ul>
                </section>
            </main>
 

        </Layout>
         
        </>
    );
};

export default Disclaimer;
