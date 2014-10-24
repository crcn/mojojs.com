{{
  properties: {
    category: "guides"
  }
}}

It's helpful to understand some of the philosophies behind Mojo at a very high level. These are abstract concepts, but will help construct a mental model of how to develop applications in a scalable, elegant way.

<!--
Keep in mind that this document is not specific to Mojo - you can use these ideas in many other UI Frameworks. These ideas however are very complimentary to Mojo, so it's much easier 
-->


#### What is MV*?

MVC, MVP, MVVM, HMVC, these are design patterns to help develop web, or server-side applications. Let's disect a little bit what MVC actually means in Mojo. 

The "M" in MVC represents a Model. A model can be anything that represents **data**, such as a person, message, or a collection of messages. Models might also have properties, and/or methods specific to the data it's representing. A good example might be `Messages.markAllRead`, `Message.markRead`, or `User.logout`. 

The "C" in MVC represents a Controller. Controllers contain logic specifc to the **view** it's representing. The controller typically (but not always) displays information from a model, or many models to the view, and also relays any user interaction from the view, to the models. The controller effectively *guards* the model, or any part of the application from view-specific logic. 

The "V" in MVC represents a View (or templates). Views take information from the controller, and display it to the user. Views also take any interaction, and relay them back to the controller. 

> In Mojo, it's possible to include the view with the controller (it's easier to implement up-front), but this practice is discouraged since it makes maintanence a bit more difficult. Designers for instance might have a harder time modifying templates if it means they have to dive into JavaScript files. 

<!-- 
More stuff here on controllers being re-usable. Combining view with controller logic makes things bigger, and possibly harder to maintain. Easier to manage when things are smaller. V+C also makes code more brittle since you're mixing view logic with controller logic - more of a blocker for designers. Engineers aren't always mindful of there code is viewed by other people - less technical. This is a human error that can be solved through a technical process (templates).

I.E: templates are more rigid, but a predictable process that makes code more maintainable, consistent, refactorable, and less intimidating. 
--> 

<!--[Checkout this Stack Overflow](http://stackoverflow.com/questions/731743/php-vs-template-engine) thread for more discussion between why not to include templates with the controller.-->

<!--
Explain why views are separate from controllers
-->

Notice the order of these terms - MCV - this is how data flows to the user . You typically start with a model which provides information to the controller, to the view, then finally to the user (model -> controller -> view -> user). Think of this like layers of your application.


#### Framework Layers

It might be easy to think of your application in layers, where each new layer is supported by the previous layer. In MVC, the layers might look something like:

service -> models -> controllers -> views -> user.

Each proceding layer can interact with the previous layer, but not vice-versa. This means that, as a rule of thumb, controllers can interact with models, and service, but models should never interact with controllers. Views can interact with controllers, but controllers shouldn't ever really interact with the views. And the obvious - users can interact with the view, but a view cannot interact with the user. 

This sort of model also comes with many other benefits. For one, it'll make your application more maintainable, and testable. Another benefit is that parts of your application will become modular. For instance, you could theoretically take out just the service, and models and re-use them for an API server. 

Thinking about applications development in layers also reduces the cognitive overhead of planning your application architecure. Layering encourages you to focus on what you need immediately, and nothing else. If you're focusing on the views, just focus on that, not their relationship between other parts of the application. This includes models, and the HTTP router. 


<!-- move to structuring your application? -->

#### Planning

<!-- ENTIRE VIDEO HERE? -->

See [structuring your application](/docs/guides/structuring-your-application) for more info.

When starting a new project, it's helpful to know the application requirements before jumping into code. This usually involves a few things:

1. What does the application look like?
2. What sort of data does the application need to represent?

The first step is probably easier to tackle since we can visually breakdown our application, and *know* exactly how, and where the views should be laid out into a heirarchial folder structure.

<!-- DIAGRAM HERE -->

For instance, when you look at a list of items in a mock-up, you can assume it's a [list view](/docs/api/viewslist). If you see a view that's clearly toggling between two states (pages), it's probably a [stack view](/docs/api/viewsviews). Everything else is just a [base view](/docs/api/viewsbase). 

<!-- FOLDER STRUCTURE HERE -->

This sort of practice is easy to pick-up between other team members, and creates a consistent way to handle how view components are created. It's also easy for non-developers to follow, especially designers looking to change some of the UI elements. Maintaining a hierarchy of views in Mojo also makes it easy to move components around within your application if you need to perform any sort of maintainence, or refactoring.

Once you have an idea of how your application should be broken apart, you can start building your views with the data it needs to represent - step two.

You typically write fixtures (fake data) along with views, so you know what properties the view needs. Fixtures allow you to construct views independently from models - great for encapsulation. Mojo easily allows you to write views with *just* fixtures, then later on, swap them out for real models - like a flip of a switch.

<!-- VIDEO HERE BUILDING APP WITH FIXTURES -->

Developing views with fixtures is also a great way of building apps indendently from any API (especially with teams of people, you can easily write front-end and backend apps in parallel with this method). Fixtures also make your views more testable, and give you an additional idea of what model relationships look like - similar to the practice of looking at your mock-ups before building your views.

<!--
add bit about evaluating fixtures to see if the relationships make sense - if not, then there's something likely wrong with the views.
-->
<!--
1. It's easy for non-developers to follow, especially designers looking to change some of the UI elements. 
2. It's easy to move components around within your application if you need to perform any sort of maintainence, or refactoring.
3. You can easily build the front-end independently from any API.
-->

<!-- show other benefits of writing with fixtures -->

<!-- SHOW FIXTURES -->

After you've created your views with fixture data, you should have a clear idea of the models your application needs. This is a pretty straight forward process. See [structuring models](/docs/guides/structuring-your-application#models) for more information.

<!-- VIDEO HERE -->

<!--

add bit regarding swapping out fixtures. 

Also information regarding knowing the relationships between different models, and using the event bus to update any relationships. This allows for sweet, sweet stuff such as offline mode, and realtime data without wondering how persisting data's going to affect other parts of the application on the backend.

Maybe, models on the front-end should mirror how the backend alters relationships. 
-->

<!--
well-written, but no place to go

> In most applications, the steps listed above (views & data) are probably the only two things you need to really focus on during most of the development process. Everything else from the HTTP router, to additional application-specific features such as offline mode, or realtime data should be added these two steps; i.e., write your views & models first.
-->

After developing your models, you can add other parts of your application, such as an [HTTP router](/docs/api/router), realtime data, offline mode, or [internationalization](/docs/extended-api/i18n). These sort of features are non-fundamental, and should always be added *after* you've figured the structure of your models & views. 



> If you're interested to see the above concepts applied in practice, checkout this demonstration of a [reader application developed](https://github.com/mojo-js/mojo-reader-example) in less than 2 hours:

> <iframe class="video" src="//www.youtube.com/embed/Qup3P7S5I0I" frameborder="0" allowfullscreen></iframe>


<!-- 

For instance

-->











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

