ViewsAndLayouts.listViewExampleView = SC.ListView.extend({
    classNames: ['list-view'],
    layout: { width: 300, height: 500, centerX: 0, centerY: 0},

    rowHeight: 50,

    content: new Array(
        {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum, ",
            className: 'box1'
        },
        {
            value: "Maecenas porta aliquam faucibus. Ut sem nunc, lacinia eget euismod vel, interdum vitae metus.",
            className: 'box2'
        },
        {
            value: "Quisque gravida lorem et ante vestibulum, in mattis metus rhoncus. Etiam vel ",
            className: 'box3'
        },
        {
            value: "Etiam sed est nibh.",
            className: 'box4'
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