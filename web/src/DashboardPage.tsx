import {useState, useEffect} from 'react'
import type { Dashboard } from './dashboardType.ts';
import type { Invoice } from './invoiceTypes.ts';
import InvoiceTable from './InvoiceTable.tsx';
import SummaryCardy from './SummaryCard.tsx';
import InvoiceSummaryTable from './invoiceSummaryTable.tsx';
import { formatCurrency } from './utils.ts';


// const invoices: Invoice[] = [{
//   id: 1,
//   amount: 125000,
//   status: 'pending',
//   issueDate: '2026-05-01', 
//   dueDate: '2026-06-03',
//   customer: {
//     id: 7,
//     name: 'Construtora Meridiano',
//     email: 'contato@meridiano.com'
//   }
// }, {
//   id: 2,
//   amount: 35000,
//   status: 'paid',
//   issueDate: '2026-06-12',
//   dueDate: '2026-09-08',
//   customer: {
//     id: 7,
//     name: 'Construtora Meridiano',
//     email: 'contato@meridiano.com'
//   }
// }];

     
 export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);



  

  useEffect(() => { 
    async function getDashboard() {

      try {
          const response = await fetch('/api/dashboard'); 
          if (!response.ok) {

    
             setError('Não foi possivel carregar faturas.');
             setLoading(false);
             return; 
          }


         const datas = await response.json();
         setDashboard(datas);    


      }catch {
        setError('Não foi possível carregar faturas.')

      }
      
      
       setLoading(false);
  }
 

  getDashboard();
}, []);

if(loading) return <p>Carregando painel inicial...</p>

if (error || dashboard === null) return <p>{error}</p>

return <>

<h1>Painel Inicial</h1>

<div className='summary-cards'>
  <SummaryCardy label='Total recebido:' value={formatCurrency(dashboard?.totals.paid)} />
  <SummaryCardy label='Total pendente:' value={formatCurrency(dashboard?.totals.pending)}/>
  <SummaryCardy label='Faturas:' value={String(dashboard.totals.invoiceCount)}/>
  <SummaryCardy label='Clientes:' value={String(dashboard.totals.customerCount)}/>
</div>

<div className='summary-table'>
<InvoiceSummaryTable
title='Faturas recentes'
dateLabel='Emissão'
invoices={dashboard.recentInvoices}
date={(invoice) => invoice.issueDate}

/>

<InvoiceSummaryTable
title='Faturas atrasadas'
dateLabel='Vencimento'
invoices={dashboard.overdueInvoices}
date={(invoice) => invoice.dueDate}

/>
</div>
</>

  
   
 }



