ViewsAndLayouts.flowExampleView = SC.View.extend(SC.FlowedLayout, {
    classNames: ['flow-view'],
    childViews: ['box1', 'box2', 'box3', 'box4'],
    layout: { border: 2, width: 300, height: 500, centerX: 0, centerY: 0},
    defaultFlowSpacing : {left:5,top:5},

    // -----------------------------------------------------------------------
    // Child Views
    //

    /*
     * The simplest of flow view items. just a label view
     * where the dimensions have been set in the layout.
     */
    box1: SC.LabelView.design({
        classNames: ['flow-item'],
        layout: { height: 30, width: 60},
        value: "item 1"
    }),

    /*
     * This child view is special as it uses a child view for
     * its text. This is because if we want to set padding to 
     * the text we need to make a child view so the css doesn't
     * affect the default flow spacing.
     */
    box2: SC.LabelView.design({
        classNames: ['flow-item'],
        layout: { height: 30, width: 130 },
        
        /* So because I want to set some padding to the text in this
         view we need to make a child view as setting padding on the 
         parent view would affect the defaultFlowSpacing */
        childViews: ['textView'],
        textView: SC.LabelView.design({
            value: "I don't touch the side"
        })
    }),

    /*
     * This view is even more so special because we don't set 
     * the width of the flow item but have it set its own width
     * dynamically depending on the amount of text it holds. This
     * is done by having a child view that with the mixin 
     * SC.AutoResize and the flow item view adjusts its size 
     * when the child view frame changes. Magic!
     */
    box3: SC.View.design({
        classNames: ['flow-item'],

        layout: { height: 30},
        adjustWidth: function() {
        	var textWidth = this.textView.layout.width + 10;// take textView layer padding into account when adjusting width
        	this.adjust({width:textWidth});
        }.observes('textView.frame'),

        childViews: ['textView'],
        textView: SC.LabelView.design(SC.AutoResize, {
        	supportsAutoResize: YES,
        	autoResizePadding: -10,// take css padding into account when resizing text (5px left & right)
        	value: "Dynamic WoOoOoo!"
        })
    }),

    /*
     * The last view was so awesome I count better it for this one.
     */
    box4: SC.LabelView.design({
        classNames: ['flow-item'],
        layout: { height: 30, width: 100 },
        
        childViews: ['textView'],
        textView: SC.LabelView.design({
        	value: "box4"
        })
    })

});