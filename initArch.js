function initArch(){
  
  var loader = new THREE.OBJLoader();
  loader.load( "arch.obj" , function( geometry ){

    var geo = geometry.children[0].geometry;

    assignUVs( geo );

    geo.computeVertexNormals();
    geo.computeVertexNormals();
    geo.normalsNeedUpdate = true;
    
    var material = new THREE.MeshPhongMaterial({
      color:0xaa0022,
      specular:0xee0033,
      ambient: 0x000000,
      map: detailTexture,
      shading: THREE.SmoothShading
      
    });

    //var material = new THREE.MeshNormalMaterial();
    arch = new THREE.Mesh( geo , material );

    var scale = 100;


    arch.scale.multiplyScalar( ( scale / 100 ) * 500 );

  
    //arch.
    //arch.rotation.x = Math.PI / 1.2;
    arch.rotation.y = Math.PI;
    arch.rotation.z = Math.PI/3;

    arch.position.x = 000;
    arch.position.z = 200;
    arch.position.y = 100;

    var linkObj = new THREE.Object3D();
    linkObj.position = arch.position;
    scene.add( linkObj );

    initSongs( arch.position , scale );
    scene.add( arch );

  });



}

function randomRotation( rotation ){


  rotation.x = Math.random() * Math.PI * 2;
  rotation.y = Math.random() * Math.PI * 2;
  rotation.z = Math.random() * Math.PI * 2;

  return rotation;

}
