/*
 * Sniff/intercept/alter any URL requests from an iOS app
 
   Open the app, then run:
   frida -U -n Safari -l frida-url-interceptor.js
   
 * adjust Safari to the app you want to hook
 *
 * -samy kamkar
 * 7/3/2018
 */

/********* INJECT BOX *******/
// Defining a Block that will be passed as handler parameter to +[UIAlertAction actionWithTitle:style:handler:]
var handler = new ObjC.Block({
  retType: 'void',
  argTypes: ['object'],
  implementation: function () {
  }
});

// Import ObjC classes
var UIAlertController = ObjC.classes.UIAlertController;
var UIAlertAction = ObjC.classes.UIAlertAction;
var UIApplication = ObjC.classes.UIApplication;
var injected = false;

/***** PRINT URL *****/

// Obtain a reference to the initWithURL: method of the NSURLRequest class
var URL = ObjC.classes.NSURLRequest["- initWithURL:"];

// Intercept the method
Interceptor.attach(URL.implementation, {
  onEnter: function(args) {
    var NSAutoreleasePool = ObjC.classes.NSAutoreleasePool;
    var NSString = ObjC.classes.NSString;
    //  var NSString = ObjC.use("NSString");

    var pool = NSAutoreleasePool.alloc().init();
    try {
      var NSLog = new NativeFunction(Module.findExportByName('Foundation', 'NSLog'), 'void', ['pointer', '...']);
      // print argument
      console.log("URL:", ObjC.Object(args[2]));

      // you could replace the URL here by swappig out args[2]...

      if (!injected)
      {
        injected = true;
        // Using Grand Central Dispatch to pass messages (invoke methods) in application's main thread
        ObjC.schedule(ObjC.mainQueue, function () {
          // Using integer numerals for preferredStyle which is of type enum UIAlertControllerStyle
          var alert = UIAlertController.alertControllerWithTitle_message_preferredStyle_('URL Interceptor', 'code successfully injected -samy', 1);

          // Again using integer numeral for style parameter that is enum
          var defaultAction = UIAlertAction.actionWithTitle_style_handler_('OK', 0, handler);
          alert.addAction_(defaultAction);

          // Instead of using `ObjC.choose()` and looking for UIViewController instances
          // on the heap, we have direct access through UIApplication:
          UIApplication.sharedApplication().keyWindow().rootViewController().presentViewController_animated_completion_(alert, true, NULL);
        })
      }
    } finally {
      pool.release();
    }

  }
});
