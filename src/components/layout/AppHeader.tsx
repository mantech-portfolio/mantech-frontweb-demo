import { Menu } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export default function AppHeader({
    onOpenSidebar,
}: {
    onOpenSidebar: () => void
}) {
    return (
        <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/80 p-4 backdrop-blur">
            <button
                onClick={onOpenSidebar}
                className="rounded-lg p-2 hover:bg-accent md:hidden"
                aria-label="Open menu"
            >
                <Menu size={22} />
            </button>

            <Link to="/" className="font-semibold text-base md:text-lg">
                Mantech Ops Console
            </Link>
        </header>
    )
}
