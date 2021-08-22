const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const boton = document.getElementById("boton");

let redireccionar = () => {
    if (usuario.value.length > 0 && password.value.length > 0) {
    window.location.replace("home.html");
    } else {
        Swal.fire(
            '¡Cuidado!',
            'Los campos de usuario y contraseña no pueden estar vacios.',
            'error'
          );
    };
};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    boton.addEventListener("click", (event) => {
        event.preventDefault();
        redireccionar();
    });
});