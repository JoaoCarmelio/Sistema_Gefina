import express from 'express';
import invoices from './invoice.router.ts';
import path from 'node:path';

const app = express();

const dist = path.join(import.meta.dirname, '..', 'web', 'dist')

app.use((request, _response, next) => {
  console.log(request.method + ' ' + request.url);
  next();
});

app.get('/api/statusSaude', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado.' });
});

app.listen(3000, () => {
  console.log(`Servidor rodando em http:/localhost:3000`);
});
