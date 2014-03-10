

var vertexShader = [

  "uniform vec3 Color;",
  "uniform sampler2D AudioTexture;",

  "varying vec2 vUv;",
  "varying float vDisplacement;",
  "varying vec3 vPos;",

  "void main(){",

    "vUv = uv;",
    "vec2 sample = vec2( uv.y , 0.0 );",
    "vec4 a = texture2D( AudioTexture , sample );",
    "vPos = position;",

    "vDisplacement = a.r;",
    "vec3 pos = position * vDisplacement;",
    "vec4 mvPosition = modelViewMatrix * vec4( pos , 1.0 );",
    "gl_Position = projectionMatrix * mvPosition;",

  "}"

].join("\n");


var fragmentShader = [

  "uniform vec3 Color;",
  "uniform sampler2D AudioTexture;",

  "varying vec2 vUv;",
  "varying float vDisplacement;",
  "varying vec3 vPos;",

  "void main(){",
    "vec2 sample = vec2( vUv.x , 0.0 );",
    "vec4 a = texture2D( AudioTexture , sample );",

    "gl_FragColor = vec4( a.xyz * Color.xyz , a.w * 2. );",

  "}"


].join("\n");




function initMusicObject(){

  console.log( 'CENTER OBJECT' );

  var color = new THREE.Vector3( .3 , .3 , .9 );
  var uniforms = {

    AudioTexture: { type:"t" , value:audioController.texture },
    Color:        { type:"v3", value:color                   }

  }

  var material = new THREE.ShaderMaterial({

    uniforms: uniforms,
    fragmentShader: fragmentShader,
    vertexShader:   vertexShader,
    blending: THREE.AdditiveBlending,
    transparent: true

  });


  var s = 300
  var geometry = new THREE.CubeGeometry( s , s , s , 50 , 50 , 50 );
  var geometry = new THREE.IcosahedronGeometry( s , 6 );

 /* var material = new THREE.MeshBasicMaterial({
    map: audioController.texture 
  });*/

  MusicObject = new THREE.Mesh( geometry , material );

  MusicObject.position.z = 300;
  MusicObject.position.x = 50;

  MusicObject.rotation.x = Math.PI / 4;
  MusicObject.rotation.y = Math.PI / 4;
  MusicObject.rotation.z = Math.PI / 4;
  MusicObject.update = MusicObjectUpdate.bind( MusicObject );
  scene.add( MusicObject );

 // loader.load


}

function MusicObjectUpdate(){



}
