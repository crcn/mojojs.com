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

The **best** way to start using MojoJS is to download the [starter kit](https://github.com/mojo-js/mojo-starter). Before you
begin, **make sure you have [NodeJS](http://nodejs.org/) installed**.

### Usage

You're going to need to install a few dependencies first. Open terminal and `cd` into
your starter kit directory, then run `npm install`. After that, you can go ahead and
run `npm start`, which will prompt you to open `http://localhost:8080` in your browser.

Below are a list of available commands you can run.

#### npm install

Installs all dependencies for the starter kit

#### npm start

starts the development server on port `8080`

#### npm run build

bundles your application into one script

#### npm run hotswap

runs the [hotswap server](https://github.com/browsertap/ditto.js) on port `8090`. This script automatically reloads
your browser if any file changes locally.
