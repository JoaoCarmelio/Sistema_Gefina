interface SummaryCard {
    label: string;
    value: string;
}

export default function SummaryCard(props: SummaryCard) {
    return <div>
        <p>{props.label}</p>
        <p className="numeric">{props.value}</p>

      
    </div>;
}