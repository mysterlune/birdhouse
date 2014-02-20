//DragDropUpload.SingleDropzone = SC.View.extend({
	//childViews:['dropzoneView'],

	DragDropUpload.SingleDropzone = Dropzone.DropzoneView.extend({
      classNames: ['my-drop-view'],
      layout: { border: 2,centerX: 0, centerY: 0, width: 300, height: 300 },

      // set what happens when a file is added
      addedfile: function(file) {
        console.log(file);
      },

      // any options that don't regard DOM elements can be set here
      // however options that do need to be added in the didAppendToDocument
      // below where the DOM elements will be available.
      options: {
        paramName: 'file',
        /* note we need to setup a server to handle this upload */
        url: 'http://localhost/test/upload.php',
        parallelUploads: 5,
        addRemoveLinks: true,
        uploadMultiple: false,
        maxFilesize: 0.5, // MB
        //forceFallback: true
      },

      // handle fallback scenarios
      fallback: function() {
        console.log('we done did fallback!');
      },

      // any options we want to set where we need DOM elements
      // need to be set here. Don't forget to call the super class
      // so dropzone is properly setup.
      didAppendToDocument  : function() {
        var options = this.get('options'),
          uploadBtnLayer = this.get('uploadBtnView').get('layer'),
          previewsLayer = this.get('previewsContainerView').get('layer');

        options.clickable = uploadBtnLayer;
        options.previewsContainer = previewsLayer;
        
        this.set('options', options);

        return sc_super();
      },

      // if dropzone doesn't say the browser supports drag'n'drop
      // or we forced the fallback in the options.
      didFallback: function () {
        if(this.get('options')) {
          var forced = this.get('options').forceFallback;

          // if we didn't set forceFallback default to false
          if(typeof forced === "undefined") {
            forced = false;
          }

          return !Dropzone.isBrowserSupported() || forced;
        }
        return !Dropzone.isBrowserSupported();
      }.property('options'),

      childViews: ['uploadBtnView', 'previewsContainerView', 'fallbackMessage'],

      // using a SC.ButtonView seems to interfere with the 
      // click listener of dropzone so simply use a label view
      // and style it.
      uploadBtnView: SC.LabelView.design({
        layout:{height: 25, top: 10, left: 10, right: 10},
        classNames: ['dropzone-browse-btn'],
        value: 'browse for files',
        optionsBinding: '.parentView.options',
        isVisibleBinding: SC.Binding.not(".parentView.didFallback")
      }),

      previewsContainerView: SC.View.design({
        layout: {top: 45},
        isVisibleBinding: SC.Binding.not(".parentView.didFallback")
      }),

      fallbackMessage: SC.LabelView.design({
        layout:{top: 10, left: 10, right: 10, bottom: 10},
        isVisibleBinding: SC.Binding.bool(".parentView.didFallback"),
        value:'Hmm, looks like the browser doesnt support dran\'n\'drop or we forced a fallback.'
      })
    })
//})