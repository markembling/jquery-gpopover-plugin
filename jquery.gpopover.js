(function($){
    
    $.fn.gpopover = function(options) {
        
        var settings = $.extend({}, $.fn.gpopover.defaults, options);
        
        // Set up all the extra bits this plugin adds/needs
        var $trigger = this;
        var idOfPopoverElement = this.data('popover');
        var $popover = $('#' + idOfPopoverElement);
        
        

        
        
        
        
        
        // Add the main arrow
        var $arrow = $('<div class="gpopover-arrow"></div>');
        $popover.append($arrow);
        
        // Add the second one used to create the shadow/outline bit
        var $arrowShadow = $('<div class="gpopover-arrow-shadow"></div>');
        $popover.append($arrowShadow);
        
        // The actual triggering function
        this.click(function(e){
            // $popover.on('click.popoverActual', function(){ console.log('stop'); e.stopPropagation(); })
            
            if (! $popover.is(":visible")) {
                // Set width before showing
                $popover.width(settings.width);
                
                $popover.fadeIn(settings.fadeInDuration);
                
                // Set up hiding
                $(document).one('click.popoverHide', function() { 
                    $popover.fadeOut(settings.fadeOutDuration);
                });
                
                // Sort out the position (must be done after showing)
                var triggerPos = $trigger.offset();
                $popover.offset({
                    left: (triggerPos.left + ($trigger.outerWidth() / 2)) - ($popover.outerWidth() / 2),
                    top: triggerPos.top + $trigger.outerHeight() + 10  
                    // the final 10 above allows room for the arrow above it
                });
                
                // Check and reposition if out of the viewport
                var popoverPos = $popover.offset();
                console.log(popoverPos);
                var positionXCorrection = 0;
                
                // Is it off the right side?
                if (popoverPos.left + $popover.outerWidth() + settings.viewportSideMargin > $(window).width()) {
                    // how muych by?
                    
                    var rightEdgeCorrection = -((popoverPos.left + $popover.outerWidth() + settings.viewportSideMargin) - $(window).width());
                    console.log(rightEdgeCorrection);
                    $popover.offset({ left: popoverPos.left + rightEdgeCorrection });
                    
                    positionXCorrection = rightEdgeCorrection;
                }
                
                
                // Is it off the left side?
                popoverPos = $popover.offset();
                console.log(popoverPos);
                
                if (popoverPos.left < settings.viewportSideMargin) {
                    // Work out how much by
                    
                    var leftEdgeCorrection = settings.viewportSideMargin - popoverPos.left;
                    console.log(leftEdgeCorrection);
                    $popover.offset({ left: popoverPos.left + leftEdgeCorrection });
                    
                    positionXCorrection += leftEdgeCorrection;
                }
                
                // Position the arrow thingy
                $arrow.css({
                    top: -7,
                    left: ($popover.outerWidth() / 2) - ($arrow.outerWidth() / 2) - positionXCorrection
                });
                
                // Position the arrow thingy shadow
                $arrowShadow.css({
                    top: -8,
                    left: ($popover.outerWidth() / 2) - ($arrow.outerWidth() / 2) - positionXCorrection
                });

                // Don't let this event go any further
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
        // make chainable
        return this;
        
    };
    
    // Default settings
    $.fn.gpopover.defaults = {
        width: 180,             // Width of the popover
        fadeInDuration: 75,     // Duration of popover fade-in animation
        fadeOutDuration: 75,    // Duration of popover fade-out animation
        viewportSideMargin: 10  // Space to leave the side if out the viewport
    };
    
    // Private functions
    // oh wait... there aren't any.
    
})(jQuery);
