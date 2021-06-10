(function ($) {
    "use strict";

    //sticky menu
    $(window).on('scroll', function () {
        var window_top = $(window).scrollTop() + 0;
        if (window_top > 0) {
            $('.sm_header_part').addClass('menu_fixed animated slideInDown');
        } else {
            $('.sm_header_part').removeClass('menu_fixed animated slideInDown');
        }
    });
    //menu icon
    $('.close_icon').on('click', function () {
        $('.body_wrapper').removeClass('promotion').find('.promo_banner').css({
            top: '-70px',
            WebkitTransition: 'all 0.3s ease-in-out',
            MozTransition: 'all 0.3s ease-in-out',
            MsTransition: 'all 0.3s ease-in-out',
            OTransition: 'all 0.3s ease-in-out',
            transition: 'all 0.3s ease-in-out'
        });

    });

    $('.navbar-toggle').on('click', function () {
        $('.sm_header_part').toggleClass('active_header');
    });

    //wow js
    var wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        mobile: false,
        duration: 1000,
    });
    wow.init();
    //offcanvus menu js
    $("#pu_collaps_menu_icon").on('click', function () {
        $('.canvus_menu').addClass("canvus_active")
    });
    $(".canvus_close_icon").on('click', function () {
        $(".canvus_menu").removeClass("canvus_active")
    });

    //video popup
    var video_popup = $('.video_popup');
    if (video_popup.length > 0) {
        video_popup.magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,
            fixedContentPos: false
        });
    }

    //data bg image sec
    $("[data-bg-img]").each(function () {
        var bg = $(this).data("bg-img");
        $(this).css({
            "background": "no-repeat center/cover url(" + bg + ")",
        })
    })

    $("[data-bg-color]").each(function () {
        var bg_color = $(this).data("bg-color");
        $(this).css({
            "background-color": (bg_color)
        })
    })

    $(".sm_slider_wrapper").each(function () {
        var t = $(this),
            i = ($(this).attr("id"), $(this).data("perpage") || 1),
            a = $(this).data("loop"),
            e = $(this).data("speed") || 1000,
            o = $(this).data("space") || 0,
            l = $(this).data("effect"),
            c = $(this).data("center"),
            pl = $(this).data("autoplay"),
            nex = $(this).data("next"),
            pre = $(this).data("prev"),
            pag = $(this).data("pagination"),
            mous = $(this).data("mousewheel"),
            pagtype = $(this).data("paginationtype"),
            d = $(this).data("direction") || "horizontal",
            cfr = $(this).data("rotate"),
            cfs = $(this).data("stretch"),
            cfd = $(this).data("depth"),
            lops = $(this).data("loopslides"),
            scol = $(this).data("slidescolumn"),
            r = $(this).data("breakpoints");
        new Swiper(t, {
            slidesPerView: i,
            direction: d,
            spaceBetween: o,
            loop: a,
            speed: e,
            effect: l,
            breakpoints: r,
            centeredSlides: c,
            mousewheel: mous,
            slidesPerColumn: scol,
            slideToClickedSlide: true,
            loopedSlides: lops,
            autoplay: pl,
            coverflowEffect: {
                rotate: cfr,
                stretch: cfs,
                depth: cfd,
                modifier: 1,
                slideShadows: false,
            },
            pagination: {
                el: pag,
                type: pagtype,
                clickable: !0
            },
            navigation: {
                nextEl: nex,
                prevEl: pre
            }
        })
    })

    //maasonry js
    $(".sm_addons_grid_wrapper").each(function () {
        var dl_addons_grid_wrapper = $('.sm_addons_grid_wrapper');
        if (dl_addons_grid_wrapper.length) {
            $(this).dlAddonsGridLayout();
        }
    });

    //offerbook modal js

    //coockis js
    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            factory(require('jquery'));
        } else {
            factory(jQuery);
        }
    }(function ($) {
        var pluses = /\+/g;

        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }

        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }

        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }

        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
            try {
                s = decodeURIComponent(s.replace(pluses, ' '));
                return config.json ? JSON.parse(s) : s;
            } catch (e) {}
        }

        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }
        var config = $.cookie = function (key, value, options) {
            if (value !== undefined && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);
                if (typeof options.expires === 'number') {
                    var days = options.expires,
                        t = options.expires = new Date();
                    t.setTime(+t + days * 864e+5);
                }
                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '',
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }
            var result = key ? undefined : {};
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = parts.join('=');
                if (key && key === name) {
                    result = read(cookie, value);
                    break;
                }
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            return result;
        };
        config.defaults = {};
        $.removeCookie = function (key, options) {
            if ($.cookie(key) === undefined) {
                return false;
            }
            $.cookie(key, '', $.extend({}, options, {
                expires: -1
            }));
            return !$.cookie(key);
        };
    }));
    $(".close-cookie-warning").on("click", function () {
        $.cookie('HideCookieMessage', 'true', {
            expires: 120,
            path: '/'
        });
        $('div.cookies').hide();
    });
    (function ($) {
        if ($.cookie('HideCookieMessage')) {
            $('.cookies').hide();
        } else {
            $('.cookies').show();
        }
    })(jQuery);


    if ($(window).width() >= 1024) {
        $(".subscription_plan_list_1 .pricing_list_1").slice(0, 9).addClass('d-flex');
        if ($(".subscription_plan_list_1 .pricing_list_1:hidden").length != 0) {
            $(".subscription_plan_list_1 .loadMore_1").show();
        }
        $(".subscription_plan_list_1 .loadMore_1").on('click', function (e) {
            e.preventDefault();
            $(".subscription_plan_list_1 .pricing_list_1:hidden").slice(0, 4).addClass('d-flex');
            if ($(".subscription_plan_list_1 .pricing_list_1:hidden").length == 0) {
                $(".subscription_plan_list_1 .loadMore_1").fadeOut('slow');
            }
        });

        $(".subscription_plan_list_2 .pricing_list_2").slice(0, 9).addClass('d-flex');
        if ($(".subscription_plan_list_2 .pricing_list_2:hidden").length != 0) {
            $(".subscription_plan_list_2 .loadMore_2").show();
        }
        $(".subscription_plan_list_2 .loadMore_2").on('click', function (e) {
            e.preventDefault();
            $(".subscription_plan_list_2 .pricing_list_2:hidden").slice(0, 4).css("display", "flex");
            if ($(".subscription_plan_list_2 .pricing_list_2:hidden").length == 0) {
                $(".subscription_plan_list_2 .loadMore_2").fadeOut('slow');
            }
        });

        $(".subscription_plan_list_3 .pricing_list_3").slice(0, 9).css("display", "flex");
        if ($(".subscription_plan_list_3 .pricing_list_3:hidden").length != 0) {
            $(".subscription_plan_list_3 .loadMore_3").show();
        }
        $(".subscription_plan_list_3 .loadMore_3").on('click', function (e) {
            e.preventDefault();
            $(".subscription_plan_list_3 .pricing_list_3:hidden").slice(0, 4).css("display", "flex");
            if ($(".subscription_plan_list_3 .pricing_list_3:hidden").length == 0) {
                $(".subscription_plan_list_3 .loadMore_3").fadeOut('slow');
            }
        });
    }

    $(window).on('resize', function () {
        var win = $(this);
        if (win.width() >= 1024) {
            $(".subscription_plan_list_1 .pricing_list_1").slice(0, 9).addClass('d-flex');
            if ($(".subscription_plan_list_1 .pricing_list_1:hidden").length != 0) {
                $(".subscription_plan_list_1 .loadMore_1").show();
            }
            $(".subscription_plan_list_1 .loadMore_1").on('click', function (e) {
                e.preventDefault();
                $(".subscription_plan_list_1 .pricing_list_1:hidden").slice(0, 4).addClass('d-flex');
                if ($(".subscription_plan_list_1 .pricing_list_1:hidden").length == 0) {
                    $(".subscription_plan_list_1 .loadMore_1").fadeOut('slow');
                }
            });
        }
    });

}(jQuery));