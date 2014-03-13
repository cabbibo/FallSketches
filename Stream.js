
STREAMS = [];

function Stream( file , controller, looping ){

  this.file = file;
  this.controller = controller;
  this.ctx = this.controller.ctx;


  this.looping = looping;

  this.controller.notes.push( this );

  STREAMS.push( this );
 
}


Stream.prototype.play = function(){

  this.createAudio();

  console.log( 'HELLO' );
  console.log( this.audio );
  var self = this;

  setTimeout( function(){

    if( !self.source ){

      console.log('NO SOURECE');
      self.createSource();
      self.audio.play();
      self.playing = true;

    }else{

      console.log( 'SORUCES');
      self.audio.play();
      self.playing = true;

    }

  
  }, 100 );


}

Stream.prototype.stop = function(){

  this.playing = false;
  console.log( this.audio );
  this.audio.pause();
  this.destroySource();

}

Stream.prototype.destroySource = function(){

  if( this.gain ){

    this.gain.disconnect(  this.controller.gain );

  }

  this.source = undefined;
  this.audio = undefined;
  this.gain = undefined;

}

Stream.prototype.createAudio = function(){

  var audio     = new Audio();
  audio.preload = "none"
  audio.src     = this.file;
  audio.loop    = true;

  console.log(' AUDS');
  console.log( audio );
  this.audio    = audio;

}
Stream.prototype.createSource = function(){

  if( this.audio ){

    console.log( 'THIS IS HAPPENENIGN');
    this.source = this.ctx.createMediaElementSource( this.audio );

    this.source.connect( this.controller.gain );
   /* this.gain     = this.ctx.createGain();
    this.gain.connect( this.controller.gain );*/


  }else{

    console.log('What the ACTUAL FUCK!');

  }



}




/*Stream.prototype.fadeOut = function( time , callback ){
 
  var t = this.controller.ctx.currentTime;
  if( !time ) time = this.params.fadeTime;
  this.gain.gain.linearRampToValueAtTime( this.gain.gain.value , t );
  this.gain.gain.linearRampToValueAtTime( 0.0 , t + time );

  setTimeout( callback.bind( this ) , time * 1000 );

}

Stream.prototype.fadeIn = function( time , value ){

  this.gain.gain.linearRampToValueAtTime( 1 , this.controller.ctx.currentTime + time );

}*/

/*Stream.prototype.play = function(){

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
    this.audio = undefined;
    //this.audio.currentTime = 0;
    //this.source.currentTime = 0;
   // this.gain.disconnect( this.source );
   
    //this.gain.disconnect( this.source );
    //this.source = undefined;

 });

}*/


Stream.prototype.update = function(){

  //this.analyzer.getByteFrequencyData( this.analyzer.array );

}
