import { Home, ServerCog, ShieldAlert } from 'lucide-react'
import NavItem from '@/components/navigation/NavItem'
import NavSection from '@/components/navigation/NavSection'

export default function SidebarNav({
    onNavigate,
}: {
    onNavigate: () => void
}) {
    return (
        <nav className="p-3 text-sm md:text-base">
            <NavItem to="/" icon={<Home size={18} />} onClick={onNavigate}>
                Home
            </NavItem>

            <NavSection title="MDRM-IT (운영자동화)">
                <NavItem to="/ops/it/dashboard" icon={<ServerCog size={18} />} onClick={onNavigate}>
                    Dashboard
                </NavItem>
                <NavItem to="/ops/it/workflows" icon={<ServerCog size={18} />} onClick={onNavigate}>
                    Workflows
                </NavItem>
                <NavItem to="/ops/it/batch" icon={<ServerCog size={18} />} onClick={onNavigate}>
                    Batch
                </NavItem>
                <NavItem to="/ops/it/checks" icon={<ServerCog size={18} />} onClick={onNavigate}>
                    Daily Checks
                </NavItem>
                <NavItem to="/ops/it/deploy" icon={<ServerCog size={18} />} onClick={onNavigate}>
                    Deploy
                </NavItem>
            </NavSection>

            <NavSection title="MDRM-DR (재해복구)">
                <NavItem to="/ops/dr/overview" icon={<ShieldAlert size={18} />} onClick={onNavigate}>
                    DR Overview
                </NavItem>
                <NavItem to="/ops/dr/runbooks" icon={<ShieldAlert size={18} />} onClick={onNavigate}>
                    Runbooks
                </NavItem>
                <NavItem to="/ops/dr/drills" icon={<ShieldAlert size={18} />} onClick={onNavigate}>
                    DR Drills
                </NavItem>
            </NavSection>
        </nav>
    )
}
