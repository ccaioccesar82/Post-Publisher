init = () => {

const form = document.querySelector('.form');

previneDefault = () =>{
form.addEventListener('submit', e => {

e.preventDefault();
valida(e);

});

};

valida = (e) =>{

    const el =  e.target;
    const title= el.querySelector('.form-1');
    const text = el.querySelector('.form-2');


if(title.value.length <= 0 || text.value.length <= 1){

    alertify.alert('Error Message: ', 'Os campos título e post não podem ficar vazios.');


} else {
el.submit(); 
}
};



previneDefault();

}

init();