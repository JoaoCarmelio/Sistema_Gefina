import type{Invoice} from './invoiceTypes.ts';
import InvoiceRow from './InvoiceRow.tsx';


interface InvoiceTableProps {
    Invoice: Invoice[];

}

export default function InvoiceTable(props: InvoiceTableProps) {


return <table>
    <thead>
    <tr>
        <td>Cliente</td>
        <td>Valor</td>
        <td>Data de emissão</td>
        <td>data de Vencimento</td>
        <td>Situação</td>
    </tr>
    </thead>

    <tbody>
        {props.Invoice.map(invoice => (
            <InvoiceRow invoice={invoice}
            key={invoice.id}
            
            
            />
        ))}
    </tbody>
</table>
}