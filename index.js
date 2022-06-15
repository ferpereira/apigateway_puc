const httpProxy = require('express-http-proxy');
const express =  require('express');
const app = express();
var logger = require('morgan'); 

app.use(logger('dev'));

function selectProxyHost(req){
    if(req.path.startsWith('/sessao')){
        return 'http://localhost:3000/sessao';
    }else if(req.path.startsWith('/produto')){
        return 'http://localhost:3000/produto';
    }else if(req.path.startsWith('/pedido')){
        return 'http://localhost:3000/pedido';
    }else if(req.path.startsWith('/pessoa')){
        return 'http://localhost:3000/pessoa';
    }
}

app.use((req, res, next) => {
    httpProxy(selectProxyHost(req)) (req, res, next);
});

app.listen(8080, () => {
    console.log("Gatway de API está no ar...");
})