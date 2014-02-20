// ==========================================================================
// Project:   DragDropUpload - mainPage
// Copyright: @2014 My Company, Inc.
// ==========================================================================
/*globals DragDropUpload */

// This page describes the main user interface for your application.
DragDropUpload.mainPage = SC.Page.design({

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page
    // load.
    mainPane: SC.MainPane.design({
        childViews:['menuView', 'displayView'],

        menuView: SC.ScrollView.design({
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
                        viewToView: "overviewView"
                    },
                    {
                        value: "single dropzone",
                        viewToView: 'singleDrop'
                    },
                    {
                        value: "multiple dropzones",
                        viewToView: 'multiDrop'
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
                        DragDropUpload.mainPage.mainPane.displayView.set('nowShowing',view);
                    }
                })
            })
        }),

        displayView: SC.ContainerView.extend({
            layout: { left: 0.2 },

            nowShowing: 'overviewView',

            overviewView: SC.LabelView.extend({
                layout: {width: 400, height: 50, centerX: 0, centerY: 0},
                classNames: ['overview'],
                value: "This app shows how to implement drag and drop file uploads!"
            }),

            singleDrop: DragDropUpload.SingleDropzone.extend({}),

            multiDrop: SC.View.extend({
                childViews: ['dropOneView', 'dropTwoView'],

                dropOneView: DragDropUpload.SingleDropzone.extend({
                    layout: {width:300, height:300, centerX:-160, centerY:0},

                    options: {
                        paramName: 'file',
                        /* note we need to setup a server to handle this upload */
                        url: 'http://localhost/test/upload.php?dropView=1',
                        parallelUploads: 5,
                        addRemoveLinks: true,
                        uploadMultiple: false,
                        maxFilesize: 0.5, // MB
                        //forceFallback: true
                    },
                }),

                dropTwoView: DragDropUpload.SingleDropzone.extend({
                    layout: {width:300, height:300, centerX:160, centerY:0},

                    options: {
                        paramName: 'file',
                        /* note we need to setup a server to handle this upload */
                        url: 'http://localhost/test/upload.php?dropView=2',
                        parallelUploads: 5,
                        addRemoveLinks: true,
                        uploadMultiple: false,
                        maxFilesize: 0.5, // MB
                        //forceFallback: true
                    },
                })
            })
        })
    })
});
