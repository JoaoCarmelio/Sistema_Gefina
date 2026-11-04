import { z, ZodError } from 'zod';

export const invoiceStatusSchema = z.enum(['paid', 'pending']);

export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

export const invoiceSchema = z
  .object({
    customerId: z.number().int().positive(),
    amount: z.number().int().positive(),
    status: invoiceStatusSchema,
    issueDate: z.iso.date(),
    dueDate: z.iso.date(),
  })
  .refine((data) => data.dueDate >= data.issueDate, {
    error: 'A data de vencimento não pode ser anterior à data de emissão.',
    path: ['dueDate'],
  });


export type InvoiceInput = z.infer<typeof invoiceSchema>;

interface invoiceFieldErrors {
    customerId?: string;
    amount?: string;
    status?: string;
    issueDate?: string;
    dueDate?: string;
}

export function toFieldErrors(error: ZodError<InvoiceInput>): invoiceFieldErrors {
    const  {
        customerId,
        amount,
        status,
        issueDate,
        dueDate 
    }= z.flattenError(error).fieldErrors;


    return {
        customerId: customerId?.[0],
        amount: amount?.[0],
        status: status?.[0],
        issueDate: issueDate?.[0],
        dueDate: dueDate?.[0]
    }
}