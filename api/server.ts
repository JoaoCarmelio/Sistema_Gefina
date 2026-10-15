import express from 'express';
import invoices from './invoice.router.ts';
import path from 'node:path';
import pool from './database.ts';

const app = express();

const dist = path.join(import.meta.dirname, '..', 'web', 'dist')

app.use((request, _response, next) => {
  console.log(request.method + ' ' + request.url);
  next();
});

app.get('/api/statusSaude',  async(_request, response) => {
 const connect = await pool.query('SELECT datename FROM pg_database where  oid = 5;');

  response.status(200).json({
    status: 'Serve is running',
    databae: connect.rows[0].datname
  });
});

app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado.' });
});

// app.listen(3000, () => {
//   console.log(`Servidor rodando em http:/localhost:3000`);
// })

app.listen(process.env.PORT || 3000);


