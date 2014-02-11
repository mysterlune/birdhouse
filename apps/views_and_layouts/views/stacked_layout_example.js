ViewsAndLayouts.stackedLayoutExampleView = SC.StackedView.extend({
    classNames: ['stacked-view'],
    layout: { border: 2, width: 300, height: 500, centerX: 0, centerY: 0},

    content: new Array(
        {
            value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum, " + 
                  "dui nec dignissim accumsan, turpis ante placerat ante, et tempus quam dolor non " + 
                  "sapien. Nam purus nibh, ullamcorper id ipsum feugiat, posuere iaculis nisl. Aliquam " + 
                  "iaculis elementum lobortis. Sed ut risus semper, vulputate risus in, dignissim " + 
                  "tellus. Cras vel sodales felis. In lacinia neque adipiscing ultricies volutpat. " + 
                  "Curabitur non faucibus eros.",
            className: 'box1'
        },
        {
            value: "Maecenas porta aliquam faucibus. Ut sem nunc, lacinia eget euismod vel, interdum vitae metus.",
            className: 'box2'
        },
        {
            value: "Quisque gravida lorem et ante vestibulum, in mattis metus rhoncus. Etiam vel " + 
                  "interdum metus, at molestie dui. Aenean cursus tincidunt nisi. Integer lorem sem, ultricies " + 
                  "eu elit quis, rhoncus pretium tortor. Praesent ornare consequat dui, non semper tortor " + 
                  "hendrerit sagittis. Ut blandit a sem et mollis.",
            className: 'box3'
        },
        {
            value: "Etiam sed est nibh.",
            className: 'box4'
        }
    ),

    exampleView: SC.LabelView.design({
        classNames: ['box'],
        useStaticLayout: YES,
        layout: { border: 2 },

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