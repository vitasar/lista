// vanilla js doesn't allow to set one handler on several events
function addListenerMulti(el, s, fn) {
  s.split(" ").forEach(function(e) {
    el.addEventListener(e, fn, false);
  });
}

function removeListenerMulti(el, s, fn) {
  s.split(" ").forEach(function(e) {
    el.removeEventListener(e, fn, false);
  });
}
