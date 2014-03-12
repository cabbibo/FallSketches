

          var songs = [
        
            [   
              "Bleep Bloop" ,             // Title
              "audio/bleepBloop.mp3"  ,   // song
              'audio/notes/1.mp3'  ,     // note
              [ 4.5 , -2.0 , 2.2  ],        // position
              [ .8 , 1.2 , .2   ],        // color
              2.5,                         // NoiseSize
              .1,                         // NoisePower
              .4,                         // NoiseSpeed
              .4,                         // AudioPower
            ],
            [ 
              "OPN"                , 
              "audio/OPN.mp3"     , 
              'audio/notes/2.mp3'  ,   
              [ 4.5 , 0 , 2.2  ],
              [ .3 , 1.2 , .7   ],        // color
              .6,                         // NoiseSize
              .2,                         // NoisePower
              .9,                         // NoiseSpeed
              .5,                         // AudioPower
            ],

            [ 
              "Don't Really Care" , 
              "audio/dontReallyCare.mp3" ,
              'audio/notes/3.mp3'  , 
              [ 3.6 , 1.6 , 1.5  ],
              [ .3 , .4 , 1.2   ],        // color
              .1,                         // NoiseSize
              .1,                         // NoisePower
              1.2,                         // NoiseSpeed
              .4,                         // AudioPower
            ],

            [ 
              "Calvin Preys"   , 
              "audio/calvinPreys.mp3"   ,   
              'audio/notes/4.mp3'  , 
              [ 2.5 , 3 , 1.5   ],
              [ .6 , .4 , .7   ],        // color
              .2,                         // NoiseSize
              .5,                         // NoisePower
              .9,                         // NoiseSpeed
              .5,                         // AudioPower
            ],

            [ 
              "Little Bit Frightened" ,
              "audio/littleBitFrightened.mp3" ,  
              'audio/notes/5.mp3'  , 
              [ 1.5 , 4., 3.   ],
              [ 1.3 , .2 , .5   ],        // color
              .6,                         // NoiseSize
              .3,                         // NoisePower
              .3,                         // NoiseSpeed
              .6,                         // AudioPower
            ],

            [ 
              "Holly" ,
              "audio/holly.mp3" ,  
              'audio/notes/3.mp3'  , 
              [ -1.0  , 5.0 , 2.   ],
              [ .3 , .2 , .5   ],        // color
              1.2,                         // NoiseSize
              .3,                         // NoisePower
              .3,                         // NoiseSpeed
              .9,                         // AudioPower
            ],

            [ 
              "Tongue Wrong Song" ,
              "audio/tongueWrongSong.mp3" ,  
              'audio/notes/1.mp3'  , 
              [ - 3.0 , 4.5 , 1.5   ],
              [ 1.0 , 1.0 , .5   ],        // color
              .1,                         // NoiseSize
              .6,                         // NoisePower
              1.2,                         // NoiseSpeed
              .6,                         // AudioPower
            ],



          ];

           var songObjects = [];
          var songObject;

          
  noiseTexture = THREE.ImageUtils.loadTexture( 
      "textures/water.jpg",
      THREE.UVMapping , 
      function(){ loader.loadBarAdd();	}
  );
  noiseNormals = THREE.ImageUtils.loadTexture( 
      "textures/waternormals.jpg", 
      THREE.UVMapping , 
      function(){ loader.loadBarAdd();	 }
  );

  var mapHeight = THREE.ImageUtils.loadTexture(
      "textures/water.jpg",
      THREE.UVMapping , 
      function(){ loader.loadBarAdd();	}
  );


  mapHeight.anisotropy = 4;
      mapHeight.repeat.set( 0.998, 0.998 );
      mapHeight.offset.set( 0.001, 0.001 )
      mapHeight.wrapS = mapHeight.wrapT = THREE.RepeatWrapping;
      mapHeight.format = THREE.RGBFormat;

  hoverOverMaterial = new THREE.MeshPhongMaterial({
    color:0xff9999,
    map: noiseTexture,
    normalMap: noiseNormals,
    bumpMap: noiseTexture,
    bumpScale: 1000,
    shininess: 100,
   // blending: THREE.AdditiveBlending,
transparent: true,
    opacity: 5,

    normalScale: new THREE.Vector3( 1 , 1 , -100 )
  });
  hoverOutMaterial = new THREE.MeshPhongMaterial({
    color:0xaa6666,
    map: noiseTexture,
    normalMap: noiseNormals,
    bumpMap: noiseTexture,
    bumpScale: 1000,
    shininess: 100,
    //blending: THREE.AdditiveBlending,
transparent: true,
    opacity: 5,
    normalScale: new THREE.Vector3( 1 , 1 , -100 )

  });
  clickMaterial = new THREE.MeshPhongMaterial({
    color:0xffffff,
    map: noiseTexture,
    normalMap: noiseNormals,
    bumpMap: noiseTexture,
    bumpScale: 1000,
              shininess: 100,
              transparent: true,
              opacity: 5,
    //          blending: THREE.AdditiveBlending,
              normalScale: new THREE.Vector3( 1 , 1 , -100 )
            });



         // var textCreator = new TextCreator( 200 );

            function initSongs( position , scale ){

            songObject = new THREE.Object3D();
            songObject.position = position;


         
            var material = new THREE.MeshPhongMaterial({
              color:0x0000ff,
              specular:0x0000ff,
              ambient: 0x00ff00,
              map: diffuseTexture1
            });

            var geo = new THREE.CubeGeometry( 1 , 1, 1 , 30 , 30 , 30 );
           

            var l = songs.length;
            for( var i = 0; i < songs.length; i++ ){

              var song = {}

              var s = songs[i];

              var mesh = new THREE.Mesh( geo , material );
             
              mesh.scale.multiplyScalar( scale );

              mesh.rotation.x = Math.random() * 2 * Math.PI;
              mesh.rotation.y = Math.random() * 2 * Math.PI;
              mesh.rotation.z = Math.random() * 2 * Math.PI;

              song = mesh;

              song.params = s;

              song.title = s[0];
              song.track = new Stream( s[1] , audioController , false );
              song.note  = new Note( s[2] , audioController , false );

              song.note.gain.gain.value = .1;

              song.position = new THREE.Vector3( s[3][0] , s[3][1] , s[3][2] );
              song.position.multiplyScalar( scale );

              song.titleMesh = textCreator.createMesh( song.title );

 

              var w = song.titleMesh.scaledWidth;
              var offset = w * scale / 2;                                 
              song.titleMesh.position.x = -500 - offset ;
              song.titleMesh.position.z = 600;
              song.titleMesh.position.y = ( i - 2.5 ) * 100; //- 100;

              song.hoverOver = hoverOver.bind( song );
              song.hoverOut = hoverOut.bind( song );
              song.activate = activate.bind( song );
              song.deactivate = deactivate.bind( song );

              /*song.titleMesh.hoverOver = hoverOver.bind( song );
              song.titleMesh.hoverOut = hoverOut.bind( song );
              song.titleMesh.activate = activate.bind( song );
              song.titleMesh.deactivate = deactivate.bind( song );*/




              //var lefPosition = new THREE.
              var leftPosition  = song.titleMesh.position.clone();
              leftPosition.x += offset;

              var s2 = Math.pow( 2 , .5 );

              position1 = leftPosition.clone();
              
              position2 = position1.clone();
              position2.x += 10 +( ( l- i)  * 10);

              position3 = position2.clone();
              position3.y = 400;

              position4 = position3.clone();
              position4.x += 100 - ( ( l- i)  * 10);
              position4.y += 100 - ( ( l- i)  * 10 );

              position5 = position4.clone();
              position5.x += 550 + ( i* 10 );

              position6 = position5.clone();
              position6.y = 500 + ( i * 10 );
              position6.x += 50;

              position7 = position6.clone();
              position7.x = 500;

              
              position8 = position7.clone();
              position8.y = 450;
              position8.x += 50 + ( i * 10 );


              

              endPosition = song.position.clone();

              position10 = endPosition.clone();
              position10.y += 200;
              position10.z = 100;
              position10.x += 200;

              position9 = position10.clone();
              position9.x = 700;

              /*position6 = position5.clone();
              position6.x += 50 + ( (i) * s2 * 10 );
              position6.y = 200;*/




              var dif = leftPosition.clone().sub( song.position );

              var points = [

                //song.position.clone(),
                endPosition , 
                position10 ,
                position9 ,
                position8 ,
                position7 ,
                position6 ,
                position5 , 
                position4 , 
                position3 , 
                position2 , 
                position1 
                /*dif.clone().add( dif.clone().multiplyScalar( .3 ) ),
                dif.clone().add( dif.clone().multiplyScalar( .4 ) ),
                dif.clone().add( dif.clone().multiplyScalar( .5 ) ),
                dif.clone().add( dif.clone().multiplyScalar( .6 ) ),*/

                //leftPosition.clone()


              ]
              


              //song.titleMesh.position.y += 200;
              
              songObject.add( song.titleMesh );

              song.growBar = new GrowBar( points );

              //song.growBar.object.position = song.position;

              songObject.add( song.growBar.object );

              
  
              songObject.add( song );
              songObjects.push( song );
              //songObjects.push( song.titleMesh );

            }


            scene.add( songObject );

          }



