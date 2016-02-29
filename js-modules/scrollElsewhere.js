/*
@param DOMElement scrollField  place where scroll must to happen
@param DOMElement scroll       frame where scroll is working in real
@param DOMElement unscroll     place where scroll must not work.
*/
function scroll__start (scrollField, scroll, unscroll) {

  var touch,
      coords__start;

  if (unscroll) {
    addListenerMulti(unscroll, "DOMMouseScroll mousewheel scroll", function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
    unscroll.addEventListener("touchstart", function(event) {
      event.stopPropagation();
      touch = false;
    });
  }

  addListenerMulti(scrollField, "DOMMouseScroll mousewheel scroll", function(event) {
    event.preventDefault();

    var delta = 0;


    console.log(event);
    // Old school scrollwheel delta
    if (event.detail) { delta = -event.detail*40; }

    // Webkit
    if (event.wheelDelta) { delta = event.wheelDelta; }
    // if (event.originalEvent.wheelDelta) { delta = event.originalEvent.wheelDelta; }

    //Really Gecko by vitasar
    // if ( event.originalEvent.detail) { delta = -event.originalEvent.detail*40;}
    // if ( event.originalEvent.detail) { delta = -event.originalEvent.detail*40;}

    scroll.scrollTop = scroll.scrollTop - delta;
  });


  scrollField.addEventListener("touchstart", function(event) {
    coords__start = event.originalEvent.changedTouches[0].pageY;
    touch = true;
  });
  window.addEventListener("touchmove", function(event) {
    if (touch) {
      event.preventDefault();
      var coords__finish = event.originalEvent.changedTouches[0].pageY,
          delta = coords__finish - coords__start;
          coords__start = coords__finish;

      scroll.scrollTop = scroll.scrollTop - delta;
    }
  });

  window.addEventListener("touchend", function() {
    if (touch) touch = false;
  });
};

function scroll__stop (scrollField, scroll, unscroll) {
  removeListenerMulti(scrollField, "DOMMouseScroll mousewheel scroll touchstart", false);
  removeListenerMulti(unscroll, "DOMMouseScroll mousewheel scroll touchstart", false);
  removeListenerMulti(window, "touchmove touchend", false);
};
