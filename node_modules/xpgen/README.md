XPath generation library

## Motification

To be used with selenium tests

### Examples

```javascript
var xpgen = require("xpgen")();

// //*[@id='container']
var path;

path = xpgen.find().eq("@id","container").toString(); 

// //div[@id='container']//*[contains(@class, 'row')]
path = xpgen.find("div").eq("@id","container").find().contains("@class", "row").toString();

// //*[contains(text(), "hello")] 
path = xpath.find().contains("text()","hello").toString(); 

// //a[href='http://classdojo.com']/img[0]
path = xpath.find("a").eq("href", "http://classdojo.com").element("img").toString(); 
```

## API

### Chain .find(nodeName = "*")

Starts a chain with the given node name


### Chain .path(name)

Returns a registered chain

```javascript
// //*
console.log(xpgen.find().toString()); 

// //div
console.log(xpgen.find("div").toString()); 
```

### Chain .element(nodeName = "*)


## Chain API

### .index(value)

Sets the index for the element to search. 

```javascript
// div[5]
xpgen.element("div", 5); 

// div[5] 
xpgen.element("div").index(5); 
```

### .contains(attribute, value)

```javascript
// div[contains(text(), "tacos")]
xpgen.element("div").contains('text()', "tacos") 
```

### .eq(attribute, value)

```javascript
// div[@data-age='50']
xpgen.element("div").eq("@data-age", 50); 
```

### .neq(attribute, value)

**not equal** search:

```javascript
// div[@data-age!='50']
xpgen.element("div").eq("@data-age", 50); 
```

### .gt(attribute, value)

```javascript
// div[@data-age>'50']
xpgen.element("div").gt("@data-age", 50); 
```

### .lt(attribute, value)

```javascript
// div[@data-age<'50']
xpgen.element("div").gt("@data-age", 50); 
```

### .gte(attribute, value)

```javascript
// div[@data-age>='50']
xpgen.element("div").gt("@data-age", 50); 
```

### .lte(attribute, value)

```javascript
// div[@data-age<='50']
xpgen.element("div").gt("@data-age", 50); 
```

### .or()


```javascript
// div[@data-age='50' or @data-age='60']
xpgen.element("div").eq("@data-age", 50).or().eq("@data-age", "60"); 
```

### .and()

```javascript
// a[contains(@class, 'account') and href='http://site.com/account']
xpgen.element("a").contains("class", "account").and().eq("href", "http://site.com/account"); 
```

### .register(name)

registers the chain so it can be re-used

```javascript

// //div[contains(@class, 'container')]
xpgen.find("div").contains("@class", "container").register("#container")

// //div[contains(@class, 'container')]//*[contains(@data-name, 'craig')]
xpgen.chain("#container").find().contains("@data-name", "craig")
```


## AttrChain API

### .contains(value)

```javascript
xpgen.element("div").attr("href").eq("http://classdojo.com")
```

