import type {InvoiceStatus } from './invoiceTypes.ts';

export default function statusLabel(status: InvoiceStatus) {
    return status === 'paid' ? 'Pago': 'Pendente'

}