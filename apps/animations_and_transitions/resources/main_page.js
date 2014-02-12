// ==========================================================================
// Project:   AnimationsAndTransitions - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals AnimationsAndTransitions */

// This page describes the main user interface for your application.
AnimationsAndTransitions.mainPage = SC.Page.design({

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
    mainPane: SC.MainPane.design({
        childViews: ['navView', 'displayView'],
        layout: {minHeight: 0, minWidth: 0},

        navView: SC.ScrollView.design({
            layout: {left:0, top:0, bottom:0, width:0.2},
            classNames: ['nav-menu'],
            
            canScrollVertical:true,
            hasHorizontalScroller:false,

            contentView: SC.CollectionView.design({
                childViewLayout: SC.View.VERTICAL_STACK,
                actOnSelect: YES,

                content: new Array(
                    {
                        value: "overview",
                        viewToView: null
                    },
                    {
                        value: "animate example",
                        viewToView: 'animateExample'
                    },
                    {
                        value: "animate callback example",
                        viewToView: 'animateCallbackExample'
                    },
                    {
                        value: "animate cancel example",
                        viewToView: 'animateCancelExample'
                    },
                    {
                        value: "transition example",
                        viewToView: 'transitionExample'
                    }
                ),

                layoutForContentIndex: function(contentIndex) {
                    return {height:30};// height of each item
                },

                exampleView: SC.LabelView.design({
                    classNames: ['menu-item'],

                    value: function() {
                        var content = this.get('content');
                        if(content) {
                            return content.value;
                        }
                    }.property(),

                    action: function() {
                        var content = this.get('content');
                        var view = content.viewToView;
                        AnimationsAndTransitions.activeViewController.set('currentlyVisible',view);
                    }
                })
            })
        }),

        displayView: SC.View.design({
            layout: { left: 0.2 },
            childViews: ['overviewView', 'animateExample', 'animateCallbackExample','animateCancelExample','transitionExample'],

            overviewView: SC.View.design({

                layout: {top: 10, left: 10, right: 10},

                render: function(context, firstTime) {
                    context.push("<p>The menu on the left navigates to different animation and transition examples. Each example has an overview of what the flips going on.</p>");
                },

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === null ? YES : NO );
                }).from("AnimationsAndTransitions.activeViewController.currentlyVisible")
            }),

            animateExample: AnimationsAndTransitions.AnimateExampleView.design({
                layout: {width: 400, height: 300, centerX: 0, centerY: 0},

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'animateExample' ? YES : NO );
                }).from("AnimationsAndTransitions.activeViewController.currentlyVisible")
            }),

            animateCallbackExample: AnimationsAndTransitions.AnimateCallbackExampleView.design({
                layout: {width: 400, height: 300, centerX: 0, centerY: 0},

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'animateCallbackExample' ? YES : NO );
                }).from("AnimationsAndTransitions.activeViewController.currentlyVisible")
            }),

            animateCancelExample: AnimationsAndTransitions.AnimateCancelExampleView.design({
                layout: {width: 400, height: 300, centerX: 0, centerY: 0},

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'animateCancelExample' ? YES : NO );
                }).from("AnimationsAndTransitions.activeViewController.currentlyVisible")
            }),

            transitionExample: AnimationsAndTransitions.TransitionExampleView.design({
                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'transitionExample' ? YES : NO );
                }).from("AnimationsAndTransitions.activeViewController.currentlyVisible")
            })
        })
    })

});
