import express, { response } from 'express';
import invoices from './invoice.router.ts';


const app = express();

app.use(function (request,response, next) {
    console.log(request.method + ' ' + request.url);
    next();
})

app.get('/api/statusSaude', (request,response) => {
    response.status(200).json({status:'ok'})
});

app.use('/api/invoices', invoices);



app.use(function (request, response) {
  response.status(404).json({message: 'Recurso não encontrado.'});
}) 
    


app.listen(3000)

