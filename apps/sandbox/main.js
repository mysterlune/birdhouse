// ==========================================================================
// Project:   Sandbox
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals Sandbox */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
sc_require('statechart');
Sandbox.main = function main() {
  var statechart = Sandbox.statechart;

  SC.RootResponder.responder.set('defaultResponder', statechart);
  statechart.initStatechart();
  
  Sandbox.logController.set('content', []);
  
};


function main() { Sandbox.main(); }
