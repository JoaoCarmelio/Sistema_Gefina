//gerenciamento de rotas

import { Router } from 'express';
import {
  findAllInvoices,
  findInvoiceById
} from './invoices.service.ts'


const router = Router();

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

router.get('/api/invoices/:id', async (request, response) => {
  try{
  const id = Number(request.params.id);

  const invoice = await findInvoiceById(id);

  if(!invoice) response.status(404).json({ error: {
    status: 404, 
    message: 'Fatura não encontrada.'
  }});
  response.status(200).json(invoice);
  }catch (error){
    console.error(error);

  response.status(500).json({ error: {
    status: 500,
    message: 'Não foi possível carregar as faturas.'
  }});
  }
});



export default router;
