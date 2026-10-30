import { useState, type SubmitEvent } from 'react';
import type { Invoice, InvoiceStatus, InvoiceInput } from './invoiceType'
import type { CustomerOption } from './CustomerTypes';



interface InvoiceFormProps{
    invoice:  Invoice | null;
    customers:  CustomerOption[];
    error: string | null;
    OnDelete: () => void;
    OnCancel: () => void;
    OnSubmit: (values: InvoiceInput) => void;
    busy: boolean;

}

export default function InvoiceForm(props: InvoiceFormProps) {
    const [customerId, setCustomerId] = useState(!props.invoice ? '' : props.invoice.customer.id);
    const [amount, setAmount] = useState(!props.invoice ? '': (props.invoice.amount / 100).toFixed(2));
    const [status,setStatus] = useState<InvoiceStatus>(!props.invoice ? 'pending': props.invoice.status);
    const [issueDate, setIssuDate] = useState(!props.invoice ? '': props.invoice.issueDate);
    const [dueDate, setDueDate] = useState(!props.invoice ? '': props.invoice.dueDate);

    const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault()

        props.OnSubmit ({
            customerId: Number(customerId),
            amount: Math.round(Number(amount) * 100),
            status,
            issueDate,
            dueDate
        })

    };
    
    return <form onSubmit={handleSubmit}>
        <h2>{!props.invoice ? 'Criar fatura' : 'Editar fatura'}</h2>
        

        <div className='field'>
            <label htmlFor="customer">Cliente</label>
            <select id='customer' value={customerId} onChange={(event) => setCustomerId(event.target.value)}>
                <option  disabled>
                    Selecione um cliente

                </option>

                {props.customers.map((customer) => {
                    return <option key={customer.id} value={customer.id}>
                        {customer.name} - {customer.email}
                    </option>
                })}
            </select>
        </div>

        <div className='field'>
            <label htmlFor="amount">Valor</label>
            <input
            id='amount' 
            type='number'
            value={amount}
            step='0.01'
            min='0.01'
            onChange={(event) => setAmount(event.target.value)}
            required
            />

        </div>


        <div className='field'>
            <label htmlFor="status">Situação</label>
            <select id='status' value={status} onChange={(event) => setStatus(event.target.value as InvoiceStatus)}>
                <option value="pending">Pendente</option>
                <option value="paid">Paga</option>
            </select>
        </div>
        

        <div className='field'>
            <label htmlFor="issueDate">Emissão</label>
            <input id='issueDate' type="date" required  value={issueDate} onChange={(event) => setIssuDate(event.target.value)}  />
        </div>

        <div className='field'>
            <label htmlFor="dueDate">Vencimento</label>
            <input id='dueDate' type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} required />
        </div>

        <div className='horizontal-fields'>
            <div className='field'></div>   
            <div className='field'></div>
            <div className='field'></div>
        </div>

        {!props.error ? null : <p className='form-error'>{props.error}</p>}
        <div className='form-actions'>
            {!props.invoice ? null : <button className='button-danger' type='button' disabled={props.busy} onClick={props.OnDelete}>Excluir</button>}
            <button className='button-secondary' type="button" disabled={props.busy} onClick={props.OnCancel}>Cancelar</button>
            <button className='button-primary' type="submit" disabled={props.busy} >{props.busy ? 'Salvando...' : 'Salvar'}</button>

        </div>
    </form>;

}