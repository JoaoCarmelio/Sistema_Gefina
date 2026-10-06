import {useState, useEffect} from 'react'

import type { Invoice } from './invoiceTypes.ts';
import InvoiceTable from './InvoiceTable.tsx';
import { useFormState } from 'react-dom';


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
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);



  

  useEffect(() => { 
    async function getInvoices() {

      try {
          const response = await fetch('/api/invoices'); 
          if (!response.ok) 
             setError('Não foi possivel carregar faturas.')


         const datas = await response.json();
         setInvoices(datas);    


      }catch {
        setError('Não foi possível carregar faturas.')

      }
      
      
      
  }
  setLoading(false);

  getInvoices();
}, []);

if(loading) return <p>Carregando faturas...</p>

if (error) return <p>{error}</p>


 
 
 return <InvoiceTable invoices={invoices}/>
  
   
 }


