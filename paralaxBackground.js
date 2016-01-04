/*
*    ParalaxBackground v1.0
*    egorovsa2@gmail.com
*
*    For install:
*
*     create block.It most has fixed height and background.
*    //HTML
*    <div style="width:100%; height:500px; background: url(/bgpath/bg.jpg);"></div>  
*
*    //JS  
*    jQuery('paralaxBlock').paralaxBackground({
*        coefficient: 0.2,
*        beginTop: -280
*    });
*/
(function ($) {
    var methods = {
        init: function (options) {
            this.each(function () {
                var $this = jQuery(this);
                var settings = jQuery.extend({
                    coefficient: 1,
                    beginTop: 0
                }, options);

                $this.data({
                    paralaxBackground: {
                        settings: settings
                    }
                });
                methods._initCopy($this);
            });
        },
        _initCopy: function ($this) {
            var scrTop = jQuery(window).scrollTop();
            var wHeight = jQuery(window).height();
            $this.css({
                'background-repeat': 'repeat-y'
            });

            this.eventScroll($this);
            this.actionScroll($this, scrTop, wHeight);
        },
        eventScroll: function ($this) {
            var self = this;

            jQuery(window).scroll(function () {
                var scrTop = jQuery(this).scrollTop();
                self.actionScroll($this, scrTop)
            });
        },
        actionScroll: function ($this, scrTop) {
            var data = $this.data().paralaxBackground;
            var settings = data.settings;
            scrTop = ((scrTop * settings.coefficient)) + settings.beginTop;
            if (settings.coefficient == 1)
                $this.css('background-attachment', 'fixed');
            else
                $this.css('background-position', 0 + ' ' + scrTop + 'px');
        }
    };
    jQuery.fn.paralaxBackground = function (method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
    };
})(jQuery);
