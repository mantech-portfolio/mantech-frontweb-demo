import { useState } from 'react'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'

type AppShellProps = {
    children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-dvh bg-background text-foreground flex flex-col">
            <AppHeader onOpenSidebar={() => setSidebarOpen(true)} />

            <div className="flex flex-1">
                <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-8">
                    <div className="mx-auto w-full max-w-6xl">{children}</div>
                </main>
            </div>
        </div>
    )
}
