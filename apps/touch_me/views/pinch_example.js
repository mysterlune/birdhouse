TouchMe.PinchExampleView = SC.View.extend(SC.Gesturable, {
	gestures: [SC.PinchGesture],

  childViews: ['ohNoesView'],

  ohNoesView: SC.LabelView.design({
    classNames: ['oh-noes'],
    layout: {top:10, left:10, right:10, bottom: 10},
    value: 'Pinch doesn\'t seem to work in sproutcore because SC.PinchGesture has not been fully implemented. Oh Noes!'
  }),

	classNames: ['pinch-view'],
	layout: {width: 300, height: 300, centerX: 0, centerY: 0},

  pinch: function(touch) {
    TouchMe.mainPage.mainPane.displayView.statusView.set('value','Pinch!');
  },

  pinchStart: function(touch) {
    TouchMe.mainPage.mainPane.displayView.statusView.set('value','pinch start');
  },

  pinchEnd: function(touch) {
    TouchMe.mainPage.mainPane.displayView.statusView.set('value','pinch end');
  }
})