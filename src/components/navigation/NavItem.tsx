import { Link } from '@tanstack/react-router'

export default function NavItem({
    to,
    icon,
    children,
    onClick,
}: {
    to: string
    icon: React.ReactNode
    children: React.ReactNode
    onClick: () => void
}) {
    return (
        <Link
            to={to}
            onClick={onClick}
            className="mb-1 flex items-center gap-3 rounded-lg p-2 md:p-3 hover:bg-accent"
            activeProps={{ className: 'bg-accent font-medium' }}
        >
            {icon}
            <span>{children}</span>
        </Link>
    )
}
