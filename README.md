# Arrgh.js - Painless dynamic function arguments
[![npm version](http://img.shields.io/npm/v/arrgh.js.svg)](https://npmjs.org/package/arrgh.js) [![build status](http://img.shields.io/travis/gionkunz/arrgh.js.svg)](https://travis-ci.org/gionkunz/arrgh.js)

## Do you know that pain?

Dynamic typing in JavaScript is great and the flexibility it provides to create API's is fantastic. However, without 
named parameters in ES5, and the rigid way JavaScript handles function arguments, it introduces a lot of code smell.

Look at this simple example:

```javascript
function addDataAttribute(nodeList, attributeName, value) {
  // Type check on our dynamic argument... let's face it... ugly as hell
  if(typeof nodeList !== 'string' || 
      !Array.isArray(nodeList) || 
      !nodeList instanceof NodeList) {
    throw new Error('Invalid arguments!');
  }

  // Assuming nodeList is a query
  if(typeof nodeList === 'string') {
     nodeList = document.querySelectorAll(nodeList);
     // Query selectorAll with a parameter called nodeList? 
     // Hmmm... anyway let's continue
  }
  
  if(!Array.isArray(nodeList)) {
    // Trying to cast original node list or node list obtained from 
    // document (Arrgh! This is getting weird already) to array
    nodeList = Array.prototype.slice.call(nodeList);
  }
  
  // Okay let's not make it any more complicated...
  nodeList.forEach(function assignAttribute(node) {
    node.setAttribute('data-' + attributeName, value);
  });
}
```

Okay, we made the user of our function quite happy. He can pass a list of DOM nodes (node list or array) or a 
query string that will be used to query the document for DOM nodes matching the selector query. That's really the joy 
of dynamic typing in JavaScript. But look at the smelly code we've created to make this possible?

- Type checking is nasty and usually handled with a bit condition and some exception being thrown
- Arguments need to be converted and normalized depending on their type
- The original name of the arguments have nothing to do with your code which is super confusing and a maintenance brain fuck
- ES5 has no option for named arguments which would make things a lot easier
- The way to handle variable argument lists in ES5 is simply ridiculous

## Let's talk about Arrghuments!

coming soon...
