Sandbox.SHOWING_APP = SC.State.design({
  enterState: function() {
    Sandbox.mainPage.get('mainPane').append();
    Sandbox.mainPage.get('field').becomeFirstResponder();
  },

  exitState: function() {
  },

  addTodo: function (view) {
    var todo = (view.get('value') || '').trim();
    if (todo !== '') {
      Sandbox.store.createRecord(Sandbox.Todo, {
        title: todo,
        timestamp: SC.DateTime.create()
      });
      view.set('value', '');
    }
  },

  clearCompletedTodos: function() {
    this.gotoState('SHOWING_DESTROY_CONFIRMATION');
  },
  
  clearLoggerData: function() {
    this.gotoState('SHOWING_LOG_RESET_CONFIRMATION');
  }
  
});