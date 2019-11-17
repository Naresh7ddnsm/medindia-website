// Global
var $d = $(document),
    $w = $(window),
    $body = $('body'),
    hamburgerMenu = $('#canvase'),
    hamburgerMenuTrigger = $('[hamburget__trigger]'),
    m_gsearch = $('#gsearch__container'),
    m_gsearchTrigger = $('[gsearch-trigger]'),
    m_gsearchcloud__bg = $('#gsearchcloud__bg'),
    trigger_tab = $('.tab-item'),
    trigger_cookieClose = $('#trigger_cookieClose'),
    ele_cookies = $('#cookies');
    
app.global = {
    device: function(){
        return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    },
    events: function(){
        hamburgerMenuTrigger.on('click', this.hamburgerMenu.bind(this));
        m_gsearchTrigger.on('click', this.gsearch.bind(this));
        m_gsearchcloud__bg.on('click', this.gsearch_close.bind(this));
        //m_gsearchTrigger.on('mouseout', this.gsearch.bind(this, 'close'));
        trigger_tab.on('click', this.handler_tab.bind(this));
        trigger_cookieClose.on('click', this.handler_cookieClose.bind(this));
    },
    init: function(){ 
        //this.device() ? null : this.slickIcon();
        //this.slickIcon();
        this.events();
    },
    resize: function(){
        $this = this;
        $w.on('resize', function(){
            this.device() ? null : this.slickIcon();
        })
    },
    slickIcon: function(){
        $('#slider__icons').slick({
            centerMode: true,
            slidesToShow: 7,
            arrows: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                    }
                },{
                    breakpoint: 823,
                    settings: {
                        slidesToShow: 4,
                    }
                },{
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 3,
                    }
                },{
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                    }
                }]
          });
    },
    
    hamburgerMenu: function(e){
        var ele = $(e.target), 
            STATUS = ele.data('status');
        STATUS == 'open' ? hamburgerMenu.addClass('open') : hamburgerMenu.removeClass('open')
        STATUS == 'open' ? this.bodyScrollBlock(true) : this.bodyScrollBlock(!true)

    },
    bodyScrollBlock: function(STATUS){
        STATUS ? $body.addClass('scroll-block') : $body.removeClass('scroll-block');
    },
    gsearch_open: function(){
        m_gsearch.slideDown()
        this.bodyScrollBlock(true)
    },
    gsearch_close: function(){
        m_gsearch.slideUp();
        this.bodyScrollBlock(!true)
    },
    gsearch: function(e){
        _this = this;
        m_gsearch.slideToggle(360, function(){
            m_gsearch.css('display') == 'block' ? _this.bodyScrollBlock(true) : _this.bodyScrollBlock(!true)
        });
        /*var ele = $(e.target), 
            STATUS = ele.data('status');
        if(typeof STATUS === typeof undefind){
            ele.attr('data-status', 'open');
        }
        STATUS = ele.attr('data-status');
        if(STATUS == 'open'){
            this.gsearch_open()
            ele.attr('data-status', 'close');
            this.bodyScrollBlock(true)
        } else {
            this.gsearch_close();
            ele.attr('data-status', 'open');
            this.bodyScrollBlock(!true)
        }*/
    },
    handler_cookieClose: function(){
        ele_cookies.hide();
    },
    handler_tab: function(e){
        var ele =  $(e.target),
            target = ele.data('target'),
            parent = ele.closest('.tab__container'),
            content = parent.find('.tab-content');
        ele.find('.tab-link').addClass('active')
        ele.siblings().find('.tab-link').removeClass('active')
        parent.find('.tab-content').hide();
        parent.find(target).show();
    }

}

// Run the global stuff
$(function(){
    app.global.init();
    ele_cookies.show();
})
window.addEventListener("load", function(){
    app.global.slickIcon();
});