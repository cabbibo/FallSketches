

var noise3D = [
      'vec3 mod289(vec3 x) {',
          '\treturn x - floor(x * (1.0 / 289.0)) * 289.0;',
      '}',
      '',
      'vec4 mod289(vec4 x) {',
          '\treturn x - floor(x * (1.0 / 289.0)) * 289.0;',
      '}',
      '',
      'vec4 permute(vec4 x) {',
          '\treturn mod289(((x*34.0)+1.0)*x);',
      '}',
      '',
      'vec4 taylorInvSqrt(vec4 r)',
      '{',
          '\treturn 1.79284291400159 - 0.85373472095314 * r;',
      '}',
      '',
      'float snoise3(vec3 v)',
      '{',
          '\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0);',
          '\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);',
          '',
          '\tvec3 i = floor(v + dot(v, C.yyy));',
          '\tvec3 x0 = v - i + dot(i, C.xxx);',
          '',
          '\tvec3 g = step(x0.yzx, x0.xyz);',
          '\tvec3 l = 1.0 - g;',
          '\tvec3 i1 = min( g.xyz, l.zxy );',
          '\tvec3 i2 = max( g.xyz, l.zxy );',
          '',
          '\tvec3 x1 = x0 - i1 + C.xxx;',
          '\tvec3 x2 = x0 - i2 + C.yyy;',
          '\tvec3 x3 = x0 - D.yyy;',
          '',
          '\ti = mod289(i);', 
          '\tvec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));',
          '',
          '\tfloat n_ = 0.142857142857;',
          '\tvec3  ns = n_ * D.wyz - D.xzx;',
          '',
          '\tvec4 j = p - 49.0 * floor(p * ns.z * ns.z);',
          '',
          '\tvec4 x_ = floor(j * ns.z);',
          '\tvec4 y_ = floor(j - 7.0 * x_ );',
          '',
          '\tvec4 x = x_ *ns.x + ns.yyyy;',
          '\tvec4 y = y_ *ns.x + ns.yyyy;',
          '\tvec4 h = 1.0 - abs(x) - abs(y);',
          '',
          '\tvec4 b0 = vec4( x.xy, y.xy );',
          '\tvec4 b1 = vec4( x.zw, y.zw );',
          '',
          '\tvec4 s0 = floor(b0)*2.0 + 1.0;',
          '\tvec4 s1 = floor(b1)*2.0 + 1.0;',
          '\tvec4 sh = -step(h, vec4(0.0));',
          '',
          '\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;',
          '\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;',
          '',
          '\tvec3 p0 = vec3(a0.xy,h.x);',
          '\tvec3 p1 = vec3(a0.zw,h.y);',
          '\tvec3 p2 = vec3(a1.xy,h.z);',
          '\tvec3 p3 = vec3(a1.zw,h.w);',
          '',
          '\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));',
          '\tp0 *= norm.x;',
          '\tp1 *= norm.y;',
          '\tp2 *= norm.z;',
          '\tp3 *= norm.w;',
          '',
          '\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);',
          '\tm = m * m;',
          '\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));',
      '}'
].join("\n");

var vertexShader = [

  "uniform vec3 Color;",
  "uniform sampler2D AudioTexture;",

  "uniform float Time;",
  "uniform float NoisePower;",
  "uniform float AudioPower;",
  "uniform float NoiseSize;",
  "uniform float NoiseSpeed;",

  "varying vec2 vUv;",
  "varying float vDisplacement;",
  "varying vec3 vPos;",



  noise3D,
  "void main(){",

    "vUv = uv;",
    "vec2 sample = vec2( uv.y , 0.0 );",
    "vec4 a = texture2D( AudioTexture , sample );",
    "vPos = position;",

    "vec3 offset;",

    "vec3 nPos = normalize( position );",

    "offset.x = nPos.x + cos( 1. * Time * NoiseSpeed );",
    "offset.y = nPos.y + sin( 1. * Time * NoiseSpeed );",
    "offset.z = nPos.z;", //+ tan( time / 100.0 );",
    "offset *= NoiseSize;",

    "float dNoise = snoise3( offset );",
    "vDisplacement = .5 + ( dNoise * NoisePower ) + ( a.a * AudioPower );",
    "vec3 pos = position * vDisplacement;",
    "vec4 mvPosition = modelViewMatrix * vec4( pos , 1.0 );",
    "gl_Position = projectionMatrix * mvPosition;",

  "}"

].join("\n");


var fragmentShader = [

  "uniform vec3 Color;",
  "uniform sampler2D AudioTexture;",

  "uniform float Time;",
  "uniform float NoisePower;",
  "uniform float AudioPower;",
  "uniform float NoiseSize;",
  "uniform float NoiseSpeed;",


  "varying vec2 vUv;",
  "varying float vDisplacement;",
  "varying vec3 vPos;",

  "void main(){",
    "vec2 sample = vec2( vUv.y , 0.0 );",
    "vec4 a = texture2D( AudioTexture , sample );",

    "vec3 c = Color + a.xyz;",
    "c *= 2. * vDisplacement - 1.2 ;",
    "gl_FragColor = vec4( c  , 1.0);",

  "}"


].join("\n");




function initMusicObject(){


  var color = new THREE.Vector3( 1.9 , .9 , .3 );

  //TIME = 0;

  var uniforms = {

    AudioTexture: { type:"t" , value:audioController.texture },
    Color:        { type:"v3", value:color                   },
    NoisePower:   { type:"f", value:.4                  },
    AudioPower:   { type:"f", value:.4                   },
    NoiseSize:   { type:"f", value:.4                  },
    NoiseSpeed:   { type:"f", value:.4                  },
    Time:   { type:"f", value:TIME              }

  }

  var material = new THREE.ShaderMaterial({

    uniforms: uniforms,
    fragmentShader: fragmentShader,
    vertexShader:   vertexShader,
    blending: THREE.AdditiveBlending,
    //transparent: true,
    //depthWrite: false

  });


  var s = 200
  //var geometry = new THREE.CubeGeometry( s , s , s , 100 , 100 , 100 );
  var geometry = new THREE.IcosahedronGeometry( s , 6 );

 /* var material = new THREE.MeshBasicMaterial({
    map: audioController.texture 
  });*/

  MusicObject = new THREE.Mesh( geometry , material );

  MusicObject.position.z = 300;
  MusicObject.position.x = 0;
  MusicObject.position.y = 50;

  MusicObject.rotation.x = Math.PI / 4;
  MusicObject.rotation.y = Math.PI / 4;
  MusicObject.rotation.z = Math.PI / 4;
  MusicObject.update = MusicObjectUpdate.bind( MusicObject );
  scene.add( MusicObject );

 // loader.load


}

function MusicObjectUpdate(){

  //TIME += clock.getDelta();
  this.material.uniforms.Time.value = TIME;

  this.rotation.y += .001;
  this.rotation.x += .0014;
  this.rotation.z += .0024;

}
