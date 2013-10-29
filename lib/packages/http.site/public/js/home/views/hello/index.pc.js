module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {}, [ text(" What's your name? "), element("input", {
        style: [ "width:200px; display:inline;" ],
        autocomplete: [ "off" ],
        "class": [ "form-control" ],
        type: [ "text" ],
        name: [ "name" ],
        "data-bind": [ {
            model: {
                fn: function() {
                    return this.ref("this").value();
                },
                refs: [ "this" ]
            }
        } ]
    }), text(" "), block({
        "if": {
            fn: function() {
                return this.ref("name").value();
            },
            refs: [ "name" ]
        }
    }, function(fragment, block, element, text, parse, modifiers) {
        return fragment([ text(" "), element("h3", {}, [ text("Hello "), block({
            fn: function() {
                return this.ref("name").value();
            },
            refs: [ "name" ]
        }), text("!") ]), text(" ") ]);
    }), text(" ") ]), text(" ") ]);
};