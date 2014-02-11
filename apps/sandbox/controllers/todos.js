sc_require('core');
sc_require('controllers/log');
sc_require('mixins/busted_observer_paths');

Sandbox.todosController = SC.ArrayController.create(
    
    SC.DelegateSupport,
    Sandbox.BustedObserverPaths, {
    
    delegateBinding: 'Sandbox.logController',
    
    loggerDelegate: function() {
        var del = this.get('delegate');
        return this.delegateFor('isLoggerDelegate', del);
    }.property('delegate').cacheable(),
    
    /**
    
    ===========================
    PROPERTIES, OBSERVER CHAINS
    ===========================
    
    */
    
    /**
    
    Fires twice.  This is really the only currently safe use of @each in property path observing.
    See below for more details on the various permutations with the @each path part.
    
    @property eachPathBasedProperty
    @for Sandbox.todosController
    @type {Number}
    @default 0
    */
    _eachPathBasedPropertyNumber: 0,
    eachPathBasedProperty: function() {
        return this.incrementProperty('_eachPathBasedPropertyNumber');
    }.property('@each.isCompleted').cacheable(),
    
    // dotEachPathBasedProperty: function() {
    //  NOTE: Attempting to observe the ".@each" chain in a 
    //      property causes a bad, bad error in SC.CoreArray.removeDependentKeyWithChain
    //      when the array membership changes
    // }.property('.@each.isCompleted').cacheable(),
    // 
    // starEachPathBasedProperty: function() {
    //  NOTE: Attempting to observe the "*@each" chain in a 
    //      property causes a bad, bad error in SC.CoreArray.removeDependentKeyWithChain
    //      when the array membership changes
    // }.property('*@each.isCompleted').cacheable(),
    //
    // contentDotEachPathBasedProperty: function() {
    //  NOTE: Attempting to observe the "content.@each" chain in a 
    //      property causes a bad, bad error in SC.CoreArray.removeDependentKeyWithChain
    // }.property('content.@each.isCompleted').cacheable(),
    //
    // contentStarEachPathBasedProperty: function() {
    //  NOTE: Attempting to observe the "content*@each" chain in a 
    //      property causes a bad, bad error in SC.CoreArray.removeDependentKeyWithChain
    // }.property('content*@each.isCompleted').cacheable(),
    
    /**
    
    ===================================
    ... END PROPERTIES, OBSERVER CHAINS
    ===================================
    
    
    
    ===========================
    OBSERVERS USING PATH CHAINS
    ===========================
    
    */
    
    contentStarEachObserver: function() {
        this.invokeDelegateMethod(this.get('loggerDelegate'), 'addMessage', 'Sandbox.todosController content*@each.isCompleted');
    }.observes('content*@each.isCompleted'),
    
    starEachObserver: function() {
        this.invokeDelegateMethod(this.get('loggerDelegate'), 'addMessage', 'Sandbox.todosController *@each.isCompleted');
    }.observes('*@each.isCompleted'),
    
    contentLengthObserver: function() {
        this.invokeDelegateMethod(this.get('loggerDelegate'), 'addMessage', 'Sandbox.todosController content.length');
    }.observes('content.isCompleted'),
        
    contentArrayObserver: function() {
        this.invokeDelegateMethod(this.get('loggerDelegate'), 'addMessage', 'Sandbox.todosController content.[]');
    }.observes('content.[]')
    
    /**
    
    ===============================
    END OBSERVERS USING PATH CHAINS
    ===============================
    
    */
    
});