function hoverOver(){

  if( !this.active ){
    this.material = hoverOverMaterial;
    this.growBar.material.opacity = 1;
    this.titleMesh.material.opacity = 1;
  }
  this.note.play();

}


function hoverOut(){

  if(!this.active ){
    this.material = hoverOutMaterial;
    this.growBar.material.opacity = .3;
    this.titleMesh.material.opacity = .3;
  }
 // this.note.play();

}

function activate(){

  this.active = true;
  this.material = clickMaterial;

  if( lightDir > 0 ){
    lightDir *= -1;
  }

  controls.z = 2500;
 
  for( var i = 0; i < songObjects.length; i++ ){

    if( songObjects[i] != this ){
      if( songObjects[i].active );
        songObjects[i].deactivate();
    }
  }

  if( !this.track.playing ){

    console.log( this.track );
    this.track.play();

  }

  var v = new THREE.Vector3(
      this.params[4][0] ,
      this.params[4][1] ,
      this.params[4][2] 
  );

  pointLight.color = new THREE.Color( v.x , v.y , v.z );
  MusicObject.material.uniforms.Color.value.fromArray(this.params[4] );
  MusicObject.material.uniforms.NoiseSize.value  = this.params[5];
  MusicObject.material.uniforms.NoisePower.value = this.params[6];
  MusicObject.material.uniforms.NoiseSpeed.value = this.params[7];
  MusicObject.material.uniforms.AudioPower.value = this.params[8];
  /*[ 1.3 , .2 , .5   ],        // color
          .6,                         // NoiseSize
          .5,                         // NoisePower
          .2,                         // NoiseSpeed
          .3,                         // AudioPower
          */

  console.log('SS');


}

function deactivate(){

  this.active = false;
  this.material = hoverOverMaterial;
  this.titleMesh.material.opacity = .2;
  this.growBar.material.opacity = .2;

  if( this.track.playing )
    this.track.stop();

  var anyActive = false;

  for( var i = 0; i < songObjects.length; i++ ){

    if( songObjects[i].active ) anyActive = true;

  }

  //console.log( anyActive );
  if( !anyActive ){

    if( lightDir < 0 )
      lightDir *= -1;

     controls.z = 3500;

  }


}
