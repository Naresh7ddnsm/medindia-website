// Global
var $d = $(document),
    $w = $(window),
    hamburgerMenu = $('#canvase'),
    hamburgerMenuTrigger = $('[hamburget__trigger]')
app.global = {
    device: function(){
        return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    },
    events: function(){
        hamburgerMenuTrigger.on('click', this.hamburgerMenu.bind(this));
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
            arrows: false,
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
    }
}

// Run the global stuff
$(function(){
    app.global.init();
})
window.addEventListener("load", function(){
    app.global.slickIcon();
});