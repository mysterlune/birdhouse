Sandbox.BustedObserverPaths = {
    
    eachObserver: function() {
        if(this.hasOwnProperty('logMessage')) {
            this.logMessage('Wait! the @each observer "eachObserver" is firing in Sandbox.BustedObserverPaths; please promote.');
        } else {
            console.log('Wait! the @each observer "eachObserver" is firing in Sandbox.BustedObserverPaths; please promote.')
        }
    }.observes('@each.isCompleted'),
    
    dotEachObserver: function() {
        if(this.hasOwnProperty('logMessage')) {
            this.logMessage('Wait! the dot-@each observer "dotEachObserver" is firing in Sandbox.BustedObserverPaths; please promote.');
        } else {
            console.log('Wait! the dot-@each observer "dotEachObserver" is firing in Sandbox.BustedObserverPaths; please promote.')
        }
    }.observes('.@each.isCompleted')
    
};