{{
  properties: {
    category: "getting started"
  }
}}

MojoJS is a customizable JavaScript framework inspired by Node.js and Backbone.js. The framework is entirely modular - everything is broken out into smaller, more manageable plugins that allow you to cherry-pick exactly what features you want to use for your application. These libraries include the application, models, views, template engine, router. Mojo plugins were designed to work well with one-another, but not depend on each other. This means that you can even use your own models, views, template engine, or router, and MojoJS will play nicely with them.

MojoJS was designed with the [Strangler Pattern](http://www.martinfowler.com/bliki/StranglerApplication.html) in mind. If you already have a pre-existing application, you can easily build Mojo on-top of it without a full, application re-write.
Meaning you can slowly ease into it without worrying about the all-or-nothing approach associated with most JavaScript frameworks. This also means that you can add Mojo to your stack, and immediately push it out to production.



Mojo's level of abstraction also makes it very easy to re-purpose the framework to do whatever you want. You can
use Mojo on the backend without the additional baggage of having other platform-specific modules, such as the HTTP router.
Another example of re-purposing Mojo is to use a different layout engine such as [famou.us](http://famo.us/), or [Snap.svg](http://snapsvg.io/).
