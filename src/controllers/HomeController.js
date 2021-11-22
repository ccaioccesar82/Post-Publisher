import  express  from 'express';
import Post from '../models/PostModels';

class HomeControlls{

index(req, res){

    res.render('index', { 
    newpost:{}
});
    
}

async store(req, res){
try{

const newpost = new Post(req.body);
await newpost.register();

if(newpost.errors.length > 0) { 
    
req.flash('errors', newpost.errors)
req.session.save(function(){

    return res.redirect('back');
})

return;
}
req.flash('success', 'Post criado com sucesso.');
req.session.save(function() {

return res.redirect('back');


});

} catch(e){

    console.log(e)
    res.send('Houston, temos um problema');
}
}

async idFinder(req, res){
try{
    if(!req.params.id) return res.send('Houston, temos um problema');

const newpost1 = new Post(req.body);
 const newpost = await newpost1.buscaId(req.params.id);

 req.session.save(function(){

    console.log({newpost})
     return res.render('index', {newpost});
 });

} catch(e){

    console.log(e)
    return res.send('Houston, temos um problema');
}

}

async update(req, res){
    try{
        if(!req.params.id) return res.send('Não existe id');
    
    const newpost = new Post(req.body);
     await newpost.update(req.params.id);

    if(newpost.errors.length > 0) {

        req.flash('errors', newpost.errors);
        req.session.save(function(){
    

             return res.redirect('back');
         }); 
         return
    }

    req.flash('success', 'Sua publicação foi atualizada com sucesso')
     req.session.save(function(){
    
         return res.redirect('back');
     });
    
    } catch(e){
    
        console.log(e)
        return res.send('Houston, temos um problema');
    }

    }

async delete(req, res) {
try{
if(!req.params.id) return res.send('Não existe id');
  await Post.postDelete(req.params.id);

  req.session.save(function(){
    
    return res.redirect('back');
});


} catch(e){

    console.log(e)
    return res.send('Houston, temos um problema');
}

}


}

export default new HomeControlls();