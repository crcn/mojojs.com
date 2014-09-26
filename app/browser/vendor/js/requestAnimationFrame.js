// shim layer with setTimeout fallback

if (typeof window.requestAnimationFrame === "undefined")
window.requestAnimationFrame = (function(){
  return  window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
