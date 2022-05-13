window.addEventListener('load', function(){


    let formCreateProduct = document.querySelector('form');

    formCreateProduct.addEventListener('submit', function(e){
       let errors = [];

        let inputPassword = document.querySelector('#emailPass') ;

        if (inputPassword.value == '') {
            errors.push('El campo CONTRASEÑA no debe estar vacío');
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