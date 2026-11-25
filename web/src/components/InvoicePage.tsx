import { useEffect, useRef, useState } from 'react';
import type { CustomerOption } from '../types/CustomerTypes.ts'
import InvoiceForm from './InvoiceForm.tsx';
import InvoiceTable from './InvoiceTable.tsx';
import {
  createInvoice,
  deleteInvoice,
  getAllInvoice,
  updateInvoice,
} from '../invoice.api.ts'
import type {
  Invoice,
  InvoiceFieldErrors,
  InvoiceInput,
} from '../types/invoiceType.ts'

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customersOptions, setcustomersOptions] = useState<
    CustomerOption[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<InvoiceFieldErrors>(
    {},
  );
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogContent, setDialogContent] = useState(false);
  const [target, setTarget] = useState<Invoice | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const dialogRef = useRef<HTMLDialogElement>(null);

  function openModal(invoice: Invoice | null) {
    setTarget(invoice);
    setFormError(null);
    setDialogContent(true);

    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    async function getInvoices() {
      try {
        const datas = await getAllInvoice();
        setInvoices(datas);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }

      setLoading(false);
    }

    getInvoices();
  }, []);

  useEffect(() => {
    async function getCustomerOptions() {
      try {
        const response = await fetch('/api/customers/options');

        if (!response.ok)
          throw new Error('Falha ao buscar opçoes de clientes.');
        const datas = await response.json();

        setcustomersOptions(datas);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      }
    }

    getCustomerOptions();
  }, []);

  async function refresh() {
    try {
      const datas = await getAllInvoice();
      setInvoices(datas);
    } catch (error) {
      if (error instanceof Error) throw error;
    }
  }

  async function submit(datas: InvoiceInput) {
    setBusy(true);
    setFormError(null);

    try {
      if (!target) {
        const failure = await createInvoice(datas);
        if (failure) return setFieldErrors(failure.fields);
      } else {
        await updateInvoice(target.id, datas);
      }
    
      closeModal();
      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    } finally {
      setBusy(false);
    }
    setBusy(false);
  }

  async function confirm() {
    if (!target) return;
    setBusy(true);
    setFormError(null);

    try {
      await deleteInvoice(target.id);

      setConfirmDelete(false);
      closeModal();

      await refresh();
    } catch (error) {
      if (error instanceof Error) setFormError(error.message);
    }
    setBusy(false);
  }

  if (loading)
    return (
      <p className="text-sm text-text-muted">Carregando faturas...</p>
    );

  if (error) return <p className="text-overdue">{error}</p>;

  return (
    <>
      <header className="flex justify-between items-center mb-6 px-3">
        <h1 className="text-xl font-semibold">Faturas</h1>
        <button
          type="button"
          className="bg-primary px-4 py-2 rounded-control cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
          onClick={() => openModal(null)}
        >
          Nova fatura
        </button>
      </header>

      <div className="p-4 bg-surface border border-border rounded-surface">
        <InvoiceTable invoices={invoices} edit={openModal} />
      </div>

      <dialog
        className="w-xl m-auto p-6 rounded-dialog bg-surface backdrop: background-backdrop border border-border text-text focus-visible:outline-2 focus-visible:outline-primary "
        ref={dialogRef}
        onClose={() => {
          setDialogContent(false);
          setConfirmDelete(false);
          setFieldErrors({});
          setConfirmDelete(false);
        }}
      >
        {dialogContent && (
          <InvoiceForm
            invoice={target}
            customers={customersOptions}
            error={formError}
            fieldErrors={fieldErrors}
            OnDelete={() => setConfirmDelete(true)}
            confirmDelete={confirmDelete}
            setConfirmDelete={setConfirmDelete}
            confirm={confirm}
            OnSubmit={submit}
            OnCancel={closeModal}
            busy={busy}
          />
        )}
      </dialog>
    </>
  );
}
