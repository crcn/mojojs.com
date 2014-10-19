{{
  properties: {
    category: "guides"
  }
}}


See Also https://github.com/mojo-js/mojo-todomvc-example

#### models

[Models](/docs/api/modelsbase) consist of items, and collections, and should be structured based on their relationship to one another. Collections are also considered models since they might also contain logic specific to the items it contains. A `Messages` collection for instance might have a `markAllRead` method.

It's easier to store models & collections in the same `models/` directory without any hierarchy, since it's common for models to share relationships between each other. 

Here's an example of how you might structure your models directory:

```
application/
  index.js - The application class
  models/
    user.js - uses friends collection
    messages.js
    message.js
    tags.js
    tag.js
    room.js
    rooms.js
    friends.js - uses user model
```

#### views

Structuring your [views](/docs/api/viewsbase) is a pretty straight forward process. The easiest way to start is by separating your mock-ups into smaller components. For example:

<img src="/docs/planning.png"></img>

From there, we have a mental model of how are application should be structured. Here's what our folder structure might look like if we follow the diagram above, and build our application:

```
application/
  index.js - the application class which ties everything together
  models/ - your models
  views/ - your views
    main/
      index.js - main controller
      index.pc
      sidebar/
        index.js
        index.pc
        avatar.js
        avatar.pc
        schools.js
        schools.pc
        tips.js
        tips.pc
      classTiles/
        classTile.js
        classTile.pc
        index.js
      addClassButton.js
      addClassButton.pc
      archiveButton.js
      archiveButton.pc
```

This sort of structure is easy to follow at a top-level glance, and we can easily figure out what the purpose of each file is just by *looking* at the folder structure.

Notice the `pc` files - these are the templates that get displayed to the user. The `js` file is the view controller - it contains all the logic for the template, and handles any sort of user interaction. 

<!--
TODO - explain index.js
-->

<!--
> Keep in mind that it's totally fine to build out an application without an HTTP router - that can be added last without affecting your application structure.
-->

#### HTTP router

the [HTTP router](/docs/api/router) is a module that can be added at any time during the development process, since the HTTP router generally handles the application states at the root view. Those states get propagated, and used by `stack views` throughout the entire application. 

<!--
TODO - show how to structure this stuff
-->


#### unit tests

It's easier to keep tests alongside the file you're testing. For example:

```
application/
  index.js - The application class
  models/
    user.js - uses friends collection
    user-test.js
    messages.js
    messages-test.js
    message.js
    message-test.js
    ...
  views/
    main/
      index.js
      index-test.js
      sidebar/
        index.js
        index-test.js
    ...
```

This convention does a few things:

1. It allows you to see at a glance what files are, and aren't tested.
2. It ensures that your application is broken out into smaller units.
3. It's easier, and much faster writing unit tests.
4. It's an easy pattern to follow.
5. Doesn't break if you need to source files around.

Here's a short example of a `messages` model unit test:

```javascript
var Messages = require("./messages"),
expect       = require("expect.js");

describe(__filename + "#", function () {
  var messages;

  beforeEach(function () {
    messages = new Message({
      data: [
        { message: "Hello World", read: false },
        { message: "What's up?", read: true },
        { message: "My favorite color is blue", read: false }
      ]
    });
  });

  it("can mark all items read", function () {
    expect(messages.filter(function (message) {
      return !message.read;
    }).length).to.be(2);

    messages.markAllRead();

    expect(messages.filter(function (message) {
      return !message.read;
    }).length).to.be(0);
  });
});
```

<!--

TODO

#### components

#### tests

-->

<!--
#### models


#### HTTP Router


The HTTP router can be added at any part during 
-->




