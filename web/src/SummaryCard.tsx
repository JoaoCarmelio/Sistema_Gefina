interface SummaryCard {
    label: string;
    value: string;
}

export default function SummaryCard(props: SummaryCard) {
    return <div className="card">
        <p className="card-label">{props.label}</p>
        <p className="numeric card-value">{props.value}</p>

      
    </div>;
}