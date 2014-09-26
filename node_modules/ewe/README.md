## ewe.js (yo͞o)


a/b testing for the front-end


## Example

```javascript


var ewe = require("ewe");


//pick the ab test service
ewe.use({
  optimizely: {
    //credentials
  }
});




//create a new AB test case
launchpadTest = ewe.group(accountId).
  test("launchpad").
  control("show hud", showHudV1).
  variant("show hud 2", showHudV2).
  variant("show hud 3", { weight: 3}, showHudV3);


variation = launchpadTest.start().call();


function showHudV1() {
  launchpadTest.complete();
  console.log("ab test 1");
}

function showHudV2() {
  launchpadTest.complete();
  console.log("ab test 2");
}

function showHudV3() {
  
}

```



## API

### .use(options)

service to use

### group .group(uniqueId)


#### test group.test(name) 

creates a new test case, or returns a given test if it's registered.

- `name` - name of the st

#### test.control(name, value)

the control test

#### test.variant(name [, options], value)

the test variation

- `options` - (optional) the options for the variant
  - `weight` - weight of the variation



#### value test.select([variationName])

selects a variation, and returns the given value.

#### value test.control()

returns the control test

`variationName` - (optional) the variation to select

### test.start

called after the test has failed

### test.complete(error, success)

called after error / success






