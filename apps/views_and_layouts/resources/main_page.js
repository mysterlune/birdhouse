// ==========================================================================
// Project:   ViewsAndLayouts - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals ViewsAndLayouts */

// This page describes the main user interface for your application.
ViewsAndLayouts.mainPage = SC.Page.design({

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
                        value: "flow view example",
                        viewToView: 'flowExampleView'
                    },
                    {
                        value: "childLayoutView property example",
                        viewToView: 'childLayoutExampleView'
                    },
                    {
                        value: "stacked view example",
                        viewToView: 'stackedViewExampleView'
                    },
                    {
                        value: "list view example",
                        viewToView: 'listViewExampleView'
                    },
                    {
                        value: "grid view example",
                        viewToView: 'gridViewExampleView'
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
                        ViewsAndLayouts.activeViewController.set('currentlyVisible',view);
                    }
                })
            })
        }),

        displayView: SC.View.design({
            layout: { left: 0.2 },
            childViews: ['overviewView', 'flowExampleView', 'childLayoutExampleView', 'stackedViewExampleView', 'listViewExampleView', 'gridViewExampleView'],

            overviewView: SC.View.design({

                layout: {top: 10, left: 10, right: 10},

                render: function(context, firstTime) {
                    context.push("<p>The menu on the left navigates to different view and layout examples. Each example has an overview of where each view is most effective.</p>");
                },

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === null ? YES : NO );
                }).from("ViewsAndLayouts.activeViewController.currentlyVisible")
            }),

            flowExampleView: SC.View.design({
                childViews: ['descriptionView', 'flowExampleView'],

                descriptionView: SC.LabelView.design({
                    layout: { top:10, left: 10, right: 10},
                    useStaticLayout: YES,
                    value: 'Flow layout is achieved by mixing in the SC.FlowedLayout object and setting widths and heights and all child layouts. child views should not have ' + 
                    'any css padding as it affects the flowspacing property (see code & comments). You can also dynamically alter widths/heights ' + 
                    'as shown in the example flow item that is sized depending on the inner text using the SC.AutoResize mixin on a child view.'
                }),

                flowExampleView: ViewsAndLayouts.flowExampleView.design({
                    isVisibleBinding: SC.Binding.transform(function (value, binding) {
                        return ( value === 'flowExampleView' ? YES : NO );
                    }).from("ViewsAndLayouts.activeViewController.currentlyVisible")
                }),

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'flowExampleView' ? YES : NO );
                }).from("ViewsAndLayouts.activeViewController.currentlyVisible")
            }),

            childLayoutExampleView: SC.View.design({
                childViews: ['descriptionView', 'childLayoutExampleView'],

                descriptionView: SC.LabelView.design({
                    layout: { top:10, left: 10, right: 10},
                    useStaticLayout: YES,
                    value: 'If you know the height/width and want to stack child views vertically/horizontally you can set childViewLayout to SC.View.VERTICAL_STACK or ' + 
                    'SC.View.HORIZONTAL_STACK and the view will resize accordingly to fit the child views. If a height/width of the container view is set the child views ' + 
                    'will continue to render in the same direction and not flow to available space'
                }),

                childLayoutExampleView: ViewsAndLayouts.chilldLayoutExampleView.design({}),

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'childLayoutExampleView' ? YES : NO );
                }).from("ViewsAndLayouts.activeViewController.currentlyVisible")
            }),

            stackedViewExampleView: SC.View.design({
                childViews: ['descriptionView', 'stackedViewExampleView'],

                descriptionView: SC.LabelView.design({
                    layout: { top:10, left: 10, right: 10},
                    useStaticLayout: YES,
                    value: 'Stacked view is great if you want to stack child views but do not know their heights for exampel they may contain html whos height can be tricky to calculate.' + 
                    'however if you do know the heights use another way of laying out the views as stacked view is only effective for low a low number of child views.'
                }),

                stackedViewExampleView: ViewsAndLayouts.stackedLayoutExampleView.design({}),

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'stackedViewExampleView' ? YES : NO );
                }).from("ViewsAndLayouts.activeViewController.currentlyVisible")
            }),

            listViewExampleView: SC.View.design({
                childViews: ['descriptionView', 'listViewExampleView'],

                descriptionView: SC.LabelView.design({
                    layout: { top:10, left: 10, right: 10},
                    useStaticLayout: YES,
                    value: 'Very efficient at long lists where we know the height of all child views are the same. Specific child view heights can be overwritten if needed.'
                }),

                listViewExampleView: ViewsAndLayouts.listViewExampleView.design({}),

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'listViewExampleView' ? YES : NO );
                }).from("ViewsAndLayouts.activeViewController.currentlyVisible")
            }),

            gridViewExampleView: SC.View.design({
                childViews: ['descriptionView', 'gridViewExampleView'],

                descriptionView: SC.LabelView.design({
                    layout: { top:10, left: 10, right: 10},
                    useStaticLayout: YES,
                    value: 'Set the (column) width and (row) height and this view will arrange child views in a grid. Note setting the width may not be the resulting width as this view ' + 
                    'will fill the space available so may expand the width of each column to fill the parent view.' 
                }),

                gridViewExampleView: ViewsAndLayouts.gridViewExampleView.design({}),

                isVisibleBinding: SC.Binding.transform(function (value, binding) {
                    return ( value === 'gridViewExampleView' ? YES : NO );
                }).from("ViewsAndLayouts.activeViewController.currentlyVisible")
            })
        })
    })
});
