////////////////
//  VAR INIT  //
////////////////

const profile_nombre =    document.getElementById("profile-nombre")
const profile_apellido =  document.getElementById("profile-apellido")
const profile_edad =      document.getElementById("profile-edad")
const profile_email =     document.getElementById("profile-email")
const profile_telefono =  document.getElementById("profile-telefono")

const profile_boton =     document.getElementById("profile-boton")

const user_data = localStorage.getItem('userData')

var datosUsuario = {
    nombre: undefined,
    apellido: undefined,  
    edad: undefined,
    email: undefined,
    telefono: undefined,
    foto_perfil: undefined
}

/////////////////
//  FUNCTIONS  //
/////////////////

// Función que guarda los valores de los inputs dentro de las propiedades
// de datosUsuario y después lo guarda en localStorage
function almacenarDatos() {
    if (profile_nombre.value)
    { datosUsuario.nombre = profile_nombre.value }
    
    if (profile_apellido.value)
    { datosUsuario.apellido = profile_apellido.value }
    
    if (profile_edad.value > 0)
    { datosUsuario.edad = profile_edad.value }
    
    if (profile_email.value)
    { datosUsuario.email = profile_email.value }
    
    if (profile_telefono.value)
    { datosUsuario.telefono = profile_telefono.value }

    localStorage.setItem('userData', JSON.stringify(datosUsuario))
}

// Función que muestra la información almacenada en localStorage
// en los inputs del formulario en caso de que haya datos
function mostrarDatos() {
    if (JSON.parse(user_data)) {
        datosUsuario = JSON.parse(user_data)
        
        if (datosUsuario.nombre)
        { profile_nombre.value = datosUsuario.nombre }

        if (datosUsuario.apellido)
        { profile_apellido.value = datosUsuario.apellido }

        if (datosUsuario.edad)
        { profile_edad.value = datosUsuario.edad }

        if (datosUsuario.email)
        { profile_email.value = datosUsuario.email }

        if (datosUsuario.telefono)
        { profile_telefono.value = datosUsuario.telefono }
    }
}

//Configuraciones para el elemento que sube archivos
var dzoptions = {
    url:"/",
    autoQueue: false
};
var myDropzone = new Dropzone("div#file-upload", dzoptions);    


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarDatos()
});

profile_boton.addEventListener("click", function (e) {
    almacenarDatos()
});