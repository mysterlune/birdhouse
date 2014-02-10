Sandbox.AutoScrollView = SC.ScrollView.extend({
    
    autoScrollTriggerBindingDefault: SC.Binding.oneWay(),     // bind this to anything that changesto have it scroll to bottom on change 
    
    autoScroll: function() { 
        var self = this;
        function scrollToMax() { 
            var maxY = self.get('maximumVerticalScrollOffset'); 
            self.set('verticalScrollOffset', maxY) ; 
        } 
        self.invokeLast(function() { self.invokeLast(scrollToMax); }); 
    }.observes('autoScrollTrigger')
    
});