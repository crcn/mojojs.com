{{
  properties: {
    category: "guides"
  }
}}

It's helpful to understand some of the philosophies behind the framework at a very high level. These are abstract concepts, but will help construct a mental model of how to develop Mojo applications in a scalable, elegant way.


#### What is MV*?

MVC, MVP, HMVC, these are design patterns to help develop web, or server-side applications. Let's disect a little bit what MVC actually means in Mojo. 

The "M" in MVC represents a Model. A model can be anything that represents **data**, such as a person, message, or a collection of messages. Models might also have properties, and methods specific for the data it's representing. A good example might be `Messages.markAllRead`, `Message.markRead`, or `User.logout`. 

The "C" in MVC represents a Controller. Controllers contain logic specifc to the **view** it's representing. The controller typically displays information from a model, or many models to the view, and also relays any user interaction from the view, to the models. The controller effectively guards the model from any view-specific logic. 

The "V" in MVC represents a View (or templates). Views take information from the controller, and display it to the user. Views also take any interaction, and relay them back to the controller. 

Notice the order of these terms - MCV - this is how data flows to the user . You typically start with a model, which provides information to the controller, to the view, then finally to the user (model -> controller -> view -> user). Think of it like layers of a cake. 

#### Framework Layers

Think of mojo applications like a cake. The whole cake is the application itself, but each layer represents different, encapsulated parts of your program. The layers of your program usually consist of 
service -> models -> controller -> view, where each layer is supported by it's previous layer, but not the other way around. For example, models can only access layers that are supporting it - the service, but should *never* access information by layers it supports (views). Controllers are the same way - they can only access information from models, and views.

Layers exist to provide some level of organization for your codebase, and you don't want to mix them, but sometimes this mental model doesn't work. For instance, a login form might need to invoke an API call. In this case, we'd use an [event bus](https://github.com/mojo-js/mojo-event-bus), or [mediator](https://github.com/mojo-js/mojo-mediator) to invoke a login request.

