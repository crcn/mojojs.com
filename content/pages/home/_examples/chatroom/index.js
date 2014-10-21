var Application = require("mojo-application");

var ChatroomApplication = Application.extend({
  config: {
    pubnub: {
      subscribe_key: "sub-c-9535ac96-4823-11e4-aaa5-02ee2ddab7fe",
      publish_key: "pub-c-55ed0f2b-6b2e-455a-977e-9530bb287d2f"
    }
  },
  plugins: [
    require("mojo-views"),
    require("mojo-paperclip"),
    require("mojo-models@0.3.10"),
    require("mojo-event-bus@0.0.12"),
    require("mojo-pubnub@0.0.18"),
    require("./views"),
    require("./models")
  ]
});

var app = new ChatroomApplication();

// initialize pubnub here - important incase we wanna pass in a user ID
// later on
app.eventBus.publish("/initializePubnub", {
  channel: "chatroom"
});

// create the main view, and add the todos models
preview.element.appendChild(app.views.create("main", {
  messages: app.models.create("messages").load()
}).render());
