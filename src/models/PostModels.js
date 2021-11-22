import  mongoose  from 'mongoose';


const Postmodel = new mongoose.Schema({

    title: { type: String, required: true },
    post: { type: String, required: true },
    CriadoEm: { type: Date, default: Date.now }
});



const PostModel = mongoose.model('Post', Postmodel);

class Post {

constructor (body){
this.body = body;
this.errors = [];
this.publi = null;
}
 

async buscaId(id){
    if(typeof id !== 'string') return;
const newpost = await PostModel.findById(id);

return newpost;

}




async register(){
this.valida();
if(this.errors.length > 0) return;


this.publi = await PostModel.create(this.body);

return this.publi;
}




valida(){
    this.cleanUp();
    
   if(!this.body.title || !this.body.post) this.errors.push('O título e o subtítulo não podem ficar vazios')
}
cleanUp() {

    for(const key in this.body){
        if(typeof this.body[key] !== 'string'){
            this.body[key]='';
        }
    }
    
    this.body = {
    
        title: this.body.title,
        post :this.body.post,
    };
    }


async update(id){
    if(typeof id !== 'string') return;
this.valida();

if(this.errors.lengh > 0) return;
this.publi = await PostModel.findByIdAndUpdate(id, this.body,{new : true});

}
    
}

Post.exibirPost = async function () {

    const post = await PostModel.find()
    .sort({ CriadoEm: -1});
    return post;
    
    }
    
    
Post.postDelete = async function (id){

const post =  await PostModel.findByIdAndDelete({_id: id});

return post;

}


export default Post;