import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-white font-poppins text-ink antialiased">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
