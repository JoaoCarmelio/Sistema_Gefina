import { Router } from 'express';
type InvoiceStatus = 'pending' | 'paid';
import pool from './database.ts'; 



interface Customer {
  id: number;
  name: string;
  email: string;
}

interface Invoice {
  id: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  customer: Customer;
}

interface InvoiceRow {
  id: number;
  amount: number;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
}


const baseQuery = `
  SELECT
    invoices.id,
    invoices.amount,
    invoices.status,
    invoices.issue_date,
    invoices.due_date,
    customers.id AS customer_id,
    customers.name AS customer_name,
    customers.email AS customer_email
  FROM invoices
  JOIN customers
  ON customers.id = invoices.customer_id
  `;


// const invoices: Invoice[] = [
//   {
//     id: 1,
//     amount: 125000,
//     status: 'pending',
//     issueDate: '2026-06-01',
//     dueDate: '2026-06-15',
//     customer: {
//       id: 1,
//       name: 'Construtora Meridiano',
//       email: 'contato@meridiano.com.br',
//     },
//   },
//   {
//     id: 2,
//     amount: 348000,
//     status: 'paid',
//     issueDate: '2026-05-12',
//     dueDate: '2026-06-11',
//     customer: {
//       id: 1,
//       name: 'Construtora Meridiano',
//       email: 'contato@meridiano.com.br',
//     },
//   },
//   {
//     id: 3,
//     amount: 96500,
//     status: 'pending',
//     issueDate: '2026-06-20',
//     dueDate: '2026-07-20',
//     customer: {
//       id: 2,
//       name: 'Gráfica Aurora',
//       email: 'contato@graficaaurora.com.br',
//     },
//   },
// ];

export function toInvoice(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    amount: row.amount,
    status: row.status,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    customer: {
      id: row.customer_id,
      name: row.customer_name,
      email: row.customer_email
    }
  }
}

export async function findAllInvoices(): Promise<Invoice[]> {
  const connect = await pool.query<InvoiceRow>(`${baseQuery} ORDER BY invoices.issue_date DESC`);

  const invoices: Invoice[] = [];
  
  connect.rows.forEach((invoice) =>{
    invoices.push(toInvoice(invoice));
  });

  return invoices; 

 
};

export async function findInvoiceById(id: number): Promise<Invoice | undefined> {
const connect = await pool.query<InvoiceRow>(`${baseQuery} WHERE invoices.id = $1;`, [id]);

  if(!connect.rows.length) return undefined

return toInvoice(connect.rows[0]);


}


