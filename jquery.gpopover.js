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
                var positionXCorrection = _repositionForViewportSides($popover, settings.viewportSideMargin);
                
                // Set the position of the arrow elements
                _setArrowPosition($arrow, $arrowShadow, $popover, positionXCorrection);

                // Prevent this event from having any further effect
                e.preventDefault();
                e.stopPropagation();
            }
        });
        
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
    
    function _repositionForViewportSides($popover, sideMargin) {
        var popoverOffsetLeft = $popover.offset().left;
        var positionXCorrection = 0;
        
        // Right edge
        if (popoverOffsetLeft + $popover.outerWidth() + sideMargin > $(window).width()) {
            var rightEdgeCorrection = -((popoverOffsetLeft + $popover.outerWidth() + sideMargin) - $(window).width());
            popoverOffsetLeft = popoverOffsetLeft + rightEdgeCorrection
        
            positionXCorrection = rightEdgeCorrection;
        }
        
        // Left edge
        if (popoverOffsetLeft < sideMargin) {
            var leftEdgeCorrection = sideMargin - popoverOffsetLeft;
            popoverOffsetLeft = popoverOffsetLeft + leftEdgeCorrection
            
            positionXCorrection += leftEdgeCorrection;
        }
        
        // Reposition the popover element if necessary
        if (positionXCorrection !== 0) {
            $popover.offset({ left: popoverOffsetLeft });
        }
        
        return positionXCorrection;
    }
    
    function _setArrowPosition($arrow, $arrowShadow, $popover, positionXCorrection) {
        var leftPosition = ($popover.outerWidth() / 2) - ($arrow.outerWidth() / 2) - positionXCorrection;
        
        $arrow.css({ top: -7, left: leftPosition });
        $arrowShadow.css({ top: -8, left: leftPosition });
    }
    
})(jQuery);
