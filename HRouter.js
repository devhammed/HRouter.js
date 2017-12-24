/** HRouter v2.0
  * @author Oyedele Hammed Horlah
  * @doc http://www.oyedelehammed.ml/HRouter.html
*/

(function() {
  window.routes = [];
  window.HRoute = function HRoute( pat, id, fn ) {
    routes.push({ pattern: pat, id: id, handler: fn });
  }
  var tpl = function( str, obj ) {
    if ( !obj ) return str;
    return str.replace(/\{%(.*?)%\}/g, function( _, val ) {
      with ( obj ) {
        return eval( val );
      }
    });
  }
  var go = function() {
    var url = location.hash.slice(1).split('?'),
    path = url[0] || '/',
    qs = url[1] + '&' + location.search.slice(1) || '',
    app = document.getElementById( 'hr-app' ),
    i = 0,
    fnd = false,
    keys = [];
    for (; i < routes.length; i++ ) {
      var pattern = RegExp(routes[i].pattern.replace(/\:([^\/]+)/g, function(_, key) {
        keys.push(key);
        return '([^\/]+)';
      }) + '(?:/$|$)'),
      m;
      if ( m = pattern.exec( path ) ) {
       var param = {},
       query = {};
       m.slice(1).forEach(function( val, i ) {
         param[keys[i]] = val;
       });
       qs.split('&').map(function( p ) {
         p = p.split('=');
         query[p[0]] = p[1];
       }) || {};
       var str = document.getElementById( routes[i].id ).innerHTML,
       obj = routes[i].handler( param, query );
       app.innerHTML = tpl( str, obj );
       fnd = true;
      }
    }
    if ( !fnd ) {
      document.title = 'Page not found';
      app.innerHTML = '<div><p>Sorry, the page you are requesting for is not found. go back to <a href="#/">home</a>.</p></div>';
    }
  }
  window.onload = go;
  window.onhashchange = go;
})();