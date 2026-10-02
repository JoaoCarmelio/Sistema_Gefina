//gerenciamento de rotas 
import { DefaultDeserializer } from "node:v8";
import invoices from "./invoices.data.ts";
import { Router } from "express";

const router = Router();






router.get('/api/invoices', function(request, response) {
    response.status(200).json(invoices)
    
})

router.get('/api/invoices/:id', (request, response) => {
  const id =  +request.params.id;

  for (let i = 0; i < invoices.length; i++) {

    if(invoices[i].id == id) {
      response.status(200).json(invoices[i]);
      return;
    }

  }

    response.status(404).json({error:{message: 'Fatura não encontrada'}});
    
});

export default router
