ViewsAndLayouts.chilldLayoutExampleView = SC.View.extend({
    classNames: ['child-layout-view'],
    childViews: ['box1', 'box2', 'box3', 'box4'],

    /*
     * NOTE: dont set the border in the layout for the parent
     * view as it screws up the measurements by 2x the border
     * width.
     */
    layout: { width: 300, centerX: 0, centerY: 0}, // No height required.

    // Layout the child views vertically.
    childViewLayout: SC.View.VERTICAL_STACK,

    // -----------------------------------------------------------------------
    // Child Views
    //

    box1: SC.LabelView.design({
        classNames: ['box box1'],
        layout: { border: 2, height: 100 }, // No top required.
        value: "box1"
    }),

    box2: SC.View.design({
        classNames: ['box box2'],
        layout: { border: 2, height: 150 }, // No top required.

        childViews: ['textView'],
        textView: SC.LabelView.design({
            classNames: ['padd-me'],
            value: "I have some padding OMFG!"
        })
    }),

    box3: SC.LabelView.design({
        classNames: ['box box3'],
        layout: { border: 2, height: 100 }, // No top required.
        value: "box3"
    }),

    box4: SC.LabelView.design({
        classNames: ['box box4'],
        layout: { border: 2, height: 200 }, // No top required.
        value: "box4"
    })

});