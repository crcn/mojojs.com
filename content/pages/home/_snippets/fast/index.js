var N = 25;

var Box = mojo.models.Base.extend({
    count: 0,
    tick: function () {
        var count = this.count + 1;
        this.setProperties({
            count: count + 1,
            top: Math.sin(count / 10) * 10,
            left: Math.cos(count / 10) * 10,
            color: count % 255,
            content: count % 100
        });
    }
});

var Boxes = mojo.models.Collection.extend({
    createModel: function (options) {
        return new Box(options, this.application);
    },
    tick: function () {
        for (var i = this.length; i--;) this.at(i).tick();
    }
});

var BoxView = mojo.views.Base.extend({
    paper: require("./box.pc")
});


var BoxesView = mojo.views.List.extend({
    modelViewClass: BoxView
});

var boxesView;


exports.initialize = function (options) {

    var _disposed;

    var boxes = new Boxes(void 0, mojo.application);
    for (var i = N; i--;) boxes.create();
    boxesView = new BoxesView({ source: boxes });

    options.element.appendChild(boxesView.render());

    function animate () {
        if (_disposed) return;
        boxesView.source.tick();
        setTimeout(animate, 1000 / 60);
    }

    animate();

    return {
        dispose: function () {
            _disposed = true;
        }
    }
}
