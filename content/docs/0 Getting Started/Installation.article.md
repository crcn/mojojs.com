{{
  properties: {
    category: "getting started"
  }
}}


## Pre-bundled package

The **easiest** way to start playing around with MojoJS is to first download the [pre-bundled](https://github.com/mojo-js/mojo.js/archive/master.zip) version which which contains the [views](http://github.com/mojo-js/mojo-views), [models](http://github.com/mojo-js/mojo-models), [template engine](http://github.com/mojo-js/mojo-paperclip), and [HTTP router](http://github.com/mojo-js/mojo-router) plugins.

Once you've downloaded the pre-bundled version, head over to the `/examples` directory and open any-one of them in your browser to start
tinkering around.


## Starter Kit

The **best** way to start using MojoJS is to download the [starter kit](https://github.com/mojo-js/mojo-starter).

### Start Kit Requirements

- [NodeJS](http://nodejs.org/) - required for bundling your application into one script

### Usage

Before you start using the starter kit, you'll need to install the dependencies, first `cd` into
your starter kit directory using `terminal`, and run:

```
npm install
```

After that, you can start running the commands:

#### npm start

starts the development server on port `8080`

#### npm run build

bundles your application into one script

#### npm run hotswap

runs the [hotswap server](https://github.com/browsertap/ditto.js) on port `8090`. This script automatically reloads
your browser if any file changes locally.
