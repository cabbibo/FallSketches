          

          var songs = [
        
            [ 
              "Dark Matter" , 
              "audio/darkMatter.mp3"  ,   
              '/audio/notes/2.mp3'  , 
              [ 5 , -3.5 , 4.5  ] 
            ],
            [ 
              "Moon"                , 
              "/audio/moon.mp3"     , 
              '/audio/notes/1.mp3'  ,   
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
              '/audio/notes/2.mp3'  , 
              [ 3 , 1.3 , 4.3   ] 
            ],

            [ 
              "Thunderbolt" ,
              "audio/thunderbolt.mp3" ,  
              '/audio/notes/2.mp3'  , 
              [ 1 , 2 , 4.5   ] 
            ],

          ];

           var songObjects = [];
          var songObject;

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
              song.track = new Audio( s[1] , controller , false );
              song.note  = new Audio( s[2] , controller , false );

              song.position = new THREE.Vector3( s[3][0] , s[3][1] , s[3][2] );
              song.position.multiplyScalar( scale );

              song.titleMesh = textCreator.createMesh( song.title );

 
              console.log( song.titleMesh.scaledWidth );

              var w = song.titleMesh.scaledWidth;
              var offset = w * scale / 2;                                 
              song.titleMesh.position.x = 700+ offset ;
              song.titleMesh.position.z = 600;
              song.titleMesh.position.y = ( i - 2.5 ) * 100;

              var leftPosition  = song.titleMesh.position.clone();
              leftPosition.x -= offset;

              var dif = leftPosition.clone().sub( song.position );

              var points = [

                song.position.clone(),
                /*dif.clone().add( dif.clone().multiplyScalar( .3 ) ),
                dif.clone().add( dif.clone().multiplyScalar( .4 ) ),
                dif.clone().add( dif.clone().multiplyScalar( .5 ) ),
                dif.clone().add( dif.clone().multiplyScalar( .6 ) ),*/

                leftPosition.clone()


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


