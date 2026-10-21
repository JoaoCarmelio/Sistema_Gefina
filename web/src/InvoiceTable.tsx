import type{Invoice} from './invoiceTypes.ts';
import InvoiceRow from './InvoiceRow.tsx';


interface InvoiceTableProps {
        invoices: Invoice[];

}

export default function InvoiceTable(props: InvoiceTableProps) {


return <table>
    <thead>
    <tr>
        <th>Cliente</th>
        <th>Valor</th>
        <th>Data de emissão</th>
        <th>data de Vencimento</th>
        <th>Situação</th>
    </tr>
    </thead>

    <tbody>
        {props.invoices.map(invoice => (
            <InvoiceRow invoice={invoice}
            key={invoice.id}
            
            
            />
        ))}
    </tbody>
</table>
}