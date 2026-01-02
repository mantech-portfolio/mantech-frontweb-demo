import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
    Home,
    Menu,
    X,
    ShieldAlert,
    ServerCog,
} from 'lucide-react'

type AppShellProps = {
    children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="min-h-dvh bg-background text-foreground flex flex-col">
            {/* ================= Header ================= */}
            <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/80 p-4 backdrop-blur">
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-lg p-2 hover:bg-accent md:hidden"
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>

                <Link to="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-base md:text-lg">Mantech Ops Console</span>
                </Link>
            </header>

            {/* ================= Layout ================= */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <aside
                    className={`fixed left-0 top-0 z-50 h-full w-80 bg-background shadow-2xl transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:shadow-none md:border-r`}
                >
                    <div className="flex items-center justify-between border-b p-4 md:hidden">
                        <div className="text-lg font-bold">Navigation</div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg p-2 hover:bg-accent"
                            aria-label="Close menu"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-3">
                        <NavItem to="/" onClick={() => setIsOpen(false)} icon={<Home size={18} />}>
                            Home
                        </NavItem>

                        <Section title="MDRM-IT (운영자동화)">
                            <NavItem to="/ops/it/dashboard" onClick={() => setIsOpen(false)} icon={<ServerCog size={18} />}>
                                Dashboard
                            </NavItem>
                            <NavItem to="/ops/it/workflows" onClick={() => setIsOpen(false)} icon={<ServerCog size={18} />}>
                                Workflows
                            </NavItem>
                            <NavItem to="/ops/it/batch" onClick={() => setIsOpen(false)} icon={<ServerCog size={18} />}>
                                Batch
                            </NavItem>
                            <NavItem to="/ops/it/checks" onClick={() => setIsOpen(false)} icon={<ServerCog size={18} />}>
                                Daily Checks
                            </NavItem>
                            <NavItem to="/ops/it/deploy" onClick={() => setIsOpen(false)} icon={<ServerCog size={18} />}>
                                Deploy
                            </NavItem>
                        </Section>

                        <Section title="MDRM-DR (재해복구)">
                            <NavItem to="/ops/dr/overview" onClick={() => setIsOpen(false)} icon={<ShieldAlert size={18} />}>
                                DR Overview
                            </NavItem>
                            <NavItem to="/ops/dr/runbooks" onClick={() => setIsOpen(false)} icon={<ShieldAlert size={18} />}>
                                Runbooks
                            </NavItem>
                            <NavItem to="/ops/dr/drills" onClick={() => setIsOpen(false)} icon={<ShieldAlert size={18} />}>
                                DR Drills
                            </NavItem>
                        </Section>

                        <Section title="Docs">
                            <NavItem to="/build-notes" onClick={() => setIsOpen(false)} icon={<ServerCog size={18} />}>
                                Build Notes
                            </NavItem>
                        </Section>
                    </nav>
                </aside>

                {/* ================= Main Content ================= */}
                <main className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-8">
                    <div className="mx-auto w-full max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

/* ================= Sub Components ================= */

function NavItem(props: {
    to: string
    onClick: () => void
    icon: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <Link
            to={props.to}
            onClick={props.onClick}
            className="mb-2 flex items-center gap-3 rounded-lg p-3 hover:bg-accent"
            activeProps={{
                className:
                    'mb-2 flex items-center gap-3 rounded-lg p-3 bg-accent font-medium',
            }}
        >
            {props.icon}
            <span>{props.children}</span>
        </Link>
    )
}

function Section(props: { title: string; children: React.ReactNode }) {
    return (
        <div className="mt-6">
            <div className="px-2 text-xs font-semibold text-muted-foreground">
                {props.title}
            </div>
            {props.children}
        </div>
    )
}
