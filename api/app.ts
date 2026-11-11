import express from 'express';
import path from 'node:path';
import prisma from './prisma.ts';
import dashboard from './dashboard.route.ts';
import invoices from './invoice.route.ts';
import handleError from './error.middleware.ts';
import customers from './customer.route.ts'

const app = express();
app.use(express.json());

const dist = path.join(import.meta.dirname, '..', 'web', 'dist');

app.use((request, _response, next) => {
  console.log(`${request.method} ${request.url}`);
  next();
});

app.get('/api/health', async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1;`;
  
    response.status(200).json({
      status: 'Server is running.',
      database: `Database available.`
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      status: 'Server is running.',
      database: 'Database unvailable'
    });
  }
});

app.use('/api/dashboard', dashboard);
app.use('/api/customers', customers);
app.use('/api/invoices', invoices);

app.use(express.static(dist));

app.use((request, response, next) => {
  if (request.url.startsWith('/api')) {
    next();
    return;
  }

  response.sendFile(path.join(dist, 'index.html'));
})

app.use((_request, response) => {
  response.status(404).json({ error: {
    status: 404,
    message: 'Recurso não encontrado'
  }})
 
});

app.use(handleError);

export default app;