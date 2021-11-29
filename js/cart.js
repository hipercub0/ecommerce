////////////////
//  VAR INIT  //
////////////////

var cart = undefined  // termina siendo un array en initCartFromJSON()

let subtotal = 0;
let preferredCurrency = "UYU";


/////////////////
//  FUNCTIONS  //
/////////////////

// Funcion que chequea si el cart todavia está vacío (undefined)
// y lo muestra después de convertirlo en array, llenarlo y
// asignarle los event listeners
async function mostrarCarritoInicial() {
    
    if (!cart) {     
        showSpinner()             // cart puede estar vacio si todavía 
        await initCartFromJSON()  // no se llenó con los datos del JSON
        mostrarCarritoActual()    // en initCartFromJSON()
    }
}

// transforma a cart en un array con los datos obtenidos del JSON
async function initCartFromJSON() {
    await getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cart = resultObj.data.articles;
        }
    })
}


function crearEventosCartItems() {
    crearEventosCount()
    crearEventosDelete()
}

function crearEventosDelete() {
    let i = 0
    for (let articulo of cart) {

        let deleteButton = document.getElementById("delete-" + i)

        deleteButton.addEventListener("click", () => {
            let index = cart.indexOf(articulo)

            cart.splice(index, 1)
            mostrarCarritoActual()
        })
        i++
    }
}

function crearEventosCount() {
    let i = 0
    for (let articulo of cart) {

        let countInput = document.getElementById("input-" + i)

        countInput.addEventListener("input", () => {
            articulo["count"] = countInput.value
            actualizarTotal();
        })
        i++
    }
}

function convertCurrency() {
    for (let articulo of cart) {
        if (articulo.currency === "UYU" && preferredCurrency === "USD") {
            articulo.unitCost = articulo.unitCost / 40;
            articulo.currency = preferredCurrency
        }

        if (articulo.currency === "USD" && preferredCurrency === "UYU") {
            articulo.unitCost = articulo.unitCost * 40;
            articulo.currency = preferredCurrency
        }
    }
}

function swapPreferredCurrency() {
    (preferredCurrency === "UYU") ?
        preferredCurrency = "USD" :
        preferredCurrency = "UYU"
}

function formatNumber(number) {
    let formattednumber = new Intl.NumberFormat().format(number)
    return formattednumber
}

function getValorEnvio() {
    const standard = document.getElementById("envio-standard")
    const express = document.getElementById("envio-express")
    const premium = document.getElementById("envio-premium")

    if (standard.checked) {
        return standard.value
    }
    else if (express.checked) {
        return express.value
    }
    else {
        return premium.value
    }
}

function actualizarCostoEnvio() {
    costoEnvioHTML = document.getElementById("costo-envio")
    valorEnvio = getValorEnvio()
    let costoEnvio = parseFloat(subtotal) * parseFloat(valorEnvio)
    costoEnvioHTML.innerHTML = `<small>${preferredCurrency}</small> ${formatNumber(costoEnvio)}`
}

function actualizarSubtotal() {
    let i = 0
    subtotal = 0;
    for (let articulo of cart) {
        let subtotalArticulo = document.getElementById("subtotal-" + i)
        let valorSubtotalArticulo = articulo.unitCost * articulo.count;
        subtotal += valorSubtotalArticulo

        subtotalArticulo.innerHTML =
        `<small>${articulo.currency}</small> ${formatNumber(articulo.unitCost * articulo.count)}`
        i++
    }
    document.getElementById("subtotal").innerHTML =
        `<small>${preferredCurrency}</small> ${formatNumber(subtotal)}`
}

function actualizarTotal() {
    let total = document.getElementById("totalCostText")

    actualizarSubtotal()
    actualizarCostoEnvio()

    let costoEnvio = parseFloat(subtotal) * parseFloat(valorEnvio)
    total.innerHTML = `<small>${preferredCurrency}</small> ${formatNumber(subtotal + costoEnvio)}`
}

function mostrarCarritoActual() {
    let htmlItemsCarrito = ""

    let counter = 0
    cart.forEach(articulo => {
        htmlItemsCarrito += `
        <div class="cart-item sombra">
            <div class="cart-item-section cart-item-primary">  
                <!-- Imagen -->
                <div class="cart-item-image inset-sombrita" style="background-image: url(${articulo.src})">

                </div>

                <!-- Nombre -->
                <div>
                    <span class="cart-item-name">${articulo.name}</span>
                </div>
            </div>
            <div class="cart-item-section cart-item-secondary">  
            
            <!-- Subtotal -->
            <div class="cart-item-subtotal">
            <span id="subtotal-${counter}">
            <small>${articulo.currency}</small>
            ${formatNumber(articulo.unitCost * articulo.count)}
            </span>
            </div>
            
            <!-- Cantidad -->
            <div class="cart-item-qty">
                <input class="item-qty" id="input-${counter}" 
                type="number" value="${articulo.count}" min="0"/>
            </div>
                <!-- Eliminar -->
                <button data-value="${counter}" id="delete-${counter}" 
                class="cart-item-eliminar boton">
                <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        `
        counter++
    });

    let carritoHTML = document.getElementById("cart-item-container")
    carritoHTML.innerHTML = htmlItemsCarrito
    
    convertCurrency();
    actualizarTotal();
    crearEventosCartItems()
}

function validacionCarrito() {
    let calle = document.getElementById("calle")
    let numeroPuerta = document.getElementById("numero-puerta")
    let esquina = document.getElementById("esquina")

    if ((cart.length > 0) && calle.value && numeroPuerta.value &&
        esquina.value) {
            Swal.fire(
                {
                    customClass: {
                        popup: 'border-radius: 50px;'
                    },
                    title: '¡Felicidades!',
                    text: 'Compra realizada con éxito.',
                    icon: 'success'
                }
            );
    } else {
        Swal.fire(
            {
                customClass: {
                    popup: 'border-radius: 50px;'
                },
                title: '¡Cuidado!',
                text: 'El carrito está vacío o falta completar datos.',
                icon: 'error'
            }
        );
    }
}


document.getElementById("currency-swapper").addEventListener("click", () => {
    swapPreferredCurrency()
    mostrarCarritoActual()
})

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {
    mostrarCarritoInicial()
});