export default function LabelValueRow({
    label,
    value,
}: {
    label: string
    value: React.ReactNode
}) {
    return (
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span>{value}</span>
        </div>
    )
}
