function Loader(){

  this.params =  {
    numberToLoad:   14,
    loadGif:        "lib/loadGif.gif",
    videoWidth: 500,
    videoHeight: 281,
    failureTitleText: "This project requires the following:",
    failureVideoText: "But here's a video which is probably better anyway",
    failureVideo:     69517912,  // The Vimeo Video Number !
  };

  
  this.neededTech = [ 'webGL' , 'audio' , 'mobile' ];

  this.numberLoaded = 0;
  this.numberToLoad = this.params.numberToLoad;
  
  this.curtain = document.createElement('div');
  this.curtain.id = "curtain";
  this.curtain.style

  document.body.appendChild( this.curtain );


  this.loadBar = document.createElement('div');
  this.loadBar.id = "loadBar";

  this.loadInfo = document.createElement('div');
  this.loadInfo.id = 'loadInfo';

  this.curtain.appendChild( this.loadInfo );
  
  this.loadBarAddAmount = window.innerWidth / this.numberToLoad;

  this.curtain.appendChild( this.loadBar );

  this.loadingGif     = document.createElement( 'img' );
  this.loadingGif.src = this.params.loadGif;
  this.loadingGif.id  = 'loadingGif';



  var curtainTemp = this.curtain;

  this.loadingGif.onload = function(){
 
    var margin = this.height + 10
    this.style.marginLeft  = "-" + this.width / 2 + "px";
    this.style.marginTop   = "-" + margin + "px";
    curtainTemp.appendChild( this );

  }

  // Conditions are things that will check each time something 
  // new is loaded, allowing us to start putting together certain parts
  // of the program after a specific condition is made
  this.conditions = [];

  // Failures are things that the browser doesn't have.
  // If there are a non 0 number of failures the user will be alerted
  this.failures = [];



  this.detect();


}

Loader.prototype = {


  addLoadInfo: function(s){

    this.loadInfo.innerHTML = s;
  },

  addToLoadBar: function(){

    this.numberToLoad ++;
    this.updateLoadBar();

  },

  updateLoadBar: function(){


    this.loadBarAddAmout = window.innerWidth / this.numberToLoad;

    var loadBarWidth = this.loadBarAddAmount * this.numberLoaded;
    this.loadBar.style.width = loadBarWidth + "px";

  },


  loadBarAdd: function( fileName ){

   // console.log( fileName );
    var oldWidth = parseInt( this.loadBar.style.width );
    var newWidth = oldWidth + this.loadBarAddAmount;

    this.loadBar.style.width = newWidth + "px";

    this.numberLoaded ++;

    this.checkConditions();

    //console.log( this.numberLoaded );

    if( this.numberLoaded == this.numberToLoad ){
      this.onFinishedLoading();
    }


  },



  // This will run through all of our saved conditions
  // and trigger whatever is necessary when we need to
  checkConditions: function(){

    for( var i = 0; i < this.conditions.length; i++ ){

      console.log( 'conditions checked' );
      var c = this.conditions[i];

      console.log( c );
      console.log( c[0] );
      if( c[0] ){
        c[1];
        this.conditions.splice( i , 1 );
      }

    }

  },

  addCondition: function( condition , callback ){
    this.conditions.push( [ condition , callback ] ); 
  },

  addFailureDialog: function(){

    this.failureDialog = document.createElement('div');
    this.failureDialog.id = "failureDialog";

    this.curtain.appendChild( this.failureDialog );

    var failureTitle = document.createElement('h3');
    failureTitle.id = "failureTitle";
    failureTitle.innerHTML = this.params.failureVideoText;

    var failureReasons = document.createElement('h2');
    failureTitle.id = "failureReaons";
    failureReasons.innerHTML = this.params.failureTitleText;
   
    this.failureList = document.createElement('p');
    this.failureList.id = "failureList";


    this.failureVideo = document.createElement('div');

    var w = window.innerWidth / 1.618;
    var string = '<iframe src="//player.vimeo.com/video/';
    string += this.params.failureVideo;
    string += '" width="'
    string += w;
    string += '" height="'
    string += w * .618;
    string += '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'

    this.failureVideo.innerHTML = string;
    
    this.failureDialog.appendChild( failureReasons );
    this.failureDialog.appendChild( this.failureList );

    this.failureDialog.appendChild( failureTitle );
    this.failureDialog.appendChild( this.failureVideo );


  },

  addFailure: function( failureName , failureLink ){

    
    if( !this.failureDialog )
      this.addFailureDialog();

    var failure = document.createElement('a');

    failure.href = failureLink;
    failure.target = '_blank';
    failure.innerHTML = "   " + failureName+ "   ";

    this.failureList.appendChild( failure );

    //var failureName = 
    this.failures.push( [failureName,failureLink] );

    var xHalf = this.failureDialog.clientWidth / 2;
    var yHalf = this.failureDialog.clientHeight / 2 ;

    var wHalf = window.innerWidth / 2;
    var hHalf = window.innerHeight / 2;

    var top = hHalf - yHalf;
    var left = wHalf - xHalf;

    console.log( top );
    if( top < 5 ) top = 5;
    if( left < 5 ) left = 5;

    this.failureDialog.style.top  = top + "px";
    this.failureDialog.style.left = left + "px";


    console.log( this.failureDialog.clientHeight );

  },

  onFinishedLoading: function(){
 
    var self = this;
   
    if( !this.failures.length ){
      $(this.curtain).fadeOut('slow',function(){
        self.onStart();
      });
    }

  },

  onStart: function(){

    
    if( !window.STARTED ){
      window.STARTED = true
      animate();
    }else{
      console.log('Womb Already Started' );
    }
    
  },

  setNavigator: function(){

    window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia;

    this.womb.navigator = window.navigator;

  },

  detect: function(){


    for(var i = 0 ; i < this.neededTech.length; i++ ){

      var tech = this.neededTech[i];
      if( tech == 'webGL' )
        this.detectWebGL();
      else if( tech == 'audio' )
        this.detectWebAudioAPI();
      else if( tech == 'mobile' )
        this.detectMobile();

    }

    if( this.failures >  0 ){

        throw new Error('This is not an error. This is just to abort javascript');
      

    }


  },
  
  detectWebGL: function(){

    var webGL = function() { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } };

    var gl = webGL();
    
    if( !gl )
      this.addFailure( "WebGL" ,'http://get.webgl.org/');

  },

  detectWebAudioAPI: function(){

    try {
      window.AudioContext = window.AudioContext||window.webkitAudioContext;
    }catch(e) {
      this.addFailure( 'Web Audio API' ,'http://caniuse.com/audio-api' ); 
    }

  },

  detectMobile: function(){

    var detectM = function () { 
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ){
        return true;
      } else {
        return false;
      }
    }

    var mobile = detectM();

    if( mobile )
      this.addFailure( "Non Mobile" , "http://cabbibo.tumblr.com" );

  }



}



var loader = new Loader();
