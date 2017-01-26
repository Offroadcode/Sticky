/**
 * @class orcSticky
 * @description Provides basic "sticky" element functionality for keeping elements 
 * stuck to top of page when scrolling through content. https://github.com/Offroadcode/Sticky
 * @author Offroadcode Limited
 */
var orcSticky = {
    activeStickyClass: 'sticky',
    stickyStyles: "top: 0; position: fixed;",
    onStick: false,
    onUnstick: false,
    stickies: [],
    /**
     * @class StickyElement
     * @param {JSON} data
     * @returns {void}
     * @description A class for the sticky object used to represent a sticky 
     * element.
     */
    StickyElement: function(data) { 
        var self = this;
        self.index = 0;
        self.selector = '';
        self.elem = null;
        self.top = null;
        self.placeholder = null;
        self.isAdded = false;
        if (data !== undefined) {
            if (data.index !== undefined) {
                self.index = data.index;
            }
            if (data.selector !== undefined) {
                self.selector = data.selector;
            }
            if (data.elem !== undefined) {
                self.elem = data.elem;
            }
            if (data.top !== undefined) {
                self.top = data.top;
            }
            if (data.placeholder !== undefined) {
                self.placeholder = data.placeholder;
            }
            if (data.isAdded !== undefined) {
                self.isAdded = data.isAdded;
            }
        }
    },
    /**
     * @method bind
     * @param {string} selector - CSS selector of elements to bind.
     * @returns {Array} the orcSticky.stickies array.
     * @description Iterates through matching elements, creates sticky objects 
     * for them, and activates event listeners for them.
     */
    bind: function(selector) {
        var elems = document.querySelectorAll(selector);
        if (elems && elems.length > 0) {
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];
                var position = elem.getBoundingClientRect();
                var body = document.body;
                var docEl = document.documentElement;
                var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
                var clientTop = docEl.clientTop || body.clientTop || 0;
                var top = Math.round(position.top + scrollTop - clientTop);
                var placeholder = document.createElement('div');
                placeholder.setAttribute("class", "sticky-placeholder");
                placeholder.style.width = position.width + 'px';
                placeholder.style.height = position.height + 'px';
                var sticky = new orcSticky.StickyElement({
                    index: orcSticky.stickies.length,
                    selector: selector,
                    elem: elem,
                    top: top,
                    placeholder: placeholder,
                    isAdded: false
                });
                orcSticky.listener(sticky);
                orcSticky.stickies.push(sticky);
                // Perform first time test just in case when first loaded.
                if (window.pageYOffset > sticky.top && !sticky.isAdded) {
                    orcSticky.stickSticky(sticky);
                } else if (window.pageYOffset < sticky.top && sticky.isAdded) {
                    orcSticky.unstickSticky(sticky);
                }
            }
        }
        return orcSticky.stickies;
    },
    /**
     * @method listener
     * @param {Object} sticky - see orcSticky.StickyElement()
     * @returns {void}
     * @description Triggers scroll listener, watching for when element is off 
     * screen, or it's original position comes back on screen, and either sticks 
     * or unsticks it accordingly.
     */
    listener: function(sticky) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > sticky.top && !sticky.isAdded) {
                orcSticky.stickSticky(sticky);
            } else if (window.pageYOffset < sticky.top && sticky.isAdded) {
                orcSticky.unstickSticky(sticky);
            }
        });
    },
    /**
     * @method options
     * @param {JSON} options
     * @param {string} options.className - the class to apply to a stickied element 
     * when it is sticky. Defaults to 'sticky'.
     * @param {string} options.styles - Inline styles to apply to a stickied element 
     * when it is sticky. Defaults to "top: 0; position: fixed;".
     * @returns {void}
     * @description Overrides default options for the module with user-set options.
     */
    options: function(options) {
        if (options) {
            if (options.className !== undefined) {
                orcSticky.activeStickyClass = options.className;
            }
            if (options.styles !== undefined) {
                orcSticky.stickyStyles = options.styles;
            }
            if (options.onStick !== undefined) {
                orcSticky.onStick = options.onStick;
            }
            if (options.onUnstick !== undefined) {
                orcSticky.onUnstick = options.onUnstick;
            }
        }
    },
    /**
     * @method stickSticky
     * @param {Object} sticky - see orcSticky.StickyElement()
     * @returns {void}
     * @description Sticks the passed sticky.
     */
    stickSticky: function(sticky) {
        sticky.elem.classList.add(orcSticky.activeStickyClass);
        if (orcSticky.stickyStyles !== "") {
            var style = sticky.elem.getAttribute("style");
            if (style && style != null) {
                style = orcSticky.stickyStyles + style;
            } else {
                style = orcSticky.stickyStyles;
            }
        }
        sticky.elem.setAttribute("style", style);
        sticky.elem.parentNode.insertBefore(sticky.placeholder, sticky.elem);
        orcSticky.stickies[sticky.index].isAdded = true;
        if (orcSticky.onStick) {
            orcSticky.onStick(sticky.elem);
        }
    },
    /**
     * @method unstickSticky
     * @param {Object} sticky - see orcSticky.StickyElement()
     * @returns {void}
     * @description Unsticks the passed sticky.
     */
    unstickSticky: function(sticky) {
        sticky.elem.classList.remove(orcSticky.activeStickyClass);
        if (orcSticky.stickyStyles !== "") {
            var style = sticky.elem.getAttribute("style");
            style = style.split(orcSticky.stickyStyles).join("");
            sticky.elem.setAttribute("style", style);
        }
        sticky.elem.parentNode.removeChild(sticky.placeholder);
        orcSticky.stickies[sticky.index].isAdded = false;
        if (orcSticky.onUnstick) {
            orcSticky.onUnstick(sticky.elem);
        }
    }
};