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
        queryStr = url[1] + "&" + location.search.slice(1) || "",
        i = 0,
        keys = [];
        for ( ; i < self.routes.length; i++ ) {
          var reg = RegExp( "^" + self.routes[i].path.replace(/\:(\w+)/g, function( _, key ){
            keys.push( key );
            return "([^\/]+)";
          }) + "(?:\/$|$)" ),
          match;
          if ( reg.test( path ) ) {
            match = reg.exec( path );
            var req = { params: {}, query: {} };
            match.slice(1).map(function( val, idx ){
              req.params[ keys[ idx ] ] = val;
            });
            queryStr.split("&").map(function( pair ){
              pair = pair.split("=");
              req.query[ pair[0] ] = pair[1];
            });
            self.routes[ i ].fn( req );
            break;
          }
        }
      };
    window.onload = go;
    window.onhashchange = go;
  }
};
