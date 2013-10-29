module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ parse("<!DOCTYPE html>"), text(" "), element("html", {
        lang: [ "en" ]
    }, [ text(" "), element("head", {}, [ text(" "), element("link", {
        rel: [ "stylesheet" ],
        href: [ "/vendor/bootstrap/css/bootstrap.min.css" ]
    }), text(" "), element("link", {
        rel: [ "stylesheet" ],
        href: [ "/vendor/bootstrap/js/bootstrap.min.js" ]
    }), text(" "), element("link", {
        rel: [ "stylesheet" ],
        href: [ "/vendor/js/jquery-1.10.2.js" ]
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
    }, [ text("Home") ]) ]), text(" "), element("li", {}, [ element("a", {
        href: [ "https://github.com/classdojo/mojo.js" ]
    }, [ text("Documentation") ]) ]), text(" "), element("li", {}, [ element("a", {
        href: [ "/plugins" ]
    }, [ text("Plugins") ]) ]), text(" ") ]), text(" ") ]), text(" "), block({
        html: {
            fn: function() {
                return this.ref("sections.pages").value();
            },
            refs: [ "sections.pages" ]
        }
    }), text(" ") ]), text(" ") ]), text(" ") ]);
};