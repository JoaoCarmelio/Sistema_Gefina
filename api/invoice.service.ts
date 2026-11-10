import prisma from './prisma.ts';
import type { InvoiceStatus, InvoiceInput} from './invoice.schema.ts';

import type {
  Invoice as InvoiceRecord,
  Customer as CustomerRecord
} from '@prisma/client';
import { record } from 'zod/v4/mini';




type InvoiceSituation = 'paid' | 'pending' | 'overdue';


export interface Invoice {
  id: number;
  amount: number;
  status: InvoiceStatus;
  situation: InvoiceSituation;
  issueDate: string;
  dueDate: string;
  customer: {

    id:number;
    name:string;
    email:string;
   }
}

type InvoiceWithCustomer = InvoiceRecord & {
  customer: CustomerRecord;
};

function formatInvoice(record: InvoiceWithCustomer): Invoice {
  const situation: InvoiceSituation = record.status === 'paid'
    ? 'paid'
    : record.dueDate < new Date()
      ? 'overdue'
      : 'pending';

  return {
    id: record.id,
    amount: record.amount,
    status: record.status as InvoiceStatus,
    situation,
    issueDate: record.issueDate.toISOString().slice(0, 10),
    dueDate: record.dueDate.toISOString().slice(0, 10),
    customer: {
      id: record.customer.id,
      name: record.customer.name,
      email: record.customer.email
    }
  };
}


/** 
 * 
interface InvoiceRow {
  id: number;
  amount: number;
  status: InvoiceStatus;
  situation: InvoiceSituation;
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
    CASE
      WHEN status = 'paid' THEN 'paid'
      WHEN invoices.due_date < CURRENT_DATE THEN 'overdue'
      ELSE 'pending'
    END AS situation,
    invoices.issue_date::text,
    invoices.due_date::text,
    customers.id AS customer_id,
    customers.name AS customer_name,
    customers.email AS customer_email
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
`;

function toInvoice(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    amount: row.amount,
    status: row.status,
    situation: row.situation,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    customer: {
      id: row.customer_id,
      name: row.customer_name,
      email: row.customer_email
    }
  };
}

function toInvoices(rows: InvoiceRow[]): Invoice[] {
  const invoices: Invoice[] = [];

  rows.forEach(invoice => invoices.push(toInvoice(invoice)));

  return invoices;
}
*/
export async function findAllInvoices(): Promise<Invoice[]> {

  const records = await prisma.invoice.findMany({
    include: { customer: true},
    orderBy: {createdAt: 'desc'},

  });
  return records.map(formatInvoice);

 
}

export async function findInvoiceById(id: number): Promise<Invoice | undefined> {
 
}

export async function findRecentInvoices(): Promise<Invoice[]> {
 
}

export async function findOverdueInvoices(): Promise<Invoice[]> {

}

export async function insertInvoice(datas: InvoiceInput): Promise<Invoice | undefined> {
  
}

export async function modifyInvoice(
  id: number,
  datas: InvoiceInput
  
): Promise<Invoice | undefined> {
 
}

export async function removeInvoice(id: number): Promise<boolean> {

}
