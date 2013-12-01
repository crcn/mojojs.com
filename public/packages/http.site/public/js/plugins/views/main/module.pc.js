module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("tr", {}, [ text(" "), element("td", {}, [ text(" "), block({
        fn: function() {
            return this.ref("model.name").value();
        },
        refs: [ "model.name" ]
    }), text(" ") ]), text(" "), element("td", {}, [ text(" "), block({
        fn: function() {
            return this.ref("model.description").value();
        },
        refs: [ "model.description" ]
    }), text(" ") ]), text(" "), element("td", {}, [ text(" "), block({
        fn: function() {
            return this.ref("model.author.name").value();
        },
        refs: [ "model.author.name" ]
    }), text(" ") ]), text(" "), element("td", {}, [ text(" "), block({
        fn: function() {
            return this.ref("model.author.forks").value() || "?";
        },
        refs: [ "model.author.forks" ]
    }), text(" ") ]), text(" "), element("td", {}, [ text(" "), block({
        fn: function() {
            return this.ref("model.author.stars").value() || "?";
        },
        refs: [ "model.author.stars" ]
    }), text(" ") ]), text(" ") ]) ]);
};