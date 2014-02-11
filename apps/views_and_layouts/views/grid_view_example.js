ViewsAndLayouts.gridViewExampleView = SC.GridView.extend({
    classNames: ['grid-view'],
    layout: { width: 300, height: 500, centerX: 0, centerY: 0},

    rowHeight: 100,
    columnWidth: 100,

    content: new Array(
        {
            value: "Lorem ipsum",
            className: 'box1'
        },
        {
            value: "Maecenas porta",
            className: 'box2'
        },
        {
            value: "Quisque gravida",
            className: 'box3'
        },
        {
            value: "Etiam sed",
            className: 'box4'
        },
        {
            value: "Ut sem nunc",
            className: 'box5'
        },
        {
            value: "In mattis",
            className: 'box6'
        },
        {
            value: "Est nibh",
            className: 'box7'
        }
    ),

    exampleView: SC.LabelView.design({
        classNames: ['box'],

        classNameBindings: ['boxNumber'],
        boxNumber: function() {
            var content = this.get('content');
            if(content) {
                return content.className;
            }
            return;
        }.property('content').cacheable(),

        value: function() {
            var content = this.get('content');
            if(content) {
                return content.value;
            }
            return;
        }.property('content').cacheable()
    })
});