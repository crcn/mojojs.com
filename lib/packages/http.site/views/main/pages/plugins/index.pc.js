module.exports = function(fragment, block, element, text, parse, modifiers) {
    return fragment([ element("div", {
        "class": [ "row" ]
    }, [ text(" "), element("div", {
        "class": [ "col-md-12" ]
    }, [ text(" "), element("h1", {}, [ text(" Mojo.js Plugins ") ]), text(" "), element("p", {}, [ text('This plugin list is automatically generated from the NPM repository. Make sure to include "mojo-plugin" if you want your module to show up here. ') ]), text(" ") ]), text(" ") ]), text(" "), element("div", {
        id: [ "plugins" ]
    }), text(" "), element("script", {
        type: [ "text/javascript" ],
        src: [ "/js/plugins.bundle.js" ]
    }), text("  ") ]);
};