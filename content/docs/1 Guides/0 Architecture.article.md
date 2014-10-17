{{
  properties: {
    category: "guides"
  }
}}

It's helpful to understand some of the philosophies behind the framework at a very high level. These are abstract concepts, but will help construct a mental model of how to develop Mojo applications in a scalable, elegant way.


#### What is MV*?

MVC, MVP, HMVC, these are design patterns to help develop web, or server-side applications. Let's disect a little bit what MVC actually means in Mojo. 

The "M" in MVC represents a Model. A model can be anything that represents **data**, such as a person, message, or a collection of messages. Models might also have properties, and methods specific for the data it's representing. A good example might be `Messages.markAllRead`, `Message.markRead`, or `User.logout`. 

The "C" in MVC represents a Controller. Controllers contain logic specifc to the **view** it's representing. The controller typically displays information from a model, or many models to the view, and also relays any user interaction from the view, to the models. The controller effectively guards the model, or any part of the application from view-specific logic. 

The "V" in MVC represents a View (or templates). Views take information from the controller, and display it to the user. Views also take any interaction, and relay them back to the controller. 

<!--
Explain why views are separate from controllers
-->

Notice the order of these terms - MCV - this is how data flows to the user . You typically start with a model, which provides information to the controller, to the view, then finally to the user (model -> controller -> view -> user). Think of this like layers of your application.


#### Framework Layers

It might be easy to think of your application in layers, where each new layer is supported by the previous layer. In MVC, the layers might look something like:

service -> models -> controllers -> views -> user.

Each proceding layer can interact with the previous layer, but not vice-versa. This means that, as a rule of thumb, controllers can interact with models, and service, but models should never interact with controllers. Views can interact with controllers, but controllers shouldn't really ever interact with the views. And the obvious - users can interact with the view, but a view cannot interact with the user. 

This sort of model also comes with many other benefits. For one, it'll make your application more maintainable, and testable. Another benefit is that parts of your application will become modular. For instance, you could theoretically take out just the service, and models and re-use them for an API server. 


<!--
#### Consistency

The modules used in mojo work together in a consistent way, and it'd be helpful to develop applications in a similar fassion for a number of reasons

-->

<!--

- encapsulation
- consistency

- intuitiveness for less error-prone code.


More on added benefits. Designers, ab testing
#### Framework Layers

Think of mojo applications like a cake. The whole cake is the application itself, but each layer represents different, encapsulated parts of your program. The layers of your program usually consist of 
service -> models -> controller -> view, where each layer is supported by it's previous layer, but not the other way around. For example, models can only access layers that are supporting it - the service, but should *never* access information by layers it supports (views). Controllers are the same way - they can only access information from models, and views.

Layers exist to provide some level of organization for your codebase, and you don't want to mix them, but sometimes this mental model doesn't work. For instance, a login form might need to invoke an API call. In this case, we'd use an [event bus](https://github.com/mojo-js/mojo-event-bus), or [mediator](https://github.com/mojo-js/mojo-mediator) to invoke a login request.
-->

