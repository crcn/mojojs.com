{{
  properties: {
    category: "getting started"
  }
}}

MojoJS is a customizable JavaScript framework inspired by Node.js and Backbone.js.
The framework is entirely modular - everything is broken out into smaller, more manageable plugins that allow you to cherry-pick exactly what features you want to use for your application.
These libraries include the application, models, views, template engine, router. Mojo plugins were designed to work well with one-another, but not depend on each other. This means that you can even use your own models, views, template engine, or router, and MojoJS will play nicely with them.

MojoJS was designed with the [Strangler Pattern](http://www.martinfowler.com/bliki/StranglerApplication.html) in mind. If you already have a pre-existing application, you can easily build Mojo on-top of it without a full, application re-write.
Meaning you can slowly ease into it without worrying about the all-or-nothing approach associated with most JavaScript frameworks. This also means that you can add Mojo to your stack, and immediately push it out to production.

Mojo's level of abstraction also makes it very easy to re-purpose the framework to do whatever you want. You can
use Mojo on the backend without the additional baggage of having other platform-specific modules, such as the HTTP router.
Another example of re-purposing Mojo is to use a different layout engine such as [famou.us](http://famo.us/).

<!--

### History

Mojo was originally developed in-house at [ClassDojo](https://www.classdojo.com/) to refactor a pre-existing codebase.
At the time, the team at ClassDojo evaluated existing frameworks which had to fit the following requirements:

1. The framework had to work well with older platforms such as IE 8+
2. The framework had to work with our existing codebase (AMD, Backbone, API)
3. The framework had to be built on-top of our existing application (strangler pattern).


<!--
### Architecture


-->
