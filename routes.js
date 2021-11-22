import { Router } from 'express';
import HomeControlls from './src/controllers/HomeController';
import InicialControlls from './src/controllers/InicialController';
const routes = Router();

//pagina inicial
routes.get('/', InicialControlls.index)


//rotas de create
routes.get('/postcreate', HomeControlls.index);
routes.post('/criapost', HomeControlls.store);

//rotas de update
routes.get('/postcreate/:id', HomeControlls.idFinder);
routes.post('/postcreate/update/:id', HomeControlls.update);

//rota de deletar
routes.get('/delete/:id', HomeControlls.delete);


export default routes;
