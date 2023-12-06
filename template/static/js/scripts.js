(function ($) {
  "use strict";

  //===== General Variables =====//
  var width,
    headerWidth,
    scene,
    parallax,
    wow,
    isChrome,
    jQuerycontainer,
    selector,
    link,
    url,
    target,
    sTop,
    sid,
    offset,
    height,
    messageAlert,
    messageText,
    alertBox;

  //===== Parallax =====//
  if ($(".parallax").length > 0) {
    (scene = $(".parallax").get(0)),
      (parallax = new Parallax(scene, {
        relativeInput: true
      }));
  }

  //===== Text Rotating =====//
  if ($(".text-rotating").length > 0) {
    $(".text-rotating").Morphext({
      // The [in] animation type. Refer to Animate.css for a list of available animations.
      animation: "bounceIn",
      // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
      separator: ",",
      // The delay between the changing of each phrase in milliseconds.
      speed: 4000,
      complete: function () {
        // Called after the entrance animation is executed.
      }
    });
  }

  $(document).ready(function () {
    //===== Width =====//
    width = window.innerWidth;
    headerWidth = $(".resMenu").innerWidth();

    //===== Wow Animation Setting =====//
    if ($(".wow").length > 0) {
      wow = new WOW({
        boxClass: "wow", // default
        animateClass: "animated", // default
        offset: 0, // default
        mobile: true, // default
        live: true // default
      });
      wow.init();
    }

    //===== Responsive Menu =====//
    $(".resMenuTrigger").on("click", function () {
      $("body").toggleClass("slidein");
      if ($("body").hasClass("slidein")) {
        $("body").css({ "padding-left": headerWidth });
      } else {
        $("body").css({ "padding-left": 0 });
      }
      return false;
    });

    //===== Counter Up =====//
    if ($.isFunction($.fn.counterUp)) {
      $(".counter").counterUp({
        delay: 10,
        time: 2000
      });
    }

    //===== Bolby Nav =====//
    if ($("header nav").length > 0) {
      link = $("nav li a");

      // Move to specific section when click on menu link
      link.on("click", function (e) {
        target = $($(this).attr("href"));
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          600
        );
        $(this).addClass("active");
        e.preventDefault();
      });

      // Run the bolbyNav when scroll
      $(window).on("scroll", function () {
        bolbyNav();
      });

      // bolbyNav function
      // Change active link according to the active section in the window
      function bolbyNav() {
        sTop = $(window).scrollTop();
        $("section").each(function () {
          (sid = $(this).attr("id")),
            (offset = $(this).offset().top - 400),
            (height = $(this).height());
          if (sTop >= offset && sTop < offset + height) {
            link.removeClass("active");
            $("nav")
              .find('[data-scroll="' + sid + '"]')
              .addClass("active");
          }
        });
      }
      bolbyNav();
    }

    //===== FancyBox =====//
    if ($("[data-fancybox]").length > 0) {
      Fancybox.bind("[data-fancybox]", {
        //
      });
    }

    //===== Contact Form Validation =====//
    if ($("#contForm").length) {
      // when the form is submitted
      $("#contForm").on("submit", function (e) {
        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
          url = "../form/contact.php";

          // POST values in the background the the script URL
          $.ajax({
            type: "POST",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
              // data = JSON object that contact.php returns

              // we recieve the type of the message: success x danger and apply it to the
              (messageAlert = "alert-" + data.type),
                (messageText = data.message);

              // let's compose Bootstrap alert box HTML
              alertBox =
                '<div class="alert ' +
                messageAlert +
                ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                messageText +
                "</div>";

              // If we have messageAlert and messageText
              if (messageAlert && messageText) {
                // inject the alert to .messages div in our form
                $("#contForm").find(".messages").html(alertBox);
                // empty the form
                $("#contForm")[0].reset();
              }
            }
          });
          return false;
        }
      });
    }

    //===== Slick Carousel =====//
    if ($.isFunction($.fn.slick)) {
      //====== Testimonials Carousel =====//
      $(".testiCaro").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 6000,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        speed: 2000,
        centerPadding: "0",
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: true
      });
    }
  }); //===== Document Ready Ends =====//

  //===== Window OnLoad =====//
  $(window).on("load", function () {
    ("use strict");

    //===== Preloader =====//
    $("#preloader").delay(350).fadeOut("slow");
    // Because only Chrome supports offset-path, feGaussianBlur for now
    isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (!isChrome) {
      document.getElementsByClassName("infinityChrome")[0].style.display =
        "none";
      document.getElementsByClassName("infinity")[0].style.display = "block";
    }

    //===== Isotope =====//
    if (jQuery(".portItem").length > 0) {
      if (jQuery().isotope) {
        jQuerycontainer = jQuery(".masonry"); // cache container
        jQuerycontainer.isotope({
          itemSelector: ".portItem",
          columnWidth: 0.1
        });
        jQuery(".portFilter li").on("click", function () {
          selector = jQuery(this).attr("data-filter");
          jQuery(".portFilter li").removeClass("active");
          jQuery(this).addClass("active");
          jQuerycontainer.isotope({
            filter: selector
          });
          return false;
        });
        jQuerycontainer.isotope("layout"); // layout/layout
      }
      jQuery(window).resize(function () {
        if (jQuery().isotope) {
          jQuery(".masonry").isotope("layout"); // layout/relayout on window resize
        }
      });
    }

    //===== Infinite Scroll =====//
    if ($(".masonry").length > 0) {
      // $(".masonry").infiniteScroll({
      //   path: ".nextPage",
      //   append: ".portItem",
      //   button: ".loadMore",
      //   // using button, disable loading on scroll
      //   scrollThreshold: false,
      //   status: ".pageLoadStatus"
      // });
      var initShow = 6; //number of items loaded on init & onclick load more button
      var counter = initShow; //counter for load more button
      var iso = $(".masonry").data("isotope"); // get Isotope instance

      loadMore(initShow); //execute function onload

      function loadMore(toShow) {
        jQuerycontainer.find(".hidden").removeClass("hidden");

        var hiddenElems = iso.filteredItems
          .slice(toShow, iso.filteredItems.length)
          .map(function (item) {
            return item.element;
          });
        $(hiddenElems).addClass("hidden");
        jQuerycontainer.isotope("layout");

        //when no more to load, hide show more button
        if (hiddenElems.length == 0) {
          jQuery("#loadMore").hide();
          jQuery(".noMorePosts").show();
        } else {
          jQuery("#loadMore").show();
          jQuery(".noMorePosts").hide();
        }
      }

      //when load more button clicked
      $("#loadMore").on("click", function () {
        if ($(".portFilter").data("clicked")) {
          //when filter button clicked, set initial value for counter
          counter = initShow;
          $(".portFilter").data("clicked", false);
        } else {
          counter = counter;
        }

        counter = counter + initShow;

        loadMore(counter);
      });

      //when filter button clicked
      $(".portFilter").on("click", function () {
        $(this).data("clicked", true);

        loadMore(initShow);
      });
    }
  }); //===== Window OnLoad Ends =====//
})(jQuery);
