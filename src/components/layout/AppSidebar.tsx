import { X } from 'lucide-react'
import SidebarNav from './SidebarNav'

export default function AppSidebar({
    open,
    onClose,
}: {
    open: boolean
    onClose: () => void
}) {
    return (
        <aside
            className={`
        fixed left-0 top-0 z-50 h-full w-80 bg-background
        transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0 md:border-r
      `}
        >
            <div className="flex items-center justify-between border-b p-4 md:hidden">
                <span className="font-semibold">Navigation</span>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent">
                    <X size={22} />
                </button>
            </div>

            <SidebarNav onNavigate={onClose} />
        </aside>
    )
}
