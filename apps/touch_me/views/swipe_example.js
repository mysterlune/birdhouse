TouchMe.SwipeExampleView = SC.View.extend(SC.Gesturable, {
	gestures: ['mySwipeGesture'],
	childViews: ['upArrow', 'downArrow'],

	upArrow: SC.View.design({
		classNames: ['up-swipe']
	}),

	downArrow: SC.View.design({
		classNames: ['down-swipe']
	}),

	// specifying as a string allows you to configure it:
	mySwipeGesture: SC.SwipeGesture.extend({
		direction: SC.SWIPE_VERTICAL,
		startDistance: 3,
		swipeDistance: 20
	}),

	// handle the swipe action
	swipe: function(touch, direction) {
		TouchMe.mainPage.mainPane.displayView.statusView.set('value',"Swiped! In direction: " + direction.toString());
	},

	swipeStart: function(touch, direction, delta) {
		TouchMe.mainPage.mainPane.displayView.statusView.set('value',"Swipe started in direction: " + direction.toString() + "; dist: " + delta);
		if(delta == "UP") {
			this.get('upArrow').animate({opacity:1},{ duration: 0.1 });
		}
		else {
			this.get('downArrow').animate({opacity:1},{ duration: 0.1 });
		}
	},

	swipeChanged: function(touch, direction, delta) {
		TouchMe.mainPage.mainPane.displayView.statusView.set('value',"Swipe continued in direction: " + direction.toString() + "; dist: " + delta);
		if(delta == "DOWN") {
			this.get('upArrow').animate({opacity:0},{ duration: 0.1 });
			this.get('downArrow').animate({opacity:1},{ duration: 0.1 });
		}
		else {
			this.get('downArrow').animate({opacity:0},{ duration: 0.1 });
			this.get('upArrow').animate({opacity:1},{ duration: 0.1 });
		}
	},

	swipeEnd: function(touch, direction, delta) {
		TouchMe.mainPage.mainPane.displayView.statusView.set('value',"Swiped! In direction: " + direction.toString());
		if(delta == "UP") {
			this.get('upArrow').animate({opacity:0},{ duration: 0.1 });
		}
		else {
			this.get('downArrow').animate({opacity:0},{ duration: 0.1 });
		}
	}

});