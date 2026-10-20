import type { Invoice } from './invoiceTypes'

export interface DashboardTotal {
    paid: number;
    pending: number;
    invoiceCount: number;
    customerCount: number;
}

export interface Dashboard {
    totals: DashboardTotal;
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];

}
