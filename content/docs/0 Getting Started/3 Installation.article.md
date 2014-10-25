{{
  properties: {
    category: "getting started"
  }
}}

## Starter Kit

<iframe class="video" src="//www.youtube.com/embed/FSq_yUbHkfQ" frameborder="0" allowfullscreen></iframe>

The **best** way to start using MojoJS is to download the [starter kit](https://github.com/mojo-js/mojo-starter). Before you
begin, **make sure you have [NodeJS](http://nodejs.org/) installed**.

Once you've downloaded the starter kit, simply double-click the `server` file to start running your  application, then open up `http://localhost:8085` in your browser.

If you're comfortable with terminal, you can also run `npm install; npm start` in the application directory. 

Below are a list of available commands you can run for the starter kit.

#### npm install

Installs all dependencies for the starter kit

#### npm start

starts the development server on port `8085`

#### npm run build

bundles your application into one script

#### npm run hotswap

runs the [hotswap server](https://github.com/browsertap/ditto.js) on port `8090`. This script automatically reloads
your browser if any file changes locally.

#### make test

Runs the unit tests

Example:

```
make test ONLY=messages REPORTER=list # run only messages tests with the list reporter
```

#### make test-watch

Runs the unit tests, and re-run them whenever a file changes


Example:

```
make test-watch ONLY=messages REPORTER=list # run only messages tests with the list reporter
```

## Pre-bundled package

The **easiest** way to start playing around with MojoJS is to first download the [pre-bundled](https://github.com/mojo-js/mojo.js/archive/master.zip) version which which contains the [views](http://github.com/mojo-js/mojo-views), [models](http://github.com/mojo-js/mojo-models), [template engine](http://github.com/mojo-js/mojo-paperclip), and [HTTP router](http://github.com/mojo-js/mojo-router) plugins.

Once you've downloaded the pre-bundled version, head over to the `/examples` directory and open any-one of them in your browser to start
tinkering around.

You can also checkout the [mojo](/docs/api/mojo) docs for additional information on how to use the pre-bundled package.


