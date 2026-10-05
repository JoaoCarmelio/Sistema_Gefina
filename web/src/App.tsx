import type { Invoice } from './invoiceTypes.ts';
import InvoiceTable from './InvoiceTable.tsx';


const invoices: Invoice[] = [{
  id: 1,
  amount: 125000,
  status: 'pending',
  issueDate: '2026-05-01',
  dueDate: '2026-06-03',
  customer: {
    id: 7,
    name: 'Construtora Meridiano',
    email: 'contato@meridiano.com'
  }
}, {
  id: 2,
  amount: 35000,
  status: 'paid',
  issueDate: '2026-06-12',
  dueDate: '2026-09-08',
  customer: {
    id: 7,
    name: 'Construtora Meridiano',
    email: 'contato@meridiano.com'
  }
}];

     
 export default function App() {
    return <InvoiceTable Invoice={invoices}/>
 }


