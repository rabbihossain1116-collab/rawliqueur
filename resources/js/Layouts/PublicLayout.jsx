import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function PublicLayout({ children, lang, setLang }) {
    return (
        <div className="min-h-screen bg-[#1a0a0a] text-white">
            <Header lang={lang} setLang={setLang} />
            <main>{children}</main>
            <Footer lang={lang} />
        </div>
    );
}
