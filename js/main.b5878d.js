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
            var btnConnect = '<button class="default-btn" onclick="Dapp.init()">CONNECT WALLET</button>';
            
            $("#web3wallet").html(''
                +'<img src="img/logo.svg?ap3" class="img-web3wallet" alt="ap3 logo" />'
                +'<h5>0.000000</h5>'
                +'<p>AP3 IN YOUR WALLET</p>'
                +btnConnect );
          
            $(".cd-nav-trigger").html(btnConnect);  
        };
        web3wallet();



    });

})(jQuery);



const Dapp = {
    web3: null,
    start: async function() {
        const { web3 } = this;
        //  Get Accounts
        const accounts = await web3.eth.getAccounts();
        await this.accounts( accounts );
        
        
        //  Get Network Id
        const networkId = await web3.eth.net.getId();
        await this.networkId( networkId );
        

    },
    disconnect: async function() {
        console.log('disconnect');
    },
    accounts: async function(accounts){
        address.substring(0, 6) + "..." + address.slice(-4);
        
        console.log('accounts', accounts);
    },
    networkId: async function(networkId){
        
        console.log('networkId', networkId);
    },
    init: async function(){
        
        console.log("Initializing...");
        
        initOverlay();
        
    },
    initWalletConnect: async function(){ 
        // walletConnect / trust wallet
        
        const WalletConnectProvider = window.WalletConnectProvider.default;
        const provider = new WalletConnectProvider({
            chainId: 97,
            rpc: {
                56: 'https://bsc-dataseed.binance.org/',
                97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            },
            qrcode: true
        });
        
        await provider.enable();
        
        Dapp.web3 = new Web3(provider);
        Dapp.start();
        
        provider.on("disconnect", function(code, reason) {
            Dapp.disconnect();
        });
        
        provider.on("accountsChanged", function(accounts) {
            Dapp.accounts(accounts);
        });
        
        provider.on('networkChanged', function (networkId) {
            Dapp.networkId(networkId);
        });
        
    },
    initMetamask: async function () {
        
        if (window.ethereum) {
            
            Dapp.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            Dapp.start();
            
            window.ethereum.on("disconnect", function(code, reason) {
                Dapp.disconnect();
            });
            
            window.ethereum.on("accountsChanged", function(accounts) {
                Dapp.accounts(accounts);
            });
            
            window.ethereum.on('networkChanged', function (networkId) {
                Dapp.networkId(networkId);
            });
            
            
            return true;
        }
        
        return false;
    }
};


var overlayNav = $('.cd-overlay-nav'),
    overlayContent = $('.cd-overlay-content'),
    wallet = $('.cd-wallet'),
    toggleNav = $('.cd-nav-trigger');
    
jQuery(document).ready(function($) {
    layerInit();
});

$(window).on('resize', function() {
    window.requestAnimationFrame(layerInit);
});

/*
toggleNav.on('click', function() {
    if (!toggleNav.hasClass('close-nav')) {
    } else {
    }
});
*/

function initOverlay(){
    toggleNav.addClass('close-nav');
    overlayNav.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
    }, 500, 'easeInCubic', function() {
        wallet.addClass('fade-in');
    });
}
function deinitOverlay(){
    toggleNav.removeClass('close-nav');
    overlayContent.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
    }, 500, 'easeInCubic', function() {
        wallet.removeClass('fade-in');
        overlayNav.children('span').velocity({
            translateZ: 0,
            scaleX: 0,
            scaleY: 0,
        }, 0);
        overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            overlayContent.children('span').velocity({
                translateZ: 0,
                scaleX: 0,
                scaleY: 0,
            }, 0, function() {
                overlayContent.removeClass('is-hidden')
            });
        });
        if ($('html').hasClass('no-csstransitions')) {
            overlayContent.children('span').velocity({
                translateZ: 0,
                scaleX: 0,
                scaleY: 0,
            }, 0, function() {
                overlayContent.removeClass('is-hidden')
            });
        }
    });
}

function layerInit() {
    var diameterValue = (Math.sqrt(Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2)) * 2);
    overlayNav.children('span').velocity({
        scaleX: 0,
        scaleY: 0,
        translateZ: 0,
    }, 50).velocity({
        height: diameterValue + 'px',
        width: diameterValue + 'px',
        top: -(diameterValue / 2) + 'px',
        left: -(diameterValue / 2) + 'px',
    }, 0);
    overlayContent.children('span').velocity({
        scaleX: 0,
        scaleY: 0,
        translateZ: 0,
    }, 50).velocity({
        height: diameterValue + 'px',
        width: diameterValue + 'px',
        top: -(diameterValue / 2) + 'px',
        left: -(diameterValue / 2) + 'px',
    }, 0);
}