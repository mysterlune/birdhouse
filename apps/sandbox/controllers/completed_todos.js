sc_require('controllers/todos');

Sandbox.completedTodosController = SC.ArrayController.create({

  totalTodosBinding: SC.Binding.oneWay('Sandbox.todosController.length'),

  areAllCompleted: function (k, v) {
    if (v !== undefined) {
      Sandbox.todosController.setEach('isCompleted', v);
    }
    return this.get('length') === this.get('totalTodos');
  }.property('length', 'totalTodos').cacheable(),
  
});