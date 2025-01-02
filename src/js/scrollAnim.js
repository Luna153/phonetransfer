// scrollAnim //
function scrollAnim() {
  var pageTop = $(document).scrollTop();
  var pageBottom = pageTop + $(window).height();
  var tags = $(".js-animate");
  var activeOffset = 30;

  tags.each(function (index) {
    if ($(this).offset().top < pageBottom - activeOffset) {
      $(this).addClass("js-animate--active");
    } else {
      $(this).removeClass("js-animate--active");
    }
  });
}
scrollAnim(); // init
$(document).on("scroll", scrollAnim);