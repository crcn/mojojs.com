Built originally for [node-ectwo](https://github.com/crcn/node-ectwo)

```coffeescript


class Regions

  ###
  ###
  
  findOne: (search, next) ->
    # find a region, and return it
  

class Image
  
  ###
  ###
  
  createInstance: (options, next) ->
    # create, and return instance
    
  ###
  ###
  
  migrate: (options, next) ->
    # migrate to a new region, and return the image
    
class Instance
  
  ###
  ###
  
  stop: (next) ->
    # stop the instance
    
  ###
  ###
  
  start: (next) ->
    #start the instanc
    

```

Ironify:

```coffeescript
irons = require("irons")()
ectwo = require("ectwo")()

irons.add("instances", {
  "findOne": "instance"
}).add("instance", {
  "shutdown": {
    type: "image",
    
  },
  "createImage": "image"
}).add("image", {
  "migrate": "image",
  "createInstance": "instance"
})

irons.wrap(ectwo.instances, "instances")




# shutdown one instance, migrate it to a new region, and start it up again.
proc = ectwo.
  instances.
  findOne({ tags: { type: "mongodb" } }).
  shutdown().
  migrate({ region: ectwo.regions.findOne({ name: /us-*/}) }).
  createInstance().
  start()

```
