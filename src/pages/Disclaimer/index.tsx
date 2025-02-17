import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from "../../components/LandingLayout";
import { useTranslation } from "react-i18next";

const Disclaimer = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Layout>
            <section className="mt-20 px-4 text-white py-4 bg-gradient-to-r from-[#63A7D4] to-[#F295BE]">
                <div
                    onClick={() => handleNavigation("/Landing")}
                    className="flex container mx-auto hover:text-pink-300 font-bold gap-3 items-center text-white cursor-pointer"
                >
                    <span><FaArrowLeft size={16} /></span>
                    <span>{mounted ? t("disclaimer.back") : "Loading..."}</span>
                </div>
                <div className="container mx-auto text-center rounded">
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
                        {mounted ? t("disclaimer.title") : "Loading..."}
                    </h1>
                    <p className="text-md md:text-lg leading-relaxed text-center text-white font-medium">
                        {mounted ? t("disclaimer.effectiveDate") : "Loading..."}
                    </p>
                </div>
            </section>

            <main className="container mx-auto py-8">
                {mounted &&
                    Object.entries(t("disclaimer.sections", { returnObjects: true })).map(([key, section]) => (
                        <section key={key} className="bg-white shadow-md rounded-lg p-4 mb-8">
                            <h2 className="text-2xl font-bold">{section.title}</h2>
                            {section.description && <p className="text-lg leading-relaxed">{section.description}</p>}
                            {section.points && (
                                <ul className="list-disc ml-6 mt-2">
                                    {section.points.map((point: string, index: number) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}

                {mounted && (
                    <section className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl font-bold">{t("disclaimer.sections.contact.title")}</h2>
                        <p className="text-lg leading-relaxed">{t("disclaimer.sections.contact.description")}</p>
                        <ul className="list-disc ml-6 mt-2">
                            <li><strong>{t("disclaimer.sections.contact.general.email")}</strong></li>
                            <li><strong>{t("disclaimer.sections.contact.general.phone")}</strong></li>
                            <li><strong>{t("disclaimer.sections.contact.general.address")}</strong></li>
                        </ul>
                        <p className="text-lg leading-relaxed mt-4">
                            <strong>{t("disclaimer.sections.contact.legal.title")}</strong>
                        </p>
                        <ul className="list-disc ml-6 mt-2">
                            <li><strong>{t("disclaimer.sections.contact.legal.email")}</strong></li>
                            <li><strong>{t("disclaimer.sections.contact.legal.phone")}</strong></li>
                            <li><strong>{t("disclaimer.sections.contact.legal.address")}</strong></li>
                        </ul>
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default Disclaimer;
