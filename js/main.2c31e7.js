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
                +'<small>First connect wallet</small>' );
          
            $(".cd-wallet-trigger").html(btnConnect);  
        };
        web3wallet();



    });

})(jQuery);



const Dapp = {
    web3: null,
    mode: config['dappmode'],
    defaultref: config['defaultref'],
    tokenaddr: config['tokenaddress'],
    address: 0,
    token: null,
    lptoken: null,
    contract: 0,
    provider: null,
    providername: null,
    referal: 0,
    countdown: function(){
        var nextYear = moment.tz(config['presalestart'], "UTC");

		 $('.presalestart').countdown(nextYear.toDate(), function(event) {
		     var $this = $(this).html(event.strftime(''
    		     + '<span>%d</span> days '
    		     + '<span>%H</span> hr '
    		     + '<span>%M</span> min '
    		     + '<span>%S</span> sec'));
		 });
    },
    wallet: {
        list:{
            disconnect: true,
            network: ""
        },
        place: $(".errplace"),
        notification: function(txt, xkey, bgalert){
            var e = $('<div class="error-alert '+xkey+' ebg-'+bgalert+'">'
                     + txt
                +'</div>');
            
            e.appendTo(this.place);
            e.click(function(){
                $(this).remove();
                if(e.t){ 
                    clearTimeout(e.t);
                }
            })
            e.t = setTimeout(function(){
                e.remove();
            }, 20000);
        },
        reload: function(){
            var isWorking = true;
            for(var x in this.list){
                if(x == 'disconnect'){
                    isWorking = !this.list[x];
                    
                }else if(this.list[x]){
                    if($(".error-alert."+x).length == 0){
                        this.notification( this.list[x], x, 'error' );
                    }
                    isWorking = false;
                }
            }
            
            
            if(isWorking){
                if(Dapp.mode == 'presale'){
                    // show presale 
                    $(".overlayPresale").remove();
                    $("#referal").stop(true, true).fadeIn();
                }else{
                // show farm
                }
            }else{
                $("#referal").hide();
            }
        }
    },
    calc: function(x){
        var tokens = 0,
            tokenperbnb = 450,
            bnb = $(x).val() * 1;
            
        if( bnb > 10 ){
            $("#toPresaleCont").stop(true, true).fadeOut();
            $("#toPresale").val( "0.0" );
            $("#presaleError").show();
            $("#presaleBtn").hide();
            
        }else if( bnb < 0.1 ){
            $("#toPresaleCont").stop(true, true).fadeOut();
            $("#toPresale").val( "0.0" );
            if(bnb == 0){
                $("#presaleError").hide();
            }else{
                $("#presaleError").show();
            }
            $("#presaleBtn").hide();
            
        }else{
            $("#toPresaleCont").stop(true, true).fadeIn();
            
            tokens = tokenperbnb * bnb;
            $("#toPresale").val( tokens.toFixed(1) );
            
            $("#presaleError").hide();
            
            $("#presaleBtn").show();
        }
        
    },
    start: async function() {
        const { web3 } = this;
        $("html").attr('class', 'connected');
        $('.cd-account').remove();
        
        if($('.cd-account').length == 0){
            var acc = $('<div class="cd-account"></div>'),
                spinn = '<span class="spinner"></span>';
            acc.append('<span class="addr-balance">'
                            +'<span class="addr-ap3">'
                                +spinn
                            +'</span> AP3 '
                            +'<span class="addr-bnb">'
                                +spinn
                            +'</span> BNB'
                        +'</span>');
            acc.append('<span class="addr" onclick="Dapp.disconnectProvider()">'+spinn+'</span>');
            acc.appendTo( $('body') );
            
        }
        
        
        //  Get Accounts
        const accounts = await web3.eth.getAccounts();
        await this.accounts( accounts );
        
        //  Get Network Id
        const networkId = await web3.eth.net.getId();
        await this.networkId( networkId );
        
        this.wallet.reload();
    },
    disconnect: async function() {
        $("html").attr('class', 'disconnected');


        if(this.cBT ){
            clearTimeout(this.cBT );
        }
        
        this.wallet.reload();
    },
    cBT: null,
    checkBalance: async function(){
        var balance = await Dapp.web3.eth.getBalance(this.address),
            balance = Dapp.web3.utils.fromWei(balance) * 1,
            acc = $('.cd-account'),
            tokenbalance = -1;
            
        if(this.token != null){
            tokenbalance = await this.token.methods.balanceOf( this.address ).call();
            tokenbalance = Dapp.web3.utils.fromWei(tokenbalance) * 1;
        }
        
        var tokenbalanceUserbar = tokenbalance.toFixed(2),
            accbalance = balance.toFixed(2),
            accaddr = this.address.substring(0, 6) + "..." + this.address.slice(-4);
            
        if(acc.find('.addr-bnb').text() != accbalance){
            acc.find('.addr-bnb').text( accbalance );
        }
        if(acc.find('.addr-ap3').text() != tokenbalanceUserbar){
            acc.find('.addr-ap3').text( tokenbalanceUserbar );
        }
        if(acc.find('.addr').text() != accaddr){
            acc.find('.addr').text(accaddr);
        }
        
        // console.log('token balance', tokenbalance);
        
        $("#web3wallet").html(''
            +'<img src="img/logo.svg?ap3" class="img-web3wallet" alt="ap3 logo" />'
            +'<h5>'+tokenbalance.toFixed(4)+'</h5>'
            +'<p>AP3 IN YOUR WALLET</p>' );
        
        
        
        var lptokenbalance = -1;
        if(this.lptoken != null){
            lptokenbalance = await this.lptoken.methods.balanceOf( this.address ).call();
            lptokenbalance = Dapp.web3.utils.fromWei(tokenbalance) * 1;
            
        }
        
        // console.log('lp token balance', lptokenbalance);
        
        var _t = this;
        
        this.cBT = setTimeout(function(){
            _t.checkBalance();
        }, 800);
        
    },
    disconnectProvider: async function(){
        if( this.providername == 'walletconnect' ){
            this.provider.disconnect();
        }
        
        $("html").attr('class', 'disconnected');
        
    },
    checkreferal: function(){
        var hash = window.location.hash;
        if(hash.length){
            this.referal = hash.substring(2);
            setCookie('referal', this.referal, 365);
        }else{
            this.referal = getCookie('referal');
        }
    },
    copyref: function() {
        var text = 'http://ap3.town/#/'+this.address,
            input = document.createElement('input');
            
        input.setAttribute('value', text);
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
    },
    accounts: async function(accounts){
        this.address = accounts[0];
        
        $("#referal .refaddr").text('http://ap3.town/#/'+this.address);
        
        this.checkBalance();
    },
    networkId: async function(networkId){
        // if( networkId == 56 || networkId == 97){
            if(this.token == null){
                this.token = new this.web3.eth.Contract( abi.token, this.tokenaddr );
                this.wallet.reload();
            }
        // }else {
        //     // error
        //     this.wallet.list.network = 'Connect your wallet and set network to Binance Smart Chain!';
        //     this.wallet.reload();
        // }
    },
    contributePresale: async function(x){
        $(x).attr('disabled', 'disabled');
        $(x).html('<span class="spinner"></span>');
        var ref = Dapp.defaultref,
            amount = $("#fromPresale").val(),
            amount = Dapp.web3.utils.toWei(amount, "ether");
        if( Dapp.web3.utils.isAddress( this.referal ) ){
            ref = this.referal;
        }
        
        var _t = this,
            key = 'presale_' + Math.floor( Math.random() * 10000 );
        try {
            await Dapp.token.methods.presale( ref ).send({ 
                from: this.address,
                value: amount
            }).then(function(data){
                if(data.transactionHash !== undefined){
                    _t.wallet.notification('AP3 tokens have been transferred to your address.', key, 'success');
                    
                    return true;
                }
                _t.wallet.notification('The transaction was rejected.', key, 'error');
            });
        }catch (e){
            console.log(e);
            this.wallet.notification('The transaction was rejected.', key, 'error');
        }
        
        
        
        $(x).removeAttr( 'disabled');
        $(x).text('CONTRIBUTE');
    },
    init: async function(){
        
        console.log("Initializing...");
        
        initOverlay();
        
    },
    initWalletConnect: async function(){ 
        // walletConnect / trust wallet
        
        var RPC = {};
        RPC[1] = config.rpcurl;
        RPC[config.chainid] = config.rpcurl;
        
        const WalletConnectProvider = window.WalletConnectProvider.default;
        this.provider = new WalletConnectProvider({
            chainId: config.chainid,
            rpcUrl: config.rpcurl,
            bridge: 'https://bridge.walletconnect.org',
            rpc: RPC,
            qrcode: true
        });
        
        await this.provider.enable();
        
        if (!this.provider.connected) {
            // create new session
        }else{
            this.web3 = new Web3(this.provider);
            this.start();
            
            this.providername = 'walletconnect';
        
            var _t = this;
            this.provider.on("disconnect", function(code, reason) {
                _t.disconnect();
            });
            
            this.provider.on("accountsChanged", function(accounts) {
                _t.accounts(accounts);
            });
            
            this.provider.on('networkChanged', function (networkId) {
                _t.networkId(networkId);
            });
            
            deinitOverlay('walletConnect');
        }
        
    },
    initMetamask: async function () {
        
        if (window.ethereum) {
            this.provider = window.ethereum;
            
            try {
                await this.provider.enable();
            } catch (error) {
                alert("User denied account access to metamask or wrong chainid");

                return false;
            }
            
            this.web3 = new Web3(this.provider);
            this.start();
            
            this.providername = 'metamask';
            
            var _t = this;
            this.provider.on("disconnect", function(code, reason) {
                _t.disconnect();
            });
            
            this.provider.on("accountsChanged", function(accounts) {
                _t.accounts(accounts);
            });
            
            this.provider.on('networkChanged', function (networkId) {
                _t.networkId(networkId);
            });
            
            deinitOverlay('Metamask');
            
            return true;
        }else{
            alert("Only modern DApp browser support injected wallet.");
        }
        
        return false;
    }
};


