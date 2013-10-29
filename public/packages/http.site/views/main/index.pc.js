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
    }), text(" ") ]), text(" "), element("body", {}, [ text("  "), block({
        html: {
            fn: function() {
                return this.ref("sections.pages").value();
            },
            refs: [ "sections.pages" ]
        }
    }), text(" ") ]), text(" ") ]), text(" ") ]);
};