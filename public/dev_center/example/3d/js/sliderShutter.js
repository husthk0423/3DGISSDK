$(function () {
  var slider = $('#slider-shutter');
  if (!slider || !slider[0]) return;
  var directionType;

  function sliderEvent(direction = 'UD', callBack) {
    directionType = direction;

    slider.mousedown(function (event) {
      deltax = event.clientX - $(this).offset().left;
      deltay = event.clientY - $(this).offset().top;
      $(document).bind('mousemove', start);
      $(document).bind('mouseup', end);
    });

    function start(event) {
      x = event.clientX - deltax;
      y = event.clientY - deltay;
      var offsetVal = 0;
      var clientWidth = document.documentElement.clientWidth;
      var clientHeight = document.documentElement.clientHeight;

      if (directionType == 'UD') {
        slider.css({ 'top': y + 'px' });
        offsetVal = 1 - (y / clientHeight).toFixed(2);
      } else {
        slider.css({ 'left': x + 'px' });
        offsetVal = x / clientWidth;
      }
      (callBack && typeof callBack == 'function') && callBack(offsetVal);
    }

    function end(event) {
      $(this).unbind('mousemove');
      $(this).unbind('mouseup');
    }
  }

  window.sliderEvent = sliderEvent;
}(window));