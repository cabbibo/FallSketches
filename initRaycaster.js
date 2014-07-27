function initRaycaster(){


  renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
  renderer.domElement.addEventListener( 'click', onClick, false );
  projector = new THREE.Projector();

  
  RAYCASTER_OBJECTS = [];
  for( var i = 0; i < songObjects.length; i++ ){

    console.log('hellos');
    RAYCASTER_OBJECTS.push( songObjects[i]);
    RAYCASTER_OBJECTS.push( songObjects[i].titleMesh );
   
  }

  raycaster = new THREE.Raycaster();
  
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

  raycaster.set( camera.position , vector.sub( camera.position ).normalize() );

  var objects = [];
  /*for( var i = 0; i < SONGS.length; i++ ){

    objects.push( SONGS[i].toMesh );
    objects.push( SONGS[i].mesh );
    objects.push( SONGS[i].titleMesh );

  }*/

  var objects = [];




  var intersects = raycaster.intersectObjects( RAYCASTER_OBJECTS , true );



  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

    
      if ( INTERSECTED ){

        INTERSECTED.hoverOut();
        //INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
        
      }

      INTERSECTED = intersects[ 0 ].object;

      INTERSECTED.hoverOver();

      //container.style.cursor = 'pointer';

    }

  } else {

    if ( INTERSECTED ) {

      INTERSECTED.hoverOut();
  
    }

    INTERSECTED = null;

    //container.style.cursor = 'auto';


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

