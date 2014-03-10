          

          var songs = [
        
            [ 
              "Dark Matter" , 
              "audio/darkMatter.mp3"  ,   
              '/audio/notes/1.mp3'  , 
              [ 5 , -3.5 , 4.5  ] 
            ],
            [ 
              "Moon"                , 
              "/audio/moon.mp3"     , 
              '/audio/notes/2.mp3'  ,   
              [ 4 , -2 , 4.5  ] 
            ],

            [ 
              "Crystalline" , 
              "audio/crystalline.mp3" ,
              '/audio/notes/3.mp3'  , 
              [ 3.5 , -.5 , 4.5  ] 
            ],

            [ 
              "Cosmonogy"   , 
              "audio/cosmonogy.mp3"   ,   
              '/audio/notes/4.mp3'  , 
              [ 3 , 1.3 , 4.3   ] 
            ],

            [ 
              "Thunderbolt" ,
              "audio/thunderbolt.mp3" ,  
              '/audio/notes/5.mp3'  , 
              [ 1 , 2 , 4.5   ] 
            ],

          ];

           var songObjects = [];
          var songObject;

          
  noiseTexture = THREE.ImageUtils.loadTexture( "textures/water.jpg");
  noiseNormals = THREE.ImageUtils.loadTexture( "textures/waterNormals.jpg");

  var mapHeight = THREE.ImageUtils.loadTexture( "textures/water.jpg");
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

              song.title = s[0];
              song.track = new Audio( s[1] , audioController , false );
              song.note  = new Audio( s[2] , audioController , false );

              song.note.gain.gain.value = .1;

              song.position = new THREE.Vector3( s[3][0] , s[3][1] , s[3][2] );
              song.position.multiplyScalar( scale );

              song.titleMesh = textCreator.createMesh( song.title );

 
              console.log( song.titleMesh.scaledWidth );

              var w = song.titleMesh.scaledWidth;
              var offset = w * scale / 2;                                 
              song.titleMesh.position.x = -500 - offset ;
              song.titleMesh.position.z = 600;
              song.titleMesh.position.y = ( i - 2.5 ) * 100 - 100;

              song.hoverOver = hoverOver.bind( song );
              song.hoverOut = hoverOut.bind( song );


              //var lefPosition = new THREE.
              var leftPosition  = song.titleMesh.position.clone();
              leftPosition.x += offset;

              var s2 = Math.pow( 2 , .5 );

              position1 = leftPosition.clone();
              
              position2 = position1.clone();
              position2.x += 10 +( ( l- i)  * 10);

              position3 = position2.clone();
              position3.y = 200;

              position4 = position3.clone();
              position4.x += 100 - ( ( l- i)  * 10);
              position4.y += 100 - ( ( l- i)  * 10 );

              position5 = position4.clone();
              position5.x += 400 + ( i* 10 );

              position6 = position5.clone();
              position6.y = 300 + ( i * 10 );
              position6.x += 50;

              position7 = position6.clone();
              position7.x = 500;

              position8 = position7.clone();
              position8.y = 250;
              position8.x += 50 + ( i * 10 );


              endPosition = song.position.clone();

              position9 = position8.clone();
              position9.y = endPosition.y;

              /*position6 = position5.clone();
              position6.x += 50 + ( (i) * s2 * 10 );
              position6.y = 200;*/




              var dif = leftPosition.clone().sub( song.position );

              var points = [

                //song.position.clone(),
                endPosition , 
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
              


              console.log( song.titleMesh.position );
              //song.titleMesh.position.y += 200;
              
              songObject.add( song.titleMesh );

              song.growBar = new GrowBar( points );

              //song.growBar.object.position = song.position;

              songObject.add( song.growBar.object );

              
  
              songObject.add( song );
              songObjects.push( song );

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
