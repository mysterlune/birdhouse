AnimationsAndTransitions.TransitionExampleView = SC.View.extend({
    classNames: ['transition-example'],
    childViews: ['infoView', 'exampleView'],

    infoView: SC.LabelView.design({
        classNames: ['info'],
        useStaticLayout: YES,
        escapeHTML: NO,
        value: 'I\'m not going to lie. Sproutcore already have a great (if not better) example at ' + 
            '<a target="_blank" href="http://showcase.sproutcore.com/#demos/Transition%20Plugins">http://showcase.sproutcore.com/#demos/Transition%20Plugins</a> ' + 
            'which I basically copied from.'
    }),

    exampleView: SC.View.design({
        childViews: ['headerView', 'bodyView'],
        layout: {height: 400, width: 420, centerX: 0, centerY: 0},
        classNames: ['demo'],

        headerView: SC.View.design({
            classNames: ['header-view'],
            childViews: ['inTitle', 'outTitle', 'inSelect', 'outSelect', 'inDirectionSelect', 'outDirectionSelect', 'runButton'],
            layout: { borderBottom: 1, height: 150, zIndex: 2 },

            outTitle: SC.LabelView.extend({
                classNames: ['title'],
                layout: { top: 15, left: 20, height: 25, width: 170, zIndex: 1 },
                value: "Out"
            }),

            outSelect: SC.SelectView.extend({
                // Disable the button while the transitions are occurring.
                isEnabledBinding: SC.Binding.oneWay('TransitionExample.viewsAreFullyShown'),
                layout: { width: 170, height: 24, left: 20, top: 45 },
                itemTitleKey: 'title',
                itemValueKey: 'value',
                items: [
                    { title: "FadeOut", value: SC.View.FADE_OUT },
                    { title: "MoveOut", value: SC.View.SLIDE_OUT },
                    { title: "BounceOut", value: SC.View.BOUNCE_OUT },
                    { title: "SpringOut", value: SC.View.SPRING_OUT },
                    { title: "ScaleOut", value: SC.View.SCALE_OUT },
                    { title: "PopOut", value: SC.View.POP_OUT }
                ],
                valueBinding: 'AnimationsAndTransitions.transitionController.hideTransition',

                // Resize ourself when the transition has direction.
                hideTransitionHasDirectionBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.hideTransitionHasDirection'),
                hideTransitionHasDirectionDC: function () {
                    var hideTransitionHasDirection = this.get('hideTransitionHasDirection');

                    if (hideTransitionHasDirection) {
                        this.animate('width', 100, { duration: 0.4 });
                    } else {
                        this.animate('width', 170, { duration: 0.4 });
                    }
                }.observes('hideTransitionHasDirection')
            }),

            outDirectionSelect: SC.SelectView.extend({
                // Disable the button while the transitions are occurring.
                isEnabledBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.viewsAreFullyShown'),
                isVisible: false,
                isVisibleBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.hideTransitionHasDirection'),
                layout: { width: 65, height: 24, left: 125, top: 45, zIndex: 2 },
                itemTitleKey: 'title',
                itemValueKey: 'value',
                items: [
                    { title: "Left", value: 'left' },
                    { title: "Right", value: 'right' },
                    { title: "Up", value: 'up' },
                    { title: "Down", value: 'down' }
                ],
                valueBinding: 'AnimationsAndTransitions.transitionController.hideTransitionDirection',

                // Automatic transitions.
                transitionShow: SC.View.FADE_IN,
                transitionShowOptions: { delay: 0.2 },
                transitionHide: SC.View.FADE_OUT,
                transitionHideOptions: { duration: 0.2 }
            }),

            inTitle: SC.LabelView.extend({
                classNames: ['title'],
                layout: { top: 15, right: 20, height: 25, width: 170, zIndex: 1 },
                value: "In"
            }),

            inSelect: SC.SelectView.extend({
                // Disable the button while the transitions are occurring.
                isEnabledBinding: SC.Binding.oneWay('LivelyView.viewsAreFullyShown'),
                layout: { width: 170, height: 24, left: 230, top: 45 },
                itemTitleKey: 'title',
                itemValueKey: 'value',
                items: [
                    { title: "FadeIn", value: SC.View.FADE_IN },
                    { title: "MoveIn", value: SC.View.SLIDE_IN },
                    { title: "BounceIn", value: SC.View.BOUNCE_IN },
                    { title: "SpringIn", value: SC.View.SPRING_IN },
                    { title: "ScaleIn", value: SC.View.SCALE_IN },
                    { title: "PopIn", value: SC.View.POP_IN }
                ],
                valueBinding: 'AnimationsAndTransitions.transitionController.showTransition',

                // Resize ourself when the transition has direction.
                showTransitionHasDirectionBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.showTransitionHasDirection'),
                showTransitionHasDirectionDC: function () {
                    var showTransitionHasDirection = this.get('showTransitionHasDirection');

                    if (showTransitionHasDirection) {
                        this.animate('width', 100, { duration: 0.4 });
                    } else {
                        this.animate('width', 170, { duration: 0.4 });
                    }
                }.observes('showTransitionHasDirection')
            }),

            inDirectionSelect: SC.SelectView.extend({
                // Disable the button while the transitions are occurring.
                isEnabledBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.viewsAreFullyShown'),
                isVisible: false,
                isVisibleBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.showTransitionHasDirection'),
                layout: { width: 65, height: 24, right: 20, top: 45, zIndex: 2 },
                itemTitleKey: 'title',
                itemValueKey: 'value',
                items: [
                    { title: "Left", value: 'left' },
                    { title: "Right", value: 'right' },
                    { title: "Up", value: 'up' },
                    { title: "Down", value: 'down' }
                ],
                valueBinding: 'AnimationsAndTransitions.transitionController.showTransitionDirection',

                // Automatic transitions.
                transitionShow: SC.View.FADE_IN,
                transitionShowOptions: { delay: 0.2 },
                transitionHide: SC.View.FADE_OUT,
                transitionHideOptions: { duration: 0.2 }
            }),

            runButton: SC.ButtonView.extend({
                action: 'runHideShow',
                classNames: ['run-button'],
                // Disable the button while the transitions are occurring.
                isEnabledBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.viewsAreFullyShown'),
                layout: { bottom: 15, centerX: 0, width: 130, height: 44 },
                controlSize: SC.JUMBO_CONTROL_SIZE,
                target: AnimationsAndTransitions.transitionController,
                title: "Go"
            })
        }),

        bodyView: SC.View.design({
            layout: {top: 150},
            childViews: ['transitionMe'],

            transitionMe: SC.LabelView.extend({
                classNames: ['sample-view'],
                layout: { border: 2, centerX: 0, top: 25, width: 350, height: 100 },
                isVisibleBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.viewsAreVisible'),
                wantsAcceleratedLayer: true,
                value: "Hi There!",

                // Automatic transitions.
                transitionIn: SC.View.SLIDE_IN,
                transitionInOptions: { delay: 0.35 },

                transitionOut: SC.View.SLIDE_OUT,
                transitionOutOptions: { delay: 0.6, direction: 'left', duration: 1 },

                transitionShowBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.showTransition'),
                transitionShowOptionsBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.showTransitionOptions'),

                transitionHideBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.hideTransition'),
                transitionHideOptionsBinding: SC.Binding.oneWay('AnimationsAndTransitions.transitionController.hideTransitionOptions'),


                didHideInDocument: function () {
                    // Show the views again now that the last view is hidden.
                    AnimationsAndTransitions.transitionController.set('viewsAreVisible', true);
                },

                didShowInDocument: function () {
                    // Indicate that the views are all fully shown.
                    AnimationsAndTransitions.transitionController.set('viewsAreFullyShown', true);
                },
            })
        })
    })
})