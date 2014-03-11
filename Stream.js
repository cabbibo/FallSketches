

function Stream( file , controller, looping ){

  this.file = file;
  this.controller = controller;

  this.analyzer = this.controller.ctx.createAnalyser();
  this.analyzer.array = new Uint8Array( 1024 );
  this.gain     = this.controller.ctx.createGain();

  this.gain.connect( this.analyzer );
  this.analyzer.connect( this.controller.gain );

  this.looping = looping;

  this.audio = new Audio();

  this.audio.preload = 'none';

  this.audio.src = this.file;

  this.createSource();

  this.controller.notes.push( this );
 
}



Stream.prototype.createSource = function(){

  var ctx = this.controller.ctx;

  var audio = new Audio();
  audio.preload = "none";
  audio.src = this.file;
  audio.loop = true;
  this.audio = audio;
  this.audio.load();

 // this.audio.currentTime = 0;
  this.source = ctx.createMediaElementSource( this.audio );
  this.source.connect( this.gain );

  //this.audio.currentTime = 0;
  //this.source.currentTime = 0;

}

Stream.prototype.fadeOut = function( time , callback ){
 
  var t = this.controller.ctx.currentTime;
  if( !time ) time = this.params.fadeTime;
  this.gain.gain.linearRampToValueAtTime( this.gain.gain.value , t );
  this.gain.gain.linearRampToValueAtTime( 0.0 , t + time );

  setTimeout( callback.bind( this ) , time * 1000 );

}

Stream.prototype.fadeIn = function( time , value ){

  //if( !time  ) time  = 1;
  //if( !value ) value = 1;

  console.log( 'FADDED' );
  console.log( this.gain.gain );
  this.gain.gain.linearRampToValueAtTime( 1 , this.controller.ctx.currentTime + time );

}

Stream.prototype.play = function(){

  var self = this;

  console.log( 'HELLO' );
  setTimeout(function(){

    if(!self.source){
        
        self.createSource();
        self.audio.play();
        self.fadeIn( .5 , 1);
        
    }else{
    

        self.audio.play();
        self.fadeIn( .5 , 1 );

    }
    self.playing = true;
  },10);


}

Stream.prototype.stop = function(){

  this.fadeOut( 1 , function(){ 

    console.log( 'HELLO' );
   // this.audio.stop();
   //
    this.audio.pause();
    this.playing = false;
  
    //this.audio.currentTime = 0;
    //this.source.currentTime = 0;
   // this.gain.disconnect( this.source );
    
    this.source = undefined;
    this.audio = undefined;
    console.log( 'SONG ENDED' );
    console.log( this );

  });

}


Stream.prototype.update = function(){

  this.analyzer.getByteFrequencyData( this.analyzer.array );

}
