sc_require('views/auto_scroll');
Sandbox.ApplicationView = SC.View.extend({

    childViews: ['header', 'newTodoField', 'todosList', 'footer', 'logView', 'logFooter'],
    defaultResponder: "Sandbox.statechart", 

    header: SC.ToolbarView.design({
        layout: { left: 0, width: 500, top: 0, height: 36 },

        childViews: ['title', 'completeAll', 'pathBasedPropertyLabel'],

        completeAll: SC.CheckboxView.design(SC.AutoResize, {
            autoResizePadding: { width: 47 },
            title: 'Mark all as done',
            valueBinding: 'Sandbox.completedTodosController.areAllCompleted'
        }),
        
        pathBasedPropertyLabel: SC.LabelView.design({
            layout: { left: 0, right: 130, top: 0, bottom: 0 },

            pathBasedPropertyNumberBinding: SC.Binding.oneWay('Sandbox.todosController.pathBasedProperty'),

            value: function () {
                return 'Path worked (' + this.get('pathBasedPropertyNumber') + ') times';
            }.property('pathBasedPropertyNumber').cacheable()
        }),
        
        title: SC.LabelView.design({
            layout: { left: 0, right: 0, top: 0, bottom: 0 },

            totalTodosBinding: SC.Binding.oneWay('Sandbox.todosController.length'),
            completedTodosBinding: SC.Binding.oneWay('Sandbox.completedTodosController.length'),

            value: function () {
                return 'Sandbox (' + (this.get('totalTodos') - this.get('completedTodos')) + ')';
            }.property('totalTodos', 'completedTodos').cacheable()
        })
    }),

    newTodoField: SC.View.design({
        classNames: ['new-todo'],
        layout: { left: 0, width: 500, top: 36, height: 36 },
        childViews: ['field', 'button'],

        field: SC.TextFieldView.design({
            hint: 'What needs to be done?'
        }),

        button: SC.ButtonView.design(SC.AutoResize, {
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, right: 12, zIndex: 100 },
            title: 'Add',
            action: 'addTodo',
            valueBinding: '.page.field.value',
            isDefaultBinding: '.page.field.focused'
        })
    }),

    todosList: SC.ScrollView.design({
        layout: { left: 0, width: 500, top: 72, bottom: 36 },        
        todosLengthBinding: 'Sandbox.todosController.length',
        logControllerBinding: SC.Binding.from('Sandbox.logController'),
        contentView: SC.ListView.design({
            contentBinding: SC.Binding.oneWay('Sandbox.todosController'),
            rowHeight: 36,
            exampleView: Sandbox.TodoItemView
        })
    }),

    footer: SC.ToolbarView.design({
        layout: { left: 0, width: 500, bottom: 0, height: 36 },

        childViews: ['clearCompletedTodos'],
        clearCompletedTodos: SC.ButtonView.design(SC.AutoResize, {
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, right: 12, zIndex: 100 },
            isEnabledBinding: SC.Binding.oneWay('Sandbox.completedTodosController.length').bool(),
            title: 'Clear completed todos',
            action: 'clearCompletedTodos'
        })
    }),
    
    logView: Sandbox.AutoScrollView.design({
        layout: { left: 502, width: 500, top: 0, bottom: 36 },
        autoScrollTriggerBinding: 'Sandbox.logController.length',
        contentView: SC.ListView.design({
            contentBinding: SC.Binding.oneWay('Sandbox.logController'),
            rowHeight: 16,
            exampleView: SC.ListItemView.design({
                classNames: ['log-item'],
                contentValueKey: 'message'
            })
        })
    }),
    
    logFooter: SC.ToolbarView.design({
        layout: { left: 502, width: 500, bottom: 0, height: 36 },

        childViews: ['clearLoggerData'],
        clearLoggerData: SC.ButtonView.design(SC.AutoResize, {
            controlSize: SC.HUGE_CONTROL_SIZE,
            layout: { centerY: 0, height: 30, right: 12, zIndex: 100 },
            isEnabledBinding: SC.Binding.oneWay('Sandbox.logController.length').bool(),
            title: 'Clear logger data',
            action: 'clearLoggerData'
        })
    }),
});