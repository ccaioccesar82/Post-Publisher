import  express  from 'express';
import Post from '../models/PostModels';

class InicialControlls{

async index(req, res){
    try{
const posts = await Post.exibirPost();


    res.render('inicial', {posts});
    } catch(e){

        console.log(e)
        res.send('Houston, temos um problema');
    }
}

}

export default new InicialControlls();