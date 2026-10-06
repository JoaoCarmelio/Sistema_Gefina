import express from 'express';
import invoices from './invoice.router.ts';

const app = express();

app.use((request, _response, next) => {
  console.log(request.method + ' ' + request.url);
  next();
});

app.get('/api/statusSaude', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/invoices', invoices);

app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado.' });
});

app.listen(3000, () => {
  console.log(`Servidor rodando em http:/localhost:3000`);
});
