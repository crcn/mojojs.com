module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ parse("<!DOCTYPE html>"), text(" "), element("html", {
        lang: [ "en" ]
    }, [ text(" "), element("head", {}, [ text(" "), element("link", {
        rel: [ "stylesheet" ],
        href: [ "/vendor/bootstrap/css/bootstrap.min.css" ]
    }), text(" "), element("link", {
        rel: [ "stylesheet" ],
        href: [ "/vendor/rainbow/themes/github.css" ]
    }), text(" "), element("script", {
        type: [ "text/javascript" ],
        src: [ "/vendor/js/jquery-1.10.2.js" ]
    }), text(" "), element("script", {
        type: [ "text/javascript" ],
        src: [ "/vendor/bootstrap/js/bootstrap.min.js" ]
    }), text(" "), element("link", {
        rel: [ "stylesheet" ],
        href: [ "/css/main.css" ]
    }), text(" ") ]), text(" "), element("body", {}, [ text(" "), element("nav", {
        "class": [ "navbar navbar-default" ],
        role: [ "navigation" ]
    }, [ text(" "), element("div", {
        "class": [ "navbar-header" ]
    }, [ text(" ") ]), text(" "), element("ul", {
        "class": [ "nav navbar-nav" ]
    }, [ text(" "), element("li", {}, [ element("a", {
        href: [ "/" ]
    }, [ text("Home") ]) ]), text("  "), element("li", {}, [ element("a", {
        href: [ "https://github.com/classdojo/mojo.js" ]
    }, [ text("Documentation") ]) ]), text(" "), element("li", {}, [ element("a", {
        href: [ "/plugins" ]
    }, [ text("Plugins") ]) ]), text(" ") ]), text(" "), element("a", {
        href: [ "https://github.com/classdojo/mojo.js" ]
    }, [ element("img", {
        style: [ "position: absolute; top: 0; right: 0; border: 0;" ],
        src: [ "https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" ],
        alt: [ "Fork me on GitHub" ]
    }) ]), text(" ") ]), text(" "), block({
        html: {
            fn: function() {
                return this.ref("sections.pages").value();
            },
            refs: [ "sections.pages" ]
        }
    }), text(" "), element("script", {
        type: [ "text/javascript" ],
        src: [ "/vendor/js/rainbow-custom.min.js" ]
    }), text(" "), element("script", {
        type: [ "text/javascript" ],
        src: [ "/js/load-examples.js" ]
    }), text(" ") ]), text(" ") ]), text(" ") ]);
};