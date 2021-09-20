function ShowProductInfo() {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let nombreProductoHTML  = document.getElementById("nombre-producto");
            let productDescriptionHTML = document.getElementById("product-description");
            let soldCountHTML = document.getElementById("sold-count");
            let productCurrency = document.getElementById("product-currency");
            let productCost = document.getElementById("product-cost");
        
            nombreProductoHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount + " vendidos";
            productCurrency.innerHTML = product.currency;
            productCost.innerHTML+= ` ${product.cost}`


            // array de productos relacionados
            let relatedProducts = product.relatedProducts;

            // por cada producto
            relatedProducts.forEach(product => {
                htmlRelacionados = "";
                getJSONData(PRODUCTS_URL).then(function (resultObj) {
                    if (resultObj.status === "ok") {
                        listaProductos = resultObj.data;
                        productoActual = listaProductos[product];
                        htmlRelacionados += `<div class="card related-product">
                        <img src="${productoActual.imgSrc}">
                        <div class="product-data">
                          <h5>${productoActual.name}</h5>
                          <p>${productoActual.description}</p>
                          <a href="/product-info.html"><button class="boton">Ir al artículo</button></a>
                        </div>
                      </div>`
                    }
                    let productosRelacionados = document.getElementById("bottom-right");
                    productosRelacionados.innerHTML += htmlRelacionados;
                });
                
            });
        }
    });
}

function ShowComments() {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            let htmlParaAgregar = "";
            comentarios = resultObj.data;
            comentarios.forEach(comment => {
                htmlParaAgregar+= `<div class="card comentario">
                <div class="header-comentario">
                  <div class="header-comentario-left">
                    <h5 class="nombre-usuario-comentario">${comment.user}</h5>
                    <small class="text-muted">${comment.dateTime}</small>
                  </div>
                  <div class="header-comentario-estrellas">
                    <h6>Puntuación: ${comment.score}</h6>
                  </div>
                </div>

                <p class="cuerpo-comentario">${comment.description}</p>
              </div>
                `
            });
            let cajaDeComentarios = document.getElementById("comentarios-posteados");
            cajaDeComentarios.innerHTML = htmlParaAgregar;
        }
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    ShowProductInfo();
    ShowComments();
});