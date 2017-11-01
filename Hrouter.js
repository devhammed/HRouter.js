/* HRouter.js Routing Library
 * Author: Oyedele Hammed Horlah
 * URL: http://www.oyedelehammed.ml/HRouter.html
 * Version: 1.1
*/

(function () {
[].slice.call(document.getElementsByClassName('hr-page')).forEach(function (p) { p.style.display = 'none'; });
[].slice.call(document.getElementsByTagName('hload')).forEach(function (h) {
var x = new XMLHttpRequest();
x.open('GET', h.dataset.url, false);
x.onload = function () {
h.outerHTML = x.responseText;
}
x.send();
});
var routes = {};
this.HRoute = function HRoute(a, b, c) {
routes[a] = {id: b, fn: c};
}
this.GET = function GET(a) {
var b = location.search.slice(1).split('&');
for (var i=0; i < b.length; i++) {
var c = b[i].split('=');
if (c[0] == a) return c[1];
  }
return false;
}
var HRouter = function () {
var app = document.getElementById('hr-app');
var url = location.hash.slice(1) || '/';
var route = routes[url];
if (app && route) {
app.innerHTML = document.getElementById(route.id).innerHTML;
route.fn && route.fn();
} else {
document.title = "Page not Found";
app.innerHTML = "404 Error - The page you are requesting for does'nt exit.";
  }
}
window.onhashchange = HRouter;
window.onload = HRouter;
})();