# Sticky
Provides basic "sticky" element functionality for keeping elements stuck to top of page when scrolling through content.

## How To Use

1. Download `/source/orc-sticky.js` and put it in your project. Link to it in your HTML page.
2. In your script call `orcSticky.bind('.selector-goes-here')` using whatever CSS selector you prefer.
3. Now the element in question will become stuck to the top of the screen as you scroll past it!

## Options

Before you call `orcSticky.bind()` you can set options for Sticky using `orcSticky.options()` as follows:

    orcSticky.options({
        className: '', // the class to apply to a stickied element when it is sticky. Defaults to 'sticky'.
        styles: '', Inline styles to apply to a stickied element when it is sticky. Defaults to "top: 0; position: fixed;"
    });
