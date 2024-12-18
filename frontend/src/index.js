import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import { parseRequestUrl } from "./utils.js";
import ErrorScreen from "./screens/Error404.js";
import CartScreen from "./screens/CartScreen.js";
import SigninScreen from "./screens/SigninScreen.js";
const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin":SigninScreen,
};
const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");    
  const screen = routes[parseUrl] ? routes[parseUrl] : ErrorScreen;
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  if(parseUrl!='/')
  await screen.after_render();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
