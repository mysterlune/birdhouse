Sandbox.mainPage = SC.Page.design({
    field: SC.outlet('mainPane.applicationView.newTodoField.field'),

    mainPane: SC.MainPane.design({
        childViews: ['applicationView'],
        defaultResponder: "Sandbox.statechart", 
        
        applicationView: Sandbox.ApplicationView.design({})

    })

});