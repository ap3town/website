(function ($) {
    "use strict";

    $(window).on('load', function () {

        function preLoader() {
            setTimeout(function () {
                $('#preloader .scroll-static').addClass('loaded');
                setTimeout(function () {
                    $('body').addClass('loaded');
                    setTimeout(function () {
                        $('#preloader').remove();
                    }, 400);

                    pageanimation();

                }, 200);
            }, 200);
        };
        preLoader();
        
        
        function pageanimation(){
            var animate = new Animate({
                target: '[data-animate]',
                animatedClass: 'visible',
                offset: [0.2, 0.5],
                delay: 0,
                remove: false,
                reverse: true,
                scrolled: true,
                debug: true,
                onLoad: true,
                onScroll: true,
                onResize: true
            });
                
            animate.init();
        }

    });

    $(window).on('scroll', function () {

        var scrollTop = $(window).scrollTop();

        /* shapeRotate Init
        ============================ */
        function shapeRotate() {
            var rotate = 0 + scrollTop / 3 + 'deg';
            $('.shape').css({
                '-webkit-transform' : 'rotateZ(' + rotate + ') scale(1.5)',
                '-moz-transform'    : 'rotateZ(' + rotate + ') scale(1.5)',
                '-ms-transform'     : 'rotateZ(' + rotate + ') scale(1.5)',
                '-o-transform'      : 'rotateZ(' + rotate + ') scale(1.5)',
                'transform'         : 'rotateZ(' + rotate + ') scale(1.5)'
            });
        };
        shapeRotate();

        /* navFixed Init
        ============================ */
        function navFixed() {
            if (scrollTop >= 100) {
                $('header').addClass('fixed');
            } else {
                $('header').removeClass('fixed');
            }
        };
        navFixed();

        /* scrollToTop-ShowHide Init
        ============================ */
        function scrollToTop() {
            if (scrollTop >= 400) {
                $('.scroll-to-top').addClass('show');
            } else {
                $('.scroll-to-top').removeClass('show');
            }
        };
        scrollToTop();

        /* scroll-indicator Init
        ============================ */
        (function(){
            window.onscroll = function() {ProgressBar()};
            function ProgressBar() {
                var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var scrolled = (winScroll / height) * 100;
                document.querySelector(".scroll-indicator").style.height = scrolled + "%";
            }
        }());

    });


    $(document).ready(function () {

        /* menu Init
        ============================ */
        function menu() {
            $('.menu-btn').on('click', function () {
                $(this).toggleClass('close-menu');
                $('.nav-bar').toggleClass('show');
                $('.nav-bar-overlay').toggleClass('show');
            });
            $('.nav-item .nav-link, .scroll-to-top').on('click', function () {
                $('.menu-btn').removeClass('close-menu');
                $('.nav-bar').removeClass('show');
                $('.nav-bar-overlay').removeClass('show');
            });
        };
        menu();

        /* NavActiveClass Init
        ============================ */
        function navActiveClass() {
            $('body').scrollspy({ 
                target: '#menu-list'
            });
            // Smooth-Scroll Init
            $('a.nav-link, a.scroll-to-top, .default-btn[href^="#"]').on("click", function() {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                    if (target.length) {
                        $("html, body").animate({
                            scrollTop: target.offset().top
                        }, 1000, "easeInOutExpo");
                        return false;
                    }
                }
                return false;
            });
        };
        navActiveClass();

        /* CounterUp Init
        ============================ */
        function workPopup() {
            $(".zoom-gallery").magnificPopup({
                delegate: "a.zoom-image",
                type: "image",
                closeOnContentClick: !1,
                closeBtnInside: !1,
                mainClass: "mfp-with-zoom mfp-img-mobile",
                image: {
                    verticalFit: !0
                },
                gallery: {
                    enabled: !0
                },
                zoom: {
                    enabled: !0,
                    duration: 300,
                    opener: function (a) {
                        return a.find("img");
                    }
                },
                closeOnBgClick: true,
                fixedContentPos: false,
                callbacks: {
                    open: function() {
                        jQuery('body').addClass('noscroll');
                    },
                    close: function() {
                        jQuery('body').removeClass('noscroll');
                    }
                }
            });
        };
        workPopup();

        /* nfts-carousel Init
        ============================ */
        function clientsCarousel() {
            $('.owl-carousel.nfts-carousel').owlCarousel({
                loop:true,
                margin:30,
                autoplay:true,
                nav:false,
                dots:false,
                autoplayTimeout:7000, 
                responsive : {
                    0 : {
                        items:1,
                    },
                    480 : {
                        items:2,
                    },
                    575 : {
                        items:3,
                    },
                    991 : {
                        items:4,
                    }
                }
            });
        };
        clientsCarousel();

        /* wallet Init
        ============================ */
        function web3wallet() {
            $("#web3wallet").html(''
                +'<img src="img/logo.svg?ap3" class="img-web3wallet" alt="ap3 logo" />'
                +'<h5>0.000000</h5>'
                +'<p>AP3 IN YOUR WALLET</p>'
                +'<button class="default-btn" onclick="initWallet()">CONNECT WALLET</button>');
            
        };
        web3wallet();



    });

})(jQuery);

const Web3Modal = window.Web3Modal.default;

async function initWallet() {
    
    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider); 
    console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);
    
    /*
    if(location.protocol !== 'https:') {
        // https://ethereum.stackexchange.com/a/62217/620
        console.log("#alert-error-https");
        return;
    }
    */
    
    
    var providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
        }
      }
    }

    var web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
      
    var provider = await web3Modal.connect();

    App.web3 = new Web3(provider);
}