// ==========================================================================
// Project:   Dropzone Framework for Sproutcore
// Copyright: @2014 My Company, Inc.
// ==========================================================================

/** @class
  A simple dropzone integration view.

  This makes it easier to work with Dropzone in Sproutcore. It allows
  for binding data and controls via a thin wrapper to the Dropzone API.

  ===========
     Usage
  ===========
  All dropzone views are instantiated programmatically as described in the
  dropzone documentation. This is done by setting the dropElement.


 */
Dropzone.DropzoneView = SC.View.extend({
	options: {},

	/** @private */
	_dropElement: null,

	/** @private */
	_dropzone: null,

	/*
     * when using this view overwrite these functions which are performed
     * when their corresponding dropzone listener events are triggered.
     */
    addedfile: function(file) {
    },
    removedfile: function(file) { 
    },
    selectedfiles: function(file) { 
    },   
    thumbnail: function(file, dataUrl) { 
    },
    error: function(file, errorMessage) { 
    },
    processing: function(file) { 
    },
    uploadprogress: function(file) { 
    },
    sending: function(file, xhr, formData) { 
    },
    success: function(file, response) { 
    },
    complete: function(file) { 
    },
    canceled: function(file) {
    },
    maxfilesreached: function(file) { 
    },
    maxfilesexceeded: function(file) {
    },

    fallback: function() {
    	// overwrite me with something useful
    },

	enable: function() {
        var dropzone = this._dropzone;
        dropzone.enable();
    },

    disable: function() {
        var dropzone = this._dropzone;
        dropzone.disable();
    },

	/*
	 * After the layer (DOM element) is appended create the dropzone instance.
	 */
	didAppendToDocument  : function() {
		var options = this.get('options');

		// keep a reference of the view for when we add listeners
        var self = this;

        options.fallback = function() {
        	var view = self;
        	self.fallback();
        }
        /*
         * By default we setup the listers and map them to functions
         * in the view however this can be overwritten when crating a
         * dropzone view by not calling the didAppendToDocument superclass 
         * and setting dropzone up manually.
         */
        options.init = function() {
          // map all the listener functions to functions in the view.
          var view = self;
          this.on('addedfile', function(file) { return view.addedfile(file); });
          this.on('removedfile', function(file) { return view.removedfile(file); });
          this.on('selectedfiles', function(file) { return view.selectedfiles(file); });
          this.on('thumbnail', function(file, dataUrl) { return view.thumbnail(file, dataUrl); });
          this.on('error', function(file, errorMessage) { return view.error(file, errorMessage); });
          this.on('processing', function(file) { return view.processing(file); });
          this.on('uploadprogress', function(file) { return view.uploadprogress(file); });
          this.on('sending', function(file, xhr, formData) { return view.sending(file, xhr, formData); });
          this.on('success', function(file, response) { return view.success(file, response); });
          this.on('complete', function(file) { return view.complete(file); });
          this.on('canceled', function(file) { return view.canceled(file); });
          this.on('maxfilesreached', function(file) { return view.maxfilesreached(file); });
          this.on('maxfilesexceeded', function(file) {return view.maxfilesexceeded(file); });
        }
		
		var dropzone = new Dropzone(this.get('tagName') + "#" + this.get('layerId'), options);

		// cache dropzone instance
		this.set('_dropzone', dropzone);
	},

	/**
     * SC.View callback. Used to shutdown and remove the dropzone.
     */
    willRemoveFromDocument: function () {
        var dropzone = this._dropzone;

        dropzone.disable();

        this._dropzone = null;
    }
});