(function () {
  var toggleBtns = document.querySelectorAll('.toggle__trigger');
  var toggleAllBtn = document.querySelector('.toggle-trigger-all');

  if (toggleBtns) {
    toggleBtns.forEach(function (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        toggleBtn.closest('.toggle').classList.toggle('toggle--active');
      });
    })
  }

  if (toggleAllBtn) {
    var isActive = false;
    toggleAllBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!isActive) {
        document.querySelectorAll('.toggle').forEach(function (toggle) {
          toggle.classList.add('toggle--active');
        })
        isActive = true
      } else {
        document.querySelectorAll('.toggle').forEach(function (toggle) {
          toggle.classList.remove('toggle--active');
        })
        isActive = false
      }
    })
  }

  // notice toggle
  $('.notice__toggle').click(function (e) {
    e.preventDefault();
    $('.notice').toggleClass('notice--active');
    $('.notice__content').slideToggle();
    $('html, body').animate({
      scrollTop: $(".section-notice").offset().top - 85
    }, 300);
  });

  // icon toggle
  $('.faq-toggle__design').click(function (e) {
    // e.preventDefault();
    $(this).find('.icon-transform').toggleClass('icon-transform--active');
  });

})();

function toggleLineClamp() {
  var toggleContents = document.querySelectorAll('.toggle__content');

  if (toggleContents) {
    toggleContents.forEach(function (toggleContent) {

      var lineClamp = toggleContent.getAttribute('data-toggle-line');

      if (lineClamp) {
        // init
        toggleContent.closest('.toggle').querySelector('.toggle__trigger').classList.remove('hide');
        toggleContent.classList.remove('toggle__content--line-overflow');

        var height = toggleContent.offsetHeight;
        var lineHeight = window.getComputedStyle(toggleContent, null).getPropertyValue("line-height");

        if (height < (parseFloat(lineHeight) * (parseFloat(lineClamp) + 0.5))) {
          toggleContent.closest('.toggle').querySelector('.toggle__trigger').classList.add('hide');
        } else {
          toggleContent.classList.add('toggle__content--line-overflow');
          toggleContent.closest('.toggle').querySelector('.toggle__trigger').classList.remove('hide');
        }
      }
    });
  }
}