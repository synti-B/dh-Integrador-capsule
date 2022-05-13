window.addEventListener('load', function(){


    let formCreateProduct = document.querySelector('form');

    formCreateProduct.addEventListener('submit', function(e){
       let errors = [];

        let inputEmail = document.querySelector('#email') ;

        if (inputEmail.value == '') {
            errors.push('El campo EMAIL no debe estar vacío');
        } 

        
        if(errors.length > 0) {
            e.preventDefault();

            let ulErrors = document.querySelector('#errors');
            for (let i = 0; i < errors.length; i++) {
                
                ulErrors.innerHTML += '<li>'+ errors[i] + '</li>'
            }
        }
    })
})