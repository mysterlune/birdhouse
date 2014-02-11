TouchMe.TapExampleView = SC.View.extend(SC.Gesturable, {
	gestures: ['myTapGesture'],
	childViews: ['tapImage'],

	tapImage: SC.View.design({
		classNames: ['tap-image']
	}),

	// specifying as a string allows you to configure it:
	myTapGesture: SC.TapGesture.extend({
		acceptsMultitouch: NO,
		tapDelay: 200,
		tapWiggle: 20
	}),

	// handle the tap action
	tap: function(touch) {
		TouchMe.mainPage.mainPane.displayView.statusView.set('value',"Tappidy tap");
		this.get('tapImage').animate({opacity:1},{ duration: 0 });
	},

	tapStart: function(touch) {
		TouchMe.mainPage.mainPane.displayView.statusView.set('value',"Tap start");
	},

	tapEnd: function(touch) {
		TouchMe.mainPage.mainPane.displayView.statusView.set('value',"tap end");
		this.get('tapImage').animate({opacity:0},{ duration: 0.5 });
	}

});