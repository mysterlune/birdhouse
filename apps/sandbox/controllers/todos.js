sc_require('core');
sc_require('controllers/log');
sc_require('mixins/busted_observer_paths');

Sandbox.todosController = SC.ArrayController.create(
    
    Sandbox.BustedObserverPaths, {
    
    loggerBinding: 'Sandbox.logController',
    
    logMessage: function(message, level) {
        var logger = this.get('logger');
        if(logger) {
            logger.addMessage(message, level);
        } else {
            console.log(message)
        }
    },
    
    _pathBasedPropertyNumber: 0,
    
    pathBasedProperty: function() {
        return this.incrementProperty('_pathBasedPropertyNumber');
    }.property('content*@each.isCompleted').cacheable(),
    
    someFooBarChangedObserver: function() {
        this.logMessage('some FooBar changed... awesome...');
    }.observes('someFooBarChanged'),
    
    contentStarEachObserver: function() {
        this.logMessage('observer firing using `content*@each.isCompleted`...');
    }.observes('content*@each.isCompleted'),
        
    starEachObserver: function() {
        this.logMessage('observer for `*@each.isCompleted` firing...');
    }.observes('*@each.isCompleted'),
    
    contentLengthObserver: function() {
        this.logMessage('observer for `content.length` firing...');
    }.observes('content.isCompleted'),
        
    contentArrayObserver: function() {
        this.logMessage('observer for array membership firing...');
    }.observes('content.[]')
    
});