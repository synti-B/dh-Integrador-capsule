window.addEventListener('load', function(){


    let formCreateProduct = document.querySelector('form');

    formCreateProduct.addEventListener('submit', function(e){
       let errors = [];

        let inputName = document.querySelector('#name') ;

        if (inputName.value == '') {
            errors.push('El campo no debe estar vacío');
        }

       let inputDescription = document.querySelector('#description') ;

        if (inputDescription.value == '') {
            errors.push('El campo no debe estar vacío');
        } else if (inputDescription.value.length < 20) {
            errors.push('Debe realizar una breve descripción')
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