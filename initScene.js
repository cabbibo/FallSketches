function initScene(){

  container = document.getElementById( 'container' );

  soundtrack = document.getElementById( "soundtrack" );

  // SCENE (RENDER TARGET)

  sceneRenderTarget = new THREE.Scene();

  cameraOrtho = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, -10000, 10000 );
  cameraOrtho.position.z = 100;


  sceneRenderTarget.add( cameraOrtho );

  // CAMERA

  camera = new THREE.PerspectiveCamera( 40, SCREEN_WIDTH / SCREEN_HEIGHT, 2, 8000 );
  camera.position.set( 0 , 800, 1200 );


  controls = new THREE.MouseMoveControls( camera );
  controls.z = 2000;


  // SCENE (FINAL)

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x000000, 20, 40000 );

  // LIGHTS

  scene.add( new THREE.AmbientLight( 0x111155 ) );

  directionalLight = new THREE.DirectionalLight( 0xffffff, .5 );
  directionalLight.position.set( 500, 5000, 0 );
  scene.add( directionalLight );

  pointLight = new THREE.PointLight( 0xffff33, .5 );
  pointLight.position.set( 0, 0, 0 );
  scene.add( pointLight );


  // RENDERER

				renderer = new THREE.WebGLRenderer({antialias:true});
				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
				renderer.setClearColor( scene.fog.color, 1 );

				renderer.domElement.style.position = "absolute";
				renderer.domElement.style.top = MARGIN + "px";
				renderer.domElement.style.left = "0px";

				container.appendChild( renderer.domElement );

				//

				renderer.gammaInput = true;
				renderer.gammaOutput = true;


				// STATS

				stats = new Stats();
				container.appendChild( stats.domElement );

				// EVENTS

				onWindowResize();

				window.addEventListener( 'resize', onWindowResize, false );

				document.addEventListener( 'keydown', onKeyDown, false );



}
