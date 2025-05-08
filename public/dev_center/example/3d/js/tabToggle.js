$(function () {
  const tabToggleEle = document.querySelector('#tabToggle');
  let acquiesce = true;
  if (tabToggleEle) {
    acquiesce = JSON.parse(tabToggleEle.getAttribute('acquiesce'));
  }
  const tab = $('.tab-list .tab-content .tab-item');

  function setBackColor(checked = 0) {
    tab.each((index, domEle) => {
      let $dom = $(domEle);
      index == checked ? $dom.addClass('item-checked') : $dom.removeClass('item-checked');
    });
  }
  acquiesce && setBackColor();

  tab.click(function (e) {
    setBackColor($(this).index());
  });
});