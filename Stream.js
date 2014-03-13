
STREAMS = [];

function Stream( file , controller, looping ){

  this.file = file;
  this.controller = controller;

  this.analyzer = this.controller.ctx.createAnalyser();
  this.analyzer.array = new Uint8Array( 1024 );
  this.gain     = this.controller.ctx.createGain();

  this.gain.connect( this.analyzer );
  this.analyzer.connect( this.controller.gain );

  this.looping = looping;

  /*this.audio = new Audio();

  this.audio.preload = 'none';

  this.audio.src = this.file;*/

  var audio = new Audio();
  audio.preload = "none";
  audio.src = this.file;
  audio.loop = true;
  this.audio = audio;

  this.controller.notes.push( this );

  STREAMS.push( this );
 
}



Stream.prototype.createSource = function(){

  var ctx = this.controller.ctx;

  
 // this.audio.load();

 // this.audio.currentTime = 0;
  this.source = ctx.createMediaElementSource( this.audio );
  this.source.connect( this.gain );


}

Stream.prototype.fadeOut = function( time , callback ){
 
  var t = this.controller.ctx.currentTime;
  if( !time ) time = this.params.fadeTime;
  this.gain.gain.linearRampToValueAtTime( this.gain.gain.value , t );
  this.gain.gain.linearRampToValueAtTime( 0.0 , t + time );

  setTimeout( callback.bind( this ) , time * 1000 );

}

Stream.prototype.fadeIn = function( time , value ){

  this.gain.gain.linearRampToValueAtTime( 1 , this.controller.ctx.currentTime + time );

}

Stream.prototype.play = function(){

  var self = this;

  if(!this.source){
    this.createSource();
  }


  setTimeout(function(){



    self.audio.play();
    self.fadeIn( .5 , 1 );
    self.playing = true;

  },10);


}

Stream.prototype.stop = function(){

  this.fadeOut( .4 , function(){ 

    this.audio.pause();
    this.playing = false;
 
    this.audio.currentTime = 0;
    //this.audio.currentTime = 0;
    //this.source.currentTime = 0;
   // this.gain.disconnect( this.source );
   
    //this.gain.disconnect( this.source );
    //this.source = undefined;

 });

}


Stream.prototype.update = function(){

  this.analyzer.getByteFrequencyData( this.analyzer.array );

}
