function initRaycaster(){


  renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
  renderer.domElement.addEventListener( 'click', onClick, false );
  projector = new THREE.Projector();
/*
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
            });*/





}

function onDocumentMouseMove( event ) {

  event.preventDefault();


  var pos = [
    event.clientX,
    event.clientY - MARGIN,
  ];

  width = [
    window.innerWidth,
    window.innerHeight - MARGIN*2
  ];

  mouse.x =   ( pos[0] / width[0] ) * 2 - 1;
  mouse.y = - ( pos[1] / width[1] ) * 2 + 1;


  //

  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
  projector.unprojectVector( vector, camera );

  var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

  var objects = songObjects;

  var intersects = raycaster.intersectObjects( objects , true );



  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

    
      if ( INTERSECTED ){

        console.log('SHSHS');
        INTERSECTED.hoverOut();
        //INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        
      }

      INTERSECTED = intersects[ 0 ].object;

      INTERSECTED.hoverOver();

      container.style.cursor = 'pointer';

    }

  } else {

    if ( INTERSECTED ) {

      INTERSECTED.hoverOut();
  
    }

    INTERSECTED = null;

    container.style.cursor = 'auto';


  }
 

}



function onClick( event ){

  if( INTERSECTED ){

    if( INTERSECTED.active ){

      INTERSECTED.deactivate();

    }else{

      INTERSECTED.activate();
     
    }

  }

}


function ACTIVATE( mesh ){

  console.log( 'TSSSS');
  console.log( mesh );

  mesh.titleMesh.material.opacity = 1.0
  if( !mesh.track.playing )
    mesh.track.play();
  //notes[0].play();


}

function UNACTIVATE( mesh ){

  mesh.titleMesh.material.opacity = .2

  console.log( mesh.track );
  if( mesh.track.playing )
    mesh.track.stop();


}

