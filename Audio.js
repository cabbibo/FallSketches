

function Audio( file , controller, looping ){

  this.file = file;
  this.controller = controller;

  console.log( file );
  console.log( this.controller );

  this.filter   = this.controller.ctx.createBiquadFilter();
  this.analyzer = this.controller.ctx.createAnalyser();
  this.analyzer.array = new Uint8Array( 1024 );
  this.gain     = this.controller.ctx.createGain();

  this.gain.connect( this.analyzer );
  this.analyzer.connect( this.controller.gain );

  this.looping = looping;

  this.loadFile();

  this.controller.notes.push( this );
 
}


Audio.prototype.loadFile = function(){

  var request=new XMLHttpRequest();
  request.open("GET",this.file,true);
  request.responseType="arraybuffer";
 
  var self = this;
  request.onerror = function(){
    alert( 'ERROR LOADING SONG' );
    //self.womb.loader.addFailue( 'Capability to load song' , 'http://womble.com'
  }


  //request.onprogress = this.loadProgress.bind( this );
  var self = this;
    
  request.onload = function(){

    self.controller.ctx.decodeAudioData(request.response,function(buffer){

      if(!buffer){
        alert('error decoding file data: '+url);
        return;
      }

      self.buffer = buffer;
      self.onDecode();

    })
  }

  request.send();

}

Audio.prototype.onDecode = function(){

  //gets just the track name, removing the mp3
  this.trackID= this.file.split('.')[this.file.split('.').length-2];

  this.createSource();

  //this.onLoad( this );

}

Audio.prototype.play = function(){

  this.playing = true;
  this.source.noteOn(0);
 
  // Creates a new source for the audio right away
  // so we can play the next one with no delay
  if(this.source.loop == false && this.source.buffer.duration < 5){
    this.createSource();	
  }

};


Audio.prototype.stop = function(){

  this.playing = false;
  this.source.noteOff(0);

  this.createSource();

};


Audio.prototype.createSource = function() {

  this.source         = this.controller.ctx.createBufferSource();
  this.source.buffer  = this.buffer;
  this.source.loop    = this.looping;
         
  this.source.connect( this.gain  );

  //this.gain.gain.value = 1;

  this.gain.connect( this.analyzer );

  this.analyzer.connect( this.controller.gain );
  //this.controller.gain.connect( this.analyzer );

}

Audio.prototype.update = function(){

  this.analyzer.getByteFrequencyData( this.analyzer.array );

}
