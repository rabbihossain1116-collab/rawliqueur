import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function PublicLayout({ children, lang, setLang, onOpenSubmit }) {
    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <Header lang={lang} setLang={setLang} onOpenSubmit={onOpenSubmit} />
            <main>{children}</main>
            <Footer lang={lang} />
        </div>
    );
}
