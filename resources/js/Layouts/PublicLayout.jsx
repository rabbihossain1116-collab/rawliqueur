import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

/**
 * PublicLayout — chrome for every public page.
 *
 * Language is no longer threaded through here: it lives in the `useLang` store,
 * so the header, footer and page all read it independently. That removed the
 * prop-drilling that every new page previously had to re-implement.
 *
 * @param {object} props
 * @param {() => void} [props.onOpenSubmit] Passed through to the header and
 *   footer so their submit affordances open the modal in place. Pages that do
 *   not mount the modal omit it and the affordances link to `/#submit` instead.
 */
export default function PublicLayout({ children, overHero = false, onOpenSubmit }) {
    return (
        <div className="min-h-screen bg-paper text-ink">
            <Header onOpenSubmit={onOpenSubmit} overHero={overHero} />

            <main>{children}</main>

            <Footer onOpenSubmit={onOpenSubmit} />
        </div>
    );
}
