{{
  properties: {
    category: "api"
  }
}}


Utility for compiling your mojo application into a single page application. This utility assumes that your application
is written using **CommonJS**. 

### Installation

In your application directory, run this command:

```
npm install mojo-cli --save
```

Make sure your `package.json` looks something like this:

```javascript
{

  // script for bundling the application into one file
  "scripts": {
    "build": "./node_modules/.bin/mojo . -m --output=./build/app.bundle.js"
  },
  
  // additional browser files that get compiled using browserify
  "browser": {
    "jquery": "./vendor/path/to/jquery.js"
  },
  "main": "./lib/index.js"
}
```

then run

```
npm run build
```

### Examples

- https://github.com/mojo-js/mojo-todomvc-example

## Usage

```bash
Usage: mojo [options] [command]

Commands:

  build [path]           builds a project

Options:

  -h, --help    output usage information
  -m, --minify  minify output
  -p, --port    http port
  -o, --output  output file
  -s, --serve   directory to server
```

## Examples

building a project:

```bash
mojo build ./path/to/project.js --output=./build/app.js
```

minify a project:

```bash
mojo build ./path/to/project.js --minify --output=./build/app.js
```

build a project, and serve it:

```bash
mojo build ./path/to/project.js --minify --output=./build/app.js --server=./build --port=8085
```

