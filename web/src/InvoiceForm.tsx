import {
  type SetStateAction,
  type SubmitEvent,
  useState,
} from 'react';
import type { CustomerOption } from './CustomerTypes';
import type {
  Invoice,
  InvoiceFieldErrors,
  InvoiceInput,
  InvoiceStatus,
} from './invoiceType';

interface InvoiceFormProps {
  invoice: Invoice | null;
  customers: CustomerOption[];
  error: string | null;
  fieldErrors: InvoiceFieldErrors;
  OnDelete: () => void;
  confirmDelete: boolean;
  setConfirmDelete: React.Dispatch<SetStateAction<boolean>>;
  confirm: () => void;
  OnCancel: () => void;
  OnSubmit: (values: InvoiceInput) => void;
  busy: boolean;
}

export default function InvoiceForm(props: InvoiceFormProps) {
  const [customerId, setCustomerId] = useState(
    !props.invoice ? undefined : String(props.invoice.customer.id),
  );
  const [amount, setAmount] = useState(
    !props.invoice
      ? undefined
      : (props.invoice.amount / 100).toFixed(2),
  );
  const [status, setStatus] = useState<InvoiceStatus>(
    !props.invoice ? 'pending' : props.invoice.status,
  );
  const [issueDate, setIssueDate] = useState(
    !props.invoice ? '' : props.invoice.issueDate,
  );
  const [dueDate, setDueDate] = useState(
    !props.invoice ? '' : props.invoice.dueDate,
  );

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    props.setConfirmDelete(false);

    props.OnSubmit({
      customerId: Number(customerId),
      amount: Math.round(Number(amount) * 100),
      status,
      issueDate,
      dueDate,
    });
  };

  const field = 'flex flex-col gap-1';
  const label = 'text-sm text-text-muted';
  const input = 'px-3 py-2 border-border rounded-control bg-surface-raised focus-visible:outline-2 focus-visible:outline-primary'
  const button ='flex-1 px-4 py-2 rounded-control cursor-pointer disabled:cursor-default disabled:opacity-60 focus-visible:outiline-2 focus-visible:outline-primary'
  const error = 'text-sm text-overdue';

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2 className='text-xl font-semibold'>{!props.invoice ? 'Criar fatura' : 'Editar fatura'}</h2>

      <div className={field}> 
        <label className={label} htmlFor="customer">Cliente</label>
        <select
        className={`${input} appearance-none`}
          id="customer"
          value={customerId}
          onChange={(event) => setCustomerId(event.target.value)}
          required
        >
          <option disabled>Selecione um cliente</option>

          {props.customers.map((customer) => {
            return (
              <option key={customer.id} value={customer.id}>
                {customer.name} - {customer.email}
              </option>
            );
          })}
        </select>
      </div>   

      <div className='flex gap-2'>
        <div className={`${field} flex-1 scheme-dark`}>
        <label className={label} htmlFor="amount">Valor</label>
        <input
        className={input}
          id="amount"
          type="number"
          value={amount}
          step="0.01"
          min="0.01"
          onChange={(event) => setAmount(event.target.value)}
          required
        />
        </div>
        <div className={field}>
        <label className={label} htmlFor="status">Situação</label>
        <select
          className={`${input} appearance-none`}
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as InvoiceStatus)
          }
        >
          <option value="pending">Pendente</option>
          <option value="paid">Paga</option>
        </select>
          </div>
      </div>


      <div className="flex gap-2">

        <div className={`${field} flex-1 scheme-dark`}>
        <label className={label} htmlFor="issueDate">Emissão</label>
        <input
          className={input}
          id="issueDate"
          type="date"
          required
          value={issueDate}
          onChange={(event) => setIssueDate(event.target.value)}
        />
      </div>

      <div className={`${field} flex-1 schema-dark`}>
        <label className={label} htmlFor="dueDate">Vencimento</label>
        <input
          className={input}
          id="dueDate"
          type="date"
          value={dueDate}
          min={issueDate}
          onChange={(event) => setDueDate(event.target.value)}
          required
        />
      </div>
        
      </div>

     
      <div className="flex gap-2 mt-6">
        {!props.invoice ? null : (
          <button
            className={`${button} bg-surface-raised text-overdue border border-overdue`}
            type="button"
            disabled={props.busy}
            onClick={props.OnDelete}
          >
            {props.busy && props.confirmDelete
              ? 'Excluindo...'
              : 'Excluir'}
          </button>
        )}
        <button
          className={`${button} bg-surface-raised border border-border`}
          type="button"
          disabled={props.busy}
          onClick={props.OnCancel}
        >
          Cancelar
        </button>
        <button
          className={`${button} border border-transparent bg-primary`}
          type="submit"
          disabled={props.busy}
        >
          {props.busy ? 'Salvando...' : 'Salvar'}
        </button>
      </div>

      {props.confirmDelete && (
        <div className="flex gap-2 items-center">
          <p className='text-pending '>
            A exclusão é definitiva e não pode ser desfeita. Deseja
            prosseguir?
          </p>

          <button
            className={`${button} bg-surface-raised border border-border`}
            type="button"
            disabled={props.busy}
            onClick={() => props.setConfirmDelete(false)}
          >
            Não
          </button>

          <button
            className={`${button} bg-surface-raised text-overdue border border-overdue`}
            type="button"
            disabled={props.busy}
            onClick={props.confirm}
          >
            Sim
          </button>
        </div>
      )}

      {props.error && <p className={error}>{props.error}</p>}
      {props.fieldErrors.customerId && (
        <p className={error}>{props.fieldErrors.customerId}</p>
      )}
      {props.fieldErrors.amount && (
        <p className={error}>{props.fieldErrors.amount}</p>
      )}
      {props.fieldErrors.status && (
        <p className={error}>{props.fieldErrors.status}</p>
      )}
      {props.fieldErrors.issueDate && (
        <p className={error}>{props.fieldErrors.issueDate}</p>
      )}
      {props.fieldErrors.dueDate && (
        <p className={error}>{props.fieldErrors.dueDate}</p>
      )}
    </form>
  );
}
