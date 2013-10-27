/*
 * jquery.gpopover
 * http://github.com/markembling/jquery-gpopover
 *
 * A simple jQuery plugin for creating popover elements similar to Google's 
 * new 'apps' launcher/switcher.
 *
 * Copyright (c) 2013 Mark Embling (markembling.info)
 * Licensed under the BSD (3 clause) license.
 */

;(function($){
    
    $.fn.gpopover = function(options) {
        
        var settings = $.extend({}, $.fn.gpopover.defaults, options);
        
        return this.each(function(){
        
            var $trigger = $(this),
                $popover = $('#' + $trigger.data('popover'));
                
            // Trigger show
            if (options === "show") {
                var data = $trigger.data('gpopup.data');
                if (!data.$popover.is(":visible")) {
                    _showPopover($trigger, data.$popover, data.settings, data.arrows);
                }
                
                return;
            }
            
            // Trigger hide
            if (options === "hide") {
                var data = $trigger.data('gpopup.data');
                if (data.$popover.is(":visible")) {
                    _hidePopover(data.$popover, data.settings);
                }
                
                return;
            }
            
            // Default initialisation stuff
        
            var arrows = _addArrowElements($popover);
            
            // put stuff into data thing for later
            $trigger.data("gpopup.data", {
                $popover: $popover,
                settings: settings,
                arrows: arrows
            });
            
            if (settings.preventHide) {
                _preventHideClickPropagation($popover);
            }
        
            $trigger.click(function(e){
            
                if (! $popover.is(":visible")) {
                    
                
                    _showPopover($trigger, $popover, settings, arrows);
                    


                    // Prevent this event from having any further effect
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        
        });
        
    };
    
    // Default settings
    $.fn.gpopover.defaults = {
        width: 250,             // Width of the popover
        fadeInDuration: 65,     // Duration of popover fade-in animation
        fadeOutDuration: 65,    // Duration of popover fade-out animation
        viewportSideMargin: 10, // Space to leave the side if out the viewport
        preventHide: false      // Prevent hide when clicking within popover
    };
    
    // Private functions
    
    function _addArrowElements($popover) {
        var $arrow = $('<div class="gpopover-arrow"></div>');
        var $arrowShadow = $('<div class="gpopover-arrow-shadow"></div>');
        
        $popover.append($arrow);
        $popover.append($arrowShadow);
        
        return { $arrow: $arrow, $shadow: $arrowShadow };
    }
    
    function _preventHideClickPropagation($popover) {
        /* Prevent clicks within the popover from being propagated 
           to the document (and thus stop the popover from being 
           hidden) */
        $popover.click(function(e) { e.stopPropagation(); });
    }
    
    function _showPopover($trigger, $popover, settings, arrows) {
        // Set width before showing
        $popover.width(settings.width);
        
        // Show the popover
        $popover.fadeIn(settings.fadeInDuration);
        
        // Set up hiding
        $(document).one('click.popoverHide', function() {
            _hidePopover($popover, settings);
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
        _setArrowPosition(arrows, $popover, positionXCorrection);
    }
    
    function _hidePopover($popover, settings) {
        // Hide the popover
        $popover.fadeOut(settings.fadeOutDuration);
    }
    
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
    
    function _setArrowPosition(arrows, $popover, positionXCorrection) {
        var leftPosition = ($popover.outerWidth() / 2) - (arrows.$arrow.outerWidth() / 2) - positionXCorrection;
        
        arrows.$arrow.css({ top: -7, left: leftPosition });
        arrows.$shadow.css({ top: -8, left: leftPosition });
    }
    
})(jQuery);
