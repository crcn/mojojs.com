module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-12 text-center" ]
    }, [ text(" "), element("div", {
        "class": [ "center" ]
    }, [ text(" "), element("img", {
        src: [ "/img/mojo-js.png" ]
    }), text(" ") ]), text(" "), element("div", {
        "class": [ "center" ]
    }, [ text(" "), element("h1", {}, [ text("Caption here") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "center" ]
    }, [ text(" "), element("a", {
        href: [ {
            fn: function() {
                return this.ref("downloadLink").value();
            },
            refs: [ "downloadLink" ]
        } ],
        "class": [ "btn btn-default" ]
    }, [ text("Download Starter Kit") ]), text(" ") ]), text(" ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" "), element("h3", {}, [ text("Mojo phases out the old") ]), text(" "), element("p", {}, [ text(" Mojo was built to allow you to build on top of your existing code base, so you don’t have to do a risky, and expensive re-write of your application. ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" "), element("h3", {}, [ text("Mojo is modular") ]), text(" "), element("p", {}, [ text(" Don’t want to use the router? Want to use your own template engine? No problem! Mojo allows you to choose what libraries you like most. Truly make it into the framework you want it to be. ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" "), element("h3", {}, [ text("JavaScript all the way down") ]), text(" "), element("p", {}, [ text(" Mojo.js was built to solve the shortcommings of DOM manipulation in browsers, especially in older browsers. Mojo.js applications are entirely javascript. This includes templates, which are translated into javascript before actually being used. ") ]), text(" ") ]), text(" ") ]), text(" "), element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-4" ]
    }, [ text(" "), element("h3", {}, [ text("Broad platform support, IE too!") ]), text(" "), element("p", {}, [ text(" Mojo.js was built to support all JavaScript platforms including IE 7+, and node.js. No need to modify your style to support a specific runtime. Write your application one way, and mojo will handle the rest. ") ]), text(" ") ]), text(" ") ]) ]);
};