const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

// const CATEGORIES_URL = "http://localhost:3000/categories";
// const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish";
// const CATEGORY_INFO_URL = "http://localhost:3000/category/info";
// const PRODUCTS_URL = "http://localhost:3000/products";
// const PRODUCT_INFO_URL = "http://localhost:3000/product/info";
// const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/product/info/comments";
// const CART_INFO_URL = "http://localhost:3000/cart/info";
// const CART_BUY_URL = "http://localhost:3000/cart/buy";

var username = localStorage.getItem('nombreUsuario');

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

let isLoggedOn = (username !== null) ? true : false;


// FIX
function redireccionarLogin() {
  if (!isLoggedOn && window.location.pathname !== '/index.html') {
    window.location.replace("index.html");
  }
  if (isLoggedOn && window.location.pathname === '/index.html') {
    window.location.replace("home.html");
  }
}

function mostrarNombreUsuario() {  
  document.getElementById("navbar-content").innerHTML += `
  <div class="btn-group">
  <button type="button" class="btn btn-danger">¡Hola, ${username}!</button>
  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <div class="dropdown-menu dropdown-menu-right">
  <a class="dropdown-item" href="cart.html"><i class="fas fa-shopping-cart" style="margin-right:.5em; color: var(--color-enfasis)"></i>Ver mi carrito</a>
    <a class="dropdown-item" href="my-profile.html"><i class="fas fa-user-circle mr-1" style="margin-right:.5em; color: var(--color-enfasis)"></i> Mi perfil</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="logout.html"><i class="fas fa-sign-out-alt" style="margin-right:.5em; color: var(--color-enfasis)"></i>Cerrar sesión</a>
  </div>
</div>
  `;
}

function mostrarBotonLogin() {
  document.getElementById("navbar-content").innerHTML += `
  <button type="button" class="btn btn-danger">Iniciar sesión</button>
  `;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //  redireccionarLogin();
  mostrarNombreUsuario();
});