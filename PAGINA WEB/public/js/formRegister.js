window.addEventListener('load', function() {

    let formRegister = document.querySelector('form');

    formRegister.addEventListener('submit', function(e) {
        let errors = [];

        let inputFirstName = document.querySelector("#first_name");

        if (inputFirstName.value == " ") {

            errors.push('El campo NOMBRE no debe estar vacío');
        }

        let inputLastName = document.querySelector('#last_name');

        if (inputLastName.value == " ") {

            errors.push('El campo APELLIDO no debe estar vacío');
        }

        let inputEmail = document.querySelector('#email');

        if (inputEmail.value == " ") {
            errors.push('El campo EMAIL no debe estar vacío');
        } else if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(inputEmail.value)) {
            alert("La dirección de email " + inputEmail.value + " es correcta!.");
        } else {
            errors.push("La dirección de email es incorrecta!.");
        }


        let inputPassword = document.querySelector('#password');

        if (inputPassword.value == ' ') {
            errors.push('El campo CONTRASEÑA no debe estar vacío');
        } else if (inputPassword.value.length < 8) {
            errors.push('La contraseña debe tener al menos 8 caracteres')
        }


        if (errors.length > 0) {
            e.preventDefault();

            let ulErrors = document.querySelector('#errors');
            for (let i = 0; i < errors.length; i++) {

                ulErrors.innerHTML += '<li>' + errors[i] + '</li>'
            }
        }
    })
})