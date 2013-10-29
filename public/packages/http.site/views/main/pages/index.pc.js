module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {
        "class": [ "container" ],
        role: [ "main" ]
    }, [ text(" "), block({
        html: {
            fn: function() {
                return this.ref("sections.pages").value();
            },
            refs: [ "sections.pages" ]
        }
    }), text(" ") ]), text(" ") ]);
};