// Global
var $d = $(document),
    $w = $(window),
    $body = $('body'),
    $nav = $('nav'),
    navTop = $nav.offset().top;
    hamburgerMenu = $('#canvase'),
    hamburgerMenuTrigger = $('[hamburget__trigger]'),
    m_gsearch = $('#gsearch__container'),
    m_gsearchTrigger = $('[gsearch-trigger]'),
    m_gsearchcloud__bg = $('#gsearchcloud__bg'),
    trigger_tab = $('.tab-item'),
    trigger_cookieClose = $('#trigger_cookieClose'),
    ele_cookies = $('#cookies'),
    m_menuLink = $('#canvase .menu__link a'),
    askanexpert__trigger = $('#askanexpert__trigger'),
    askanexpert= $('#askanexpert'),
    triggerclose__askanexpert = $('#close__askanexpert'),
    modalToggle = $("[data-toggle='modal']"),
    modalDismiss = $("[data-dismiss='modal']"),
    autoCompleteAncher = $('.auto-result a'),
    bmiTabs = $('#bmi-tabs');
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
        m_menuLink.on('click', this.handler_canvasDropdownMenu.bind(this));
        askanexpert__trigger.on('click', this.handler_askanexpert.bind(this));
        triggerclose__askanexpert.on('click', this.close__askanexpert.bind(this));
        modalToggle.on('click', this.modal.bind(this));
        modalDismiss.on('click', this.modalClose.bind(this));
        autoCompleteAncher.on('click', this.autoCompleteClose.bind(this));
        bmiTabs.find('.tab').on('click', this.bmiTypeSwtch.bind(this));
        $w.on('scroll', this.sticky_nav.bind(this));
    },
    init: function(){ 
       var _this = this;
        this.events();
        //When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target.classList.value.indexOf('modal') > -1) {
                _this.modalClose();
            }
        }
    },
    sticky_nav: function(e){
        var height = $nav.outerHeight();
        console.log('navTop', navTop)
        if($w.scrollTop() >= navTop && $w.width() >= 1200) {
            if($body.find('#sticky-fill').length <= 0){
                $nav.addClass('sticky');
                $nav.after("<div id='sticky-fill' style='height:"+height+"px'></div>");
            }
        } else {
            $body.find('#sticky-fill').remove();
            $nav.removeClass('sticky');
        }
            
            
    },
    bmiTypeSwtch: function(e){
        var units= {
            weight: "",
            height: ""
        },
            ele = $(e.target),
            role = ele.attr('data-role'),
            emi_weight = $('#bmi-weight-field'),
            emi_height = $('#bmi-height-field');
            emi_units = $('#bmiunits'),
            ele.siblings().removeClass('active');
            ele.addClass('active');
        switch(role) {
            case "standard":
                units.weight = "Weight (pounds)";
                units.height = "Height (cms)";
                emi_units.val('standard');
                break;
            case "metric":
                units.weight = "Weight (Kgs)";
                units.height = "height (ft's)";
                emi_units.val('metric');
                break;
        }
        emi_weight.val('');
        emi_height.val('');
        emi_weight.attr('placeholder', units.weight)
        emi_height.attr('placeholder', units.height)
    },
    modalClose: function(){
        var activeModal = $('.modal.open');
        activeModal.hide();
        this.bodyScrollBlock(!true);
    },
    modal: function(e){
        var ele = $(e.target),
            target = ele.data('target');
        $(target).show().addClass('open');
        this.bodyScrollBlock(true)
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
    autoCompleteClose: function(e){
        var ele = $(e.target);
        ele.closest('.auto-result').addClass('hide');
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
    },
    close__askanexpert: function(){
        askanexpert__trigger.removeClass('close');
        askanexpert.removeClass('open');
    },
    handler_askanexpert: function(e){
        var ele = $(e.target);
        ele.toggleClass('close');
        askanexpert.toggleClass('open');
    },
    handler_canvasDropdownMenu: function(e){
        var ele = $(e.target);
        if(ele.parent().hasClass('slide-open')){
            ele.parent().find('.dropdown__links').slideUp();
            ele.parent().removeClass('slide-open');
        } else {
            if(ele.siblings().hasClass('dropdown__links')){
                ele.parent().find('.dropdown__links').slideDown();
                ele.parent().addClass('slide-open');
            }
        }
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