var overlayNav = $('.cd-overlay-wallet'),
    overlayContent = $('.cd-overlay-content'),
    wallet = $('.cd-wallet'),
    walletClose = $(".cd-wallet-close"),
    toggleNav = $('.cd-wallet-trigger');
    
jQuery(document).ready(function($) {
    layerInit();
});

$(window).on('resize', function() {
    window.requestAnimationFrame(layerInit);
});

walletClose.click(function() {
    if (toggleNav.hasClass('close-wallet')) {
        deinitOverlay('closebtn');
    }
});

function initOverlay(){
    toggleNav.addClass('close-wallet');
    overlayNav.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
    }, 500, 'easeInCubic', function() {
        wallet.addClass('fade-in');
        walletClose.addClass('fade-in');
    });
}
function deinitOverlay(direction){
    toggleNav.removeClass('close-wallet');
    walletClose.removeClass('fade-in');
    wallet.removeClass('fade-in');
    overlayContent.attr('class', 'cd-overlay-content '+direction);
    
    overlayContent.children('span').velocity({
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
    }, 500, 'easeInCubic', function() {
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




Dapp.checkreferal();
Dapp.countdown();


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}


$(document).ready(function(){
    window.twttr = (function (d,s,id) {
    
        var t, js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
        js.src="https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
    
        return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
    
    }(document, "script", "twitter-wjs"));
    
    
    
    twttr.ready(function (twttr) {
    
        twttr.widgets.load();
        setInterval(function() {
            twttr.widgets.load();
        }, 60000);
    
    });
    

});