import {createServer} from 'node:http';

const serveStatus = {status: 'ok'}
const serveStatusJSON = JSON.stringify(serveStatus);

createServer(function (request, response) {
    if(request.url !== '/api/statusSaude') {
        response.writeHead(404, {'content-type' : 'application/json'});
        response.end(JSON.stringify({message: 'Recurso não encontrado!'}))
        return;
    }
    response.writeHead(200, {'content-type': 'application/json' });
    response.end(serveStatusJSON);
    
    

}).listen(3000);






// maneira antiga para exportar
//module.exports =  {greet,sayMyName}