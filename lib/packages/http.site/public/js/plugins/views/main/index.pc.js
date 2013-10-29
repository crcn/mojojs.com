module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {
        "class": [ "row" ],
        style: [ "padding-top: 30px;" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" "), element("form", {
        "data-bind": [ {
            onSubmit: {
                fn: function() {
                    return this.call("search", [ this.ref("keyword").value() ]).value();
                },
                refs: [ "search", "keyword" ]
            }
        } ]
    }, [ text(" "), element("input", {
        type: [ "text" ],
        "class": [ "form-control" ],
        name: [ "keyword" ],
        style: [ "margin-top:20px; margin-bottom: 20px;" ],
        placeholder: [ "Search in ", {
            fn: function() {
                return this.ref("stats.total").value();
            },
            refs: [ "stats.total" ]
        }, " plugins..." ],
        "data-bind": [ {
            model: {
                fn: function() {
                    return this.ref("this").value();
                },
                refs: [ "this" ]
            }
        } ]
    }), text(" ") ]), text(" ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-12" ]
    }, [ text(" "), element("table", {
        "class": [ "table table-condensed" ]
    }, [ text(" "), element("thead", {}, [ text(" "), element("tr", {}, [ text(" "), element("th", {}, [ text("Name") ]), text(" "), element("th", {}, [ text("Description") ]), text(" "), element("th", {}, [ text("Owner") ]), text(" "), element("th", {}, [ text("Created") ]), text(" "), element("th", {}, [ text("Updated") ]), text(" "), element("th", {}, [ text("Forks") ]), text(" "), element("th", {}, [ text("Stars") ]), text(" ") ]), text(" ") ]), text(" ") ]), text(" ") ]), text(" ") ]) ]);
};