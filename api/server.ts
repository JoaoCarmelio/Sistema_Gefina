import express, { response } from 'express';
import invoices from './invoice.router.ts';
import path, { join } from 'node:path';
import pool from './database.ts';
import { stat } from 'node:fs';
import dashboard from './dashboard.router.ts';

const app = express();
app.use(express.json());

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((request, _response, next) => {
  console.log(request.method + ' ' + request.url);
  next();
});

app.get('/api/statusSaude', async (_request, response) => {
  try {
    const connect = await pool.query('SELECT current_database() AS datname');

    response.status(200).json({
      status: 'Server is running',
      database: connect.rows[0].datname
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      status: 'Server is running',
      database: 'unavailable'
    });
  }
});

app.use('/api/dashboard', dashboard);
app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((request, response, next) => {
  if (request.url.startsWith('/api')) {
    next();
    return;
  }
  response.sendFile(path.join(dist, 'index.html'));
});

app.use((_request, response) => {
  response.status(404).json({ message: 'Recurso não encontrado.' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});