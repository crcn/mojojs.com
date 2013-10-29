module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" ") ]), text(" "), element("div", {
        "class": [ "col-md-6 text-center" ]
    }, [ text(" "), element("img", {
        src: [ "/img/mojo-js.png" ]
    }), text(" ") ]), text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" ") ]), text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" ") ]), text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" ") ]), text(" ") ]) ]);
};