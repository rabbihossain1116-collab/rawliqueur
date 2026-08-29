import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function PublicLayout({ children, onSubmitTalent }) {
    return (
        <div className="min-h-screen bg-white font-poppins text-ink antialiased">
            <Header onSubmitTalent={onSubmitTalent} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
