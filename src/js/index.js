//@prepros-prepend scrollAnim.js
//@prepros-prepend toggle.js
//@prepros-prepend form_api.js
//@prepros-prepend gsapAnim.js


$(document).ready(function () {
  // GSAP //
  gsapAni();
  gsap.registerPlugin(ScrollTrigger);

  AOS.init({
    once: true // animate once
  });

  $(window).on("scroll", function () {
    AOS.init();
  });

  window.addEventListener('resize', () => {
    AOS.refresh();
  });

  // TAB
  // ------------------------
  $('.tabs_btn_binding').click(function () {
    var tabId = $(this).data('tab');
    $('.tabs_btn_binding, .table__con__binding').removeClass('active');

    $(this).addClass('active');
    $('#' + tabId).addClass('active').fadeIn('slow', function () {
      sliderResize();
    });
  });

  $('.tabs_btn').click(function () {
    var tabId = $(this).data('tab');
    $('.tabs_btn, .table__con').removeClass('active');

    $(this).addClass('active');
    $('#' + tabId).addClass('active').fadeIn('slow', function () {
      sliderResize();
    });
  });


  // SLIDER
  // ------------------------
  var elms = document.getElementsByClassName('splide');
  var sliders = [];
  var sliderTab;

  for (var i = 0, len = elms.length; i < len; i++) {

    var options = {
      perPage: 3,
      arrows: true,
      pagination: false,
      // gap: "0",
    };

    // 門號轉帳使用步驟
    if (elms[i].classList.contains('slider-binding')) {
      options.arrows = false;
      options.width = "100%";
      options.drag = false;
      options.perPage = 4;
      options.destroy = true;
      // options.gap = "50px";
      options.breakpoints = {
        768: {
          perPage: 1,
          destroy: false,
          pagination: true,
          drag: true,
          // gap: 0,
        },
      }
    }


    if (elms[i].classList.contains('slider-exclusive')) {
      options.arrows = false;
      options.width = "100%";
      options.drag = false;
      options.perPage = 3;
      options.destroy = true;
      // options.gap = "143.5px"
      options.breakpoints = {
        768: {
          perPage: 1,
          destroy: false,
          pagination: true,
          drag: true,
          gap: 0,
        },
      }
    }

    sliders[i] = new Splide(elms[i], options).mount();
  }



  // Resize
  function sliderResize() {
    for (var i = 0; i < sliders.length; i++) {
      sliders[i].emit('resize');
    }
  }

  // Navbar
  // ------------------------
  $(".nav__trigger").on("click", function () {
    var $nav = $(".nav");
    var $body = $("body");

    if (!$nav.hasClass("nav--active")) {
      $nav.addClass("nav--active");
      $body.addClass("scroll-fixed");
    } else {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");
    }

    $(".nav__link").on("click", function () {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");

    });

    $(".nav__overlay").on("click", function () {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");
    });

  });

  // Scroll 到區塊時 Navbar選單加上active
  // ------------------------
  $(window).on('scroll touchmove', function () {
    var scrollPos = $(this).scrollTop();
    var documentHeight = $(document).height();
    var windowHeight = $(this).height();
    var connectionHeight = $('#section-connection').height();

    $('section').each(function () {
      var sectionTop = $(this).offset().top - 100;
      var sectionBottom = sectionTop + $(this).height();
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        var sectionId = $(this).attr('id');
        $('.nav__link').removeClass('active');
        $('.nav__link[href="#' + sectionId + '"]').addClass('active');
      }
    });

    // Check if at the bottom of the page（解決section-connection高度不足問題）
    if (scrollPos + windowHeight + connectionHeight + (window.innerWidth <= 768 ? 300 : 0) >= documentHeight) {
      $('.nav__link').removeClass('active');
      $('.nav__link[href="#section-connection"]').addClass('active');
    }
  });

});


document.addEventListener("DOMContentLoaded", function () {
  let scripts = document.querySelectorAll('script.timestamp');

  scripts.forEach(function (script) {
    if (script.src) {
      script.src = script.src + "?v=" + dateString;
    }
  });
});