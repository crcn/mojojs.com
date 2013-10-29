module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ text(" "), element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "text-center" ]
    }, [ text(" "), element("h1", {}, [ text("Coming Soon!") ]), text(" "), element("img", {
        src: [ "/img/coming.png" ]
    }), text(" ") ]), text(" ") ]), text(" ") ]);
};