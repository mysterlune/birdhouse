// ==========================================================================
// Project:   TouchMe - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals TouchMe */

// This page describes the main user interface for your application.
TouchMe.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    childViews: ['navView', 'displayView'],

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
            value: "swipe example",
            viewToView: 'swipeExampleView'
          },
          {
            value: "tap example",
            viewToView: 'tapExampleView'
          },
          {
            value: "pinch example",
            viewToView: 'pinchExampleView'
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
            TouchMe.activeViewController.set('currentlyVisible',view);

          }
        })
      })
    }),

    displayView: SC.View.design({
      layout: { left: 0.2 },
      childViews: ['statusView', 'overviewView', 'swipeExampleView', 'pinchExampleView', 'tapExampleView'],

      statusView: SC.LabelView.design({
        layout: {top: 0, height: 20},
        classNames: ['status-view'],
        value: 'idle'
      }),

      overviewView: SC.View.design({

        layout: {top: 30, left: 10, right: 10},

        render: function(context, firstTime) {
          context.push("<p>The menu on the left navigates to different gesture examples. Above is a status line of the last event for a gesture that " + 
            "changes on gesture start, when a gesture is happening and when a gesture has ended.</p>");
        },

        isVisibleBinding: SC.Binding.transform(function (value, binding) {
          return ( value === null ? YES : NO );
        }).from("TouchMe.activeViewController.currentlyVisible")
      }),

      swipeExampleView: TouchMe.SwipeExampleView.design({
        classNames: ['swipe-view'],
        layout: {width: 300, height: 300, centerX: 0, centerY: 0},

        isVisibleBinding: SC.Binding.transform(function (value, binding) {
          return ( value === 'swipeExampleView' ? YES : NO );
        }).from("TouchMe.activeViewController.currentlyVisible")
      }),
      
      tapExampleView: TouchMe.TapExampleView.design({
        classNames: ['tap-view'],
        layout: {width: 300, height: 300, centerX: 0, centerY: 0},

        isVisibleBinding: SC.Binding.transform(function (value, binding) {
          return ( value === 'tapExampleView' ? YES : NO );
         }).from("TouchMe.activeViewController.currentlyVisible")
      }),

      pinchExampleView: TouchMe.PinchExampleView.design({
        classNames: ['pinch-view'],
        layout: {width: 300, height: 300, centerX: 0, centerY: 0},

        isVisibleBinding: SC.Binding.transform(function (value, binding) {
          return ( value === 'pinchExampleView' ? YES : NO );
         }).from("TouchMe.activeViewController.currentlyVisible")
      })
    })
  })
});
