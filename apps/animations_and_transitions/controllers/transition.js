AnimationsAndTransitions.transitionController = SC.Object.create({
	viewsAreVisible: YES,

	viewsAreFullyShown: false,
	hideTransition: SC.View.FADE_OUT,
	hideTransitionHasDirection: function () {
	    var hideTransition = this.get('hideTransition');

	    switch (hideTransition) {
	    case SC.View.FADE_OUT:
	    case SC.View.SCALE_OUT:
	    case SC.View.POP_OUT:
	      return false;
	    default:
	      return true;
	    }
	}.property('hideTransition').cacheable(),
	hideTransitionDirection: 'left',

	showTransition: SC.View.FADE_IN,
	showTransitionOptions: function () {
    	return { direction: this.get('showTransitionDirection') };
  	}.property('showTransitionDirection').cacheable(),
  	showTransitionHasDirection: function () {
	    var showTransition = this.get('showTransition');

	    switch (showTransition) {
	    case SC.View.FADE_IN:
	    case SC.View.SCALE_IN:
	    case SC.View.POP_IN:
	      	return false;
	    default:
	      	return true;
	    }
  	}.property('showTransition').cacheable(),
  	showTransitionDirection: 'right',

  	runHideShow: function () {
	    // Hide the views.
	    this.set('viewsAreVisible', false);
	    this.set('viewsAreFullyShown', false);
	}
})