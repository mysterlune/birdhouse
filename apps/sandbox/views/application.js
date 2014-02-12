sc_require('views/auto_scroll');
Sandbox.ApplicationView = SC.View.extend({

    childViews: ['header', 'newTodoField', 'todosList', 'footer', 'propertyPathObserverView', 'logView', 'logFooter'],
    defaultResponder: "Sandbox.statechart", 

    header: SC.ToolbarView.design({
        layout: { left: 0, width: 500, top: 0, height: 36 },

        childViews: ['title', 'completeAll'],

        completeAll: SC.CheckboxView.design(SC.AutoResize, {
            autoResizePadding: { width: 47 },
            title: 'Mark all as done',
            valueBinding: 'Sandbox.completedTodosController.areAllCompleted'
        }),
        
        title: SC.LabelView.design({
            layout: { left: 0, right: 0, top: 0, bottom: 0 },

            totalTodosBinding: SC.Binding.oneWay('Sandbox.todosController.length'),
            completedTodosBinding: SC.Binding.oneWay('Sandbox.completedTodosController.length'),

            value: function () {
                return 'Todos (' + (this.get('totalTodos') - this.get('completedTodos')) + ')';
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
    
    propertyPathObserverView: SC.View.design({
        layout: { left: 502, width: 500, top: 0 },
        childViews: [
            'eachPathBasedPropertyLabel',
            'dotEachPathBasedPropertyLabel',
            'starEachPathBasedPropertyLabel',
            'contentDotEachPathBasedPropertyLabel',
            'contentStarEachPathBasedPropertyLabel'
        ],
        
        eachPathBasedPropertyLabel: SC.LabelView.design({
            layout: { left: 5, right: 0, top: 5, bottom: 0 },
            toolTip: 'Observer path: @each.isSelected',
            numberBinding: SC.Binding.oneWay('Sandbox.todosController.eachPathBasedProperty'),
            value: function () {
                return '@each.isSelected fired (' + this.get('number') + ') times';
            }.property('number').cacheable()
        }),
        
        dotEachPathBasedPropertyLabel: SC.LabelView.design({
            layout: { left: 5, right: 0, top: 25, bottom: 0 },
            toolTip: 'Observer path: .@each.isSelected; see notes in controller code',
            value: '.@each.isSelected errors when used in property observer chain'
        }),
                
        starEachPathBasedPropertyLabel: SC.LabelView.design({
            layout: { left: 5, right: 0, top: 45, bottom: 0 },
            toolTip: 'Observer path: *@each.isSelected; see notes in controller code',
            value: '*@each.isSelected causes errors when used in property observer chain'
        }),
                        
        contentDotEachPathBasedPropertyLabel: SC.LabelView.design({
            layout: { left: 5, right: 0, top: 65, bottom: 0 },
            toolTip: 'Observer path: content.@each.isSelected; see notes in controller code',
            value: 'content.@each.isSelected causes errors when used in property observer chain'
        }),

        contentStarEachPathBasedPropertyLabel: SC.LabelView.design({
            layout: { left: 5, right: 0, top: 85, bottom: 0 },
            toolTip: 'Observer path: content*@each.isSelected; see notes in controller code',
            value: 'content*@each.isSelected causes errors when used in property observer chain'
        }),
    }),
    
    logView: Sandbox.AutoScrollView.design({
        layout: { left: 502, width: 500, top: 105, bottom: 36 },
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