const usuario = document.getElementById("usuario");
const password = document.getElementById("password");
const boton = document.getElementById("boton");

let redireccionar = () => {
    if (usuario.value.length > 0 && password.value.length > 0) {
        sessionStorage.setItem('nombreUsuario', usuario.value);
        window.location.replace("home.html");
    } else {
        Swal.fire(
            {
                customClass: {
                    popup: 'border-radius: 50px;'
                },
                title: '¡Cuidado!',
                text: 'Los campos de usuario y contraseña no pueden estar vacios.',
                icon: 'error'
            }
        );
    };
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    boton.addEventListener("click", (event) => {
        event.preventDefault();
        redireccionar();
    });

    tippy('#linklogo', {
        content: "Ir al repositorio de Github",
        animation: 'scale-extreme',
        theme: 'temita',
        offset: [0, 0],
        placement: 'top',
    });
});