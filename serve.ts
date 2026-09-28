import {createServer} from 'node:http';
import send from './send.ts';


const serveStatus = {status: 'ok'}
const serveStatusJSON = JSON.stringify(serveStatus);

createServer(function (request, response) {
    if(request.url !== '/api/statusSaude') {
        send(response, 404, {message: 'Recurso não encontrado'});
        return;
        
    }

    send(response, 200, {status: 'ok'});
    
    

}).listen(3000);






// maneira antiga para exportar
//module.exports =  {greet,sayMyName}