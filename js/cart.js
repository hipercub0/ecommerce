var cart = [];

function showCartInfo() {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let cartInfo = resultObj.data.articles;
            console.log(cartInfo)
            let htmlItemsCarrito = ""

            cartInfo.forEach(articulo => {
                htmlItemsCarrito+=`
                <!-- Imagen -->
                <div class="cart-item-image col-2">
                    <img class="cart-item-image-img-i" style="width:100%" src="${articulo.src}" />
                </div>

                <!-- Nombre -->
                <div class="cart-item-name col-5">
                    <h2>${articulo.name}</h2>
                </div>

                <!-- Cantidad -->
                <div class="cart-item-qty col-2">
                    <input type="number" value="${articulo.count}" min="0"/>
                </div>

                <!-- Subtotal -->
                <div class="cart-item-subtotal col-2">
                    <h3>${articulo.currency} ${articulo.unitCost}</h3>
                </div>
                `
            });

            let carrito = document.getElementById("cart-item-container")
            carrito.innerHTML = htmlItemsCarrito
        }
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showCartInfo()
});