Sandbox.statechart = SC.Statechart.create({

  trace: YES,

  rootState: SC.State.design({
    initialSubstate: "READY",

    READY: SC.State.plugin('Sandbox.READY'),

    LOGGING_IN: SC.State.plugin('Sandbox.LOGGING_IN'),

    SHOWING_APP: SC.State.plugin('Sandbox.SHOWING_APP'),

    SHOWING_DESTROY_CONFIRMATION: SC.State.plugin('Sandbox.SHOWING_DESTROY_CONFIRMATION'),
    
    SHOWING_LOG_RESET_CONFIRMATION: SC.State.plugin('Sandbox.SHOWING_LOG_RESET_CONFIRMATION')
  })

});