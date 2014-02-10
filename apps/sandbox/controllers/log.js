sc_require('core');

Sandbox.logController = SC.ArrayController.create({

    addMessage: function(message, level) {
        message = message || 'No message supplied...';
        level = level || 'debug';
        var messageObject = SC.Object.create({ message: level + ': ' + message, level: level });
        this.pushObject(messageObject);
    },
    
    reset: function() {
        this.beginPropertyChanges();
        this.removeAt(0, this.get('length'));
        this.endPropertyChanges();
    }

});