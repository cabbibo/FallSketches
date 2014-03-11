function initScene(){

  time = 0;
  container = document.getElementById( 'container' );
  //container.style.border = '1px  solid  white';

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
  controls.z = 3000;
  controls.y = 300;


  // SCENE (FINAL)

  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0x000000, 4000, 5000 );

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
                /*renderer.domElement.style.borderTop = '1px  solid  white';
                renderer.domElement.style.borderBottom = '1px  solid  white';*/

                renderer.domElement.id = 'RENDERER';

				container.appendChild( renderer.domElement );

				//

				renderer.gammaInput = true;
				renderer.gammaOutput = true;


				// STATS

				stats = new Stats();
				//container.appendChild( stats.domElement );

				// EVENTS

				onWindowResize();

				window.addEventListener( 'resize', onWindowResize, false );

				document.addEventListener( 'keydown', onKeyDown, false );



}
