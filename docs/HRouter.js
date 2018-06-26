/** HRouter.js | Routing Library
  * @author Oyedele Hammed Horlah
  * @version 2.5
  * @since January 28, 2018
  * @see http://www.oyedelehammed.ml/HRouter.html
*/

function HRouter() {
  this.routes = [];
}
HRouter.prototype = {
  on: function( path, fn ) {
    this.routes.push({ path: path, fn: fn });
    return this;
  },
  run: function() {
    var self = this,
      go = function() {
        var url = location.hash.slice(1).split("?"),
        path = url[0] || "/",
        qs = url[1] + "&" + location.search.slice(1) || "",
        i = 0,
        keys = [];
        for ( ; i < self.routes.length; i++ ) {
          var reg = RegExp( "^" + self.routes[i].path.replace(/\:(\w+)/g, function( _, key ){
            keys.push( key );
            return "([^\/]+)";
          }) + "(?:\/$|$)" ),
          m;
          if ( reg.test( path ) ) {
            m = reg.exec( path );
            var req = { params: {}, query: {} };
            m.slice(1).map(function( val, i ){
              req.params[keys[i]] = val;
            });
            qs.split("&").map(function( p ){
              p = p.split("=");
              req.query[p[0]] = p[1];
            });
            self.routes[i].fn( req );
            break;
          }
        }
      };
    window.onload = go;
    window.onhashchange = go;
  }
};