AnimationsAndTransitions.AnimateExampleView = SC.View.extend({
	classNames: ['animate-example'],

	childViews: ['startAnimationBtn','animateMeView'],

	startAnimationBtn: SC.ButtonView.design({
		layout: { left: 3, top: 3, height: 24, width: 194},
		title: 'push it to the limit!',
		viewToAnimateBinding: SC.Binding.oneWay(".parentView.animateMeView"),
		action: function() {
			console.log('animate!');
			var view = this.get('viewToAnimate');

			view.animate(
				{width: 400, height: 100}, // properties
				{duration: 0.75, timing: 'ease-out', delay: 0.5} // options such as timing
			);
		}
	}),

	animateMeView: SC.View.design({
		layout: {top: 30, width: 200, height: 200},
		classNames: ['animate-view']
	})
})