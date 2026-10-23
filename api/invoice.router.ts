//gerenciamento de rotas

import { Router } from 'express';
import {
  findAllInvoices,
  findInvoiceById,
  insertInvoice,
  modifyInvoice,
  removeInvoice
} from './invoices.service.ts'


const router = Router();

// Confere se o corpo da requisição tem todos os campos da fatura
function isValidInvoice(body: Record<string, unknown> | undefined): boolean {
  if (!body) return false;

  return (
    Number.isInteger(body.customerId) &&
    Number.isInteger(body.amount) &&
    (body.status === 'paid' || body.status === 'pending') &&
    typeof body.issueDate === 'string' &&
    typeof body.dueDate === 'string'
  );
}

const invalidBody = {
  error: {
    status: 400,
    message: 'Informe customerId, amount, status (paid ou pending), issueDate e dueDate.'
  }
};

router.get('/', async (_req, res) => {
  try {
    const invoices = await findAllInvoices();

    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: {
        status: 500,
        message: 'Não foi possível carregar as faturas.'
      }
    })
  }
});

router.get('/:id', async (request, response) => {
  try{
  const id = Number(request.params.id);

  const invoice = await findInvoiceById(id);

  if (!invoice) {
      response.status(404).json({ error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }});
      return;
    }
  response.status(200).json(invoice);
  }catch (error){
    console.error(error);

  response.status(500).json({ error: {
    status: 500,
    message: 'Não foi possível carregar as faturas.'
  }});
  }
});

router.post('/', async (request, response) => {
  try {
    if (!isValidInvoice(request.body)) {
      response.status(400).json(invalidBody);
      return;
    }

    const invoice = await insertInvoice(request.body);

    response.status(201).json(invoice);

  } catch (error) {
    console.error(error);
    response.status(500).json({ error: {
      status: 500,
      message: 'Não foi possível inserir fatura.'

    }});

  }

})

router.put('/:id', async (request, response) => {
  try {
    if (!isValidInvoice(request.body)) {
      response.status(400).json(invalidBody);
      return;
    }

    const invoice = await modifyInvoice(
      Number(request.params.id),
      request.body)

    if (!invoice) {
      response.status(404).json({ error: {
        status: 404,
        message: 'Fatura não encontrada.'
      }});
      return;
    }

    response.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: {
      status: 500,
      message: 'Não foi possível modificar fatura.'

    }});

  }

});

router.delete('/:id', async (request, response) => {
    try {
        const deleted = await removeInvoice(Number(request.params.id));

        if (!deleted) {
          response.status(404).json({ error: {
            status: 404,
            message: 'Fatura não encontrada.'
          }});
          return;
        }

        response.status(204).end();

    } catch (error) {
      console.error(error);
    response.status(500).json({ error: {
      status: 500,
      message: 'Não foi possível remover fatura.'

    }});

    }
})



export default router;