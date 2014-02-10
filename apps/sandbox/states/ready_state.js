Sandbox.READY = SC.State.design({
  enterState: function() {
    if (SC.instanceOf(Sandbox.store.dataSource, SC.FixturesDataSource)) {
      Sandbox.todosController.set('content',
        Sandbox.store.find(SC.Query.local(Sandbox.Todo, { orderBy: 'timestamp DESC' })));
      Sandbox.completedTodosController.set('content',
        Sandbox.store.find(SC.Query.local(Sandbox.Todo, 'isCompleted = true')));
    } else {
      this.gotoState('LOGGING_IN');
    }
  },

  didLoad: function () {
    if (Sandbox.todosController.get('status') === SC.Record.READY_CLEAN) {
      this.gotoState('SHOWING_APP');
    }
  }.stateObserves('Sandbox.todosController.status'),

  exitState: function() {
    // Nothing to worry about here.
  }
});