Sandbox.SHOWING_LOG_RESET_CONFIRMATION = SC.State.design({

    enterState: function() {
        Sandbox.logController.reset();
        this.gotoState('SHOWING_APP');
    },

    exitState: function() {}

});