AnimationsAndTransitions.AnimateCancelExampleView = SC.View.extend({
	classNames: ['animate-example'],

	childViews: ['startAnimationBtn','stopAnimationBtn','animateMeView'],

	startAnimationBtn: SC.ButtonView.design({
		layout: { left: 3, top: 3, height: 24, width: 194},
		title: 'punch it chewie!',
		viewToAnimateBinding: SC.Binding.oneWay(".parentView.animateMeView"),
		action: function() {
			console.log('animate!');
			var view = this.get('viewToAnimate');

			view.animate(
				{width: 400, height: 100}, // properties
				{duration: 0.75, timing: 'ease-out', delay: 0.5}, // options such as timing
				function(animationResult) {
					if(!animationResult.isCancelled) {
						this.animate(
							{width: 200, height: 200}, // properties
							{duration: 0.75, timing: 'ease-out', delay: 0} // options such as timing
						);
					}
					else {
						console.log("Animation STAHPED!");
					}
				}
			);
		}
	}),

	stopAnimationBtn: SC.ButtonView.design({
		layout: { left: 203, top: 3, height: 24, width: 194},
		title: 'STAHP!!',
		viewToAnimateBinding: SC.Binding.oneWay(".parentView.animateMeView"),
		action: function() {
			var view = this.get('viewToAnimate');
			/* 
			 * If no layoutState is given or if SC.LayoutState.END is given, the view will be adjusted to its final layout. 
			 * If SC.LayoutState.START is given, the view will be adjusted back to its initial layout and if SC.LayoutState.CURRENT 
			 * is given, the view will stop at its current layout value, which will be some transient value between the start 
			 * and end values.
			 */
			view.cancelAnimation(SC.LayoutState.CURRENT);
		}
	}),

	animateMeView: SC.View.design({
		layout: {top: 30, width: 200, height: 200},
		classNames: ['animate-view']
	})
})