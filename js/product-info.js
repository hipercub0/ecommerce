var username = localStorage.getItem('nombreUsuario');

// Se llama desde ShowProductInfo();
function ShowCarousel() {
  let carousel = document.getElementById("carousel");

  carousel.innerHTML+= `
  <div class="carousel-item active">
    <img src="${product.images[0]}" class="d-block w-100" alt="...">
  </div>
  `

  for (i=1; i < product.images.length; i++) {
    carousel.innerHTML+= `
    <div class="carousel-item">
      <img src="${product.images[i]}" class="d-block w-100" alt="...">
    </div>
    `
  }
}

function ShowProductInfo() {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      let nombreProductoHTML = document.getElementById("nombre-producto");
      let productDescriptionHTML = document.getElementById("product-description");
      let soldCountHTML = document.getElementById("sold-count");
      let productCurrency = document.getElementById("product-currency");
      let productCost = document.getElementById("product-cost");
      let productCategoryHTML = document.getElementById("category-name");

      nombreProductoHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      soldCountHTML.innerHTML = product.soldCount + " vendidos";
      productCurrency.innerHTML = product.currency;
      productCost.innerHTML += ` ${product.cost}`;
      productCategoryHTML.innerHTML = product.category;

      ShowCarousel();
    }
  });
}

function ShowRelatedProducts() {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let product         = resultObj.data;
      let relatedProducts = product.relatedProducts;  // array de productos relacionados

      htmlRelacionados = "" // inicializo el contenido que voy a agregar al div al final

      // voy a buscar los productos relacionados en la
      // propiedad relatedProducts del json de products
      getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          let listaProductos = resultObj.data      // lista de todos los productos
          relatedProducts.forEach(product => {     // recorro el array por cada producto
            let productoActual = listaProductos[product];   // objeto que esta recorriendo el forEach

            htmlRelacionados += `<div class="card related-product">
              <img src="${productoActual.imgSrc}">
              <div class="product-data">
                <h5>${productoActual.name}</h5>
                <p>${productoActual.description}</p>
                <a href="/product-info.html"><button class="boton">Ir al artículo</button></a>
              </div>
            </div>`
          });
        }
        let productosRelacionados = document.getElementById("bottom-right");
        productosRelacionados.innerHTML += htmlRelacionados;
      });
    }
  });
}

function ShowComments() {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let htmlParaAgregar = "";
      comentarios = resultObj.data;
      comentarios.forEach(comment => {
        htmlParaAgregar += `
                <div class="card comentario col-12">
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

function agregarComentario(){
  let textArea = document.getElementById("comment-textarea")
  if (textArea.value) {
    let htmlParaAgregar = `
    <div class="card comentario col-12">
      <div class="header-comentario">
        <div class="header-comentario-left">
          <h5 class="nombre-usuario-comentario">${username}</h5>
          <small class="text-muted">${(new Date().toLocaleString())}</small>
        </div>
        <!--  <div class="header-comentario-estrellas">
          <h6>Puntuación: </h6>
        </div> -->
      </div>

      <p class="cuerpo-comentario">${textArea.value}</p>
    </div>
    `
    let cajaDeComentarios = document.getElementById("comentarios-posteados");
      cajaDeComentarios.innerHTML += htmlParaAgregar;
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  ShowProductInfo();
  ShowRelatedProducts();
  ShowComments();
});