module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {
        "class": [ "row" ],
        style: [ "padding-top: 30px;" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-4" ]
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
            },
            disable: {
                fn: function() {
                    return this.ref("loading").value();
                },
                refs: [ "loading" ]
            },
            onChange: {
                fn: function() {
                    return this.call("search", [ this.ref("keyword").value() ]).value();
                },
                refs: [ "search", "keyword" ]
            }
        } ]
    }), text(" ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "row" ],
        "data-bind": [ {
            show: {
                fn: function() {
                    return this.ref("modules.length").value();
                },
                refs: [ "modules.length" ]
            }
        } ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-12" ]
    }, [ text(" "), element("table", {
        "class": [ "table table-condensed" ]
    }, [ text(" "), element("thead", {}, [ text(" "), element("tr", {}, [ text(" "), element("th", {}, [ text("Name") ]), text(" "), element("th", {}, [ text("Description") ]), text(" "), element("th", {}, [ text("Owner") ]), text("  "), element("th", {}, [ text("Forks") ]), text(" "), element("th", {}, [ text("Stars") ]), text(" ") ]), text(" ") ]), text(" "), element("tbody", {}, [ text(" "), block({
        html: {
            fn: function() {
                return this.ref("sections.modules").value();
            },
            refs: [ "sections.modules" ]
        }
    }), text(" ") ]), text(" ") ]), text(" "), block({
        "if": {
            fn: function() {
                return this.ref("modules.pageLength").value() === 0;
            },
            refs: [ "modules.pageLength" ]
        }
    }, function(fragment, block, element, text, parse, modifiers) {
        return fragment([ text(" "), element("div", {
            "class": [ "center" ]
        }, [ text(" no more items") ]), text(" ") ]);
    }), text(" ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "center" ]
    }, [ text(" "), block({
        "if": {
            fn: function() {
                return this.ref("loading").value();
            },
            refs: [ "loading" ]
        }
    }, function(fragment, block, element, text, parse, modifiers) {
        return fragment([ text(" "), element("span", {}, [ text("Searching for "), block({
            fn: function() {
                return this.ref("keyword").value();
            },
            refs: [ "keyword" ]
        }), text("...") ]), text(" ") ]);
    }), text(" ") ]) ]);
};