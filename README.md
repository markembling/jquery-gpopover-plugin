jQuery 'gpopover' Plugin
========================

A simple jQuery plugin for creating popover elements similar to Google's apps launcher/switcher.

## Installation

### Package Managers

You can install the plugin using NPM or Bower.

    npm install jquery-gpopover-plugin
    bower install jquery-gpopover-plugin

### Manually

If you'd prefer to install manually, download and include the JS and CSS files in your project.

    <link rel="stylesheet" href="jquery.gpopover.js">
    <script type="text/javascript" src="jquery.gpopover.js"></script>

Ensure jQuery is also available and included before the plugin JS file.

## Usage

Create a trigger element on your page (for example, a link or a button), and set the `data-popover` attribute to the ID of the element you wish to pop over.

    <button id="my-trigger" data-popover="my-popover">Click Me</button>
    
Create the popover content element somewhere in your document. You may place this wherever you wish in the document (for example, at the end or after your trigger element). Simply make sure the ID matches that which your trigger has, and give it the class of `gpopover` to make sure it is styled correctly and hidden initially.

    <div id="my-popover" class="gpopover">
        This is where your popover content goes.
    </div>
    
Initialise the plugin on your trigger element. That's it.

    $('#my-trigger').gpopover();

You can also trigger a show or hide through code (i.e. without the user clicking), by invoking the show or hide methods.:

    $('#my-trigger').gpopover('show');
    $('#my-trigger').gpopover('hide');

This is normally best done after initialising your popovers as above, but if it hasn't been done, it will do so using default options before then acting.
    
## Demo

Want to see the popovers in action? Check out the [examples](https://markembling.github.io/jquery-gpopover-plugin/).

## Customising the Plugin

### Options

The plugin has some options which can be passed to it:

| Property | Default | Description
| -------- | ------- | -----------
| `width`  | 250     | The width of the popover element (pixels) 
| `fadeInDuration` | 65 | Duration of popover fade-in animation (ms)
| `fadeOutDuration` | 65 | Duration of popover fade-out animation (ms)
| `viewportSideMargin` | 10 | Space to leave at the side when against the viewport edge (pixels)
| `preventHide` | `false` | Prevent hiding when clicking within popover (true/false)
| `onShow` | (none) | Callback to be run when the popover is shown. `this` is the trigger element and the first argument passed to the function is the popover element (both jQuery-wrapped).
| `onHide` | (none) | Callback to be run when the popover is hidden. Same as `onShow`.

### Styling

The default styling is visually similar to Google's pop-out apps menu as I like the clean lines and look. However the appearance can be modified by overriding, changing, or replacing the styles in the `jquery.gpopover.css` stylesheet.

The main popover element has the `gpopover` class, and the arrow is made up of two elements with the classes `gpopover-arrow` and `gpopover-arrow-shadow`. The latter is positioned 1 pixel higher to give the shadow/outline effect.

## License

Licensed under the BSD (3 clause) license.  
Copyright (c) 2013-2019 [Mark Embling](markembling.info).
