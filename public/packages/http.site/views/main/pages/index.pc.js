module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {
        "class": [ "container" ],
        style: [ "max-width:900px; padding-bottom: 80px;" ],
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