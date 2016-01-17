# Simple and unobtrusive JS function overloads for optional arguments

## Motivation
There are [plenty](npmjs.com/package/fonksiyon) [of](npmjs.com/package/mutate.js) [npm](npmjs.com/package/overloadable) [modules](npmjs.com/package/overloader) [out](npmjs.com/package/overloading) [there](npmjs.com/package/overload-js) that let you do really [complex](npmjs.com/package/parametric), [typed](npmjs.com/package/polymorf) [function](npmjs.com/package/polymorphic) [overloading](npmjs.com/package/uber.js), but 90% of the time all that's needed is to create convenience methods with less parameters that 'drop' optional arguments.

For example, you might want a function with convenience overloads as follows:

```js
var connect = function(host, port, timeout, handler) { }

connect('npmjs.com', 80, 30000, callback);

connect('npmjs.com', 80, callback);

connect('npmjs.com', callback);

connect('npmjs.com');
```


Implementing the above using the existing modules requires you to define multiple function bodies and add at least half a dozen lines of dead code.

I wanted to achieve this with concise syntax and minimal fuss based purely on the *number* of arguments passed in.

## Approach

First let's deconstruct the overloading in the example above:

- 4 args: connect(**host**, *port*, *timeout*, **callback**)
- 3 args: connect(**host**, *port*, **callback**)
- 2 args: connect(**host**, **callback**)
- 1 args: connect(**host**)

You can see two clear groups of arguments here - those in italics are "dropped" before those in bold.

This can be represented by assigning a numerical priority to each parameter:

- **host**: 1
- *port*: 2
- *timeout*: 2
- **callback**: 1

## Installation

```
npm install opt-args
```

## Usage

opt-args allows you to assign a priority to each argument, controlling which arguments 
To achieve the overloading in the example above with **opt-args**, define your function as follows:

```js
var opt = require('opt-args');

var connect = opt(1,2,2,1, function(host, port, timeout, handler) { });
```

That's it! Note that only a single funciton body is needed. **opt-args** ensures that values are routed to the correct parameters.

The four numbers (1,2,2,1) assign a priority to each of the four arguments, with lower values being of higher priority.

Lower priority arguments (higher numerical value) will be "dropped" first, and the right-most of two arguments with the same priority will be dropped first.

Any number of priority groups are supported.

## License
ISC