function initArch(){
  
  var loader = new THREE.OBJLoader();
  loader.load( "arch.obj" , function( geometry ){

    var geo = geometry.children[0].geometry;

    assignUVs( geo );
    
    var material = new THREE.MeshPhongMaterial({
      color:0xaa0022,
      specular:0xee0033,
      ambient: 0x000000,
      map: detailTexture
      
    });

    //var material = new THREE.MeshNormalMaterial();

    var arch = new THREE.Mesh( geo , material );

    var scale = 100;


    arch.scale.multiplyScalar( ( scale / 100 ) * .005 );

    arch.rotation.x = Math.PI / 1.2;
    arch.rotation.z = -.3;
    arch.position.x = 000;
    arch.position.z = 00;
    arch.position.y = 200;

    var linkObj = new THREE.Object3D();
    linkObj.position = arch.position;
    scene.add( linkObj );

    initSongs( arch.position , scale );
    scene.add( arch );

  });



}
