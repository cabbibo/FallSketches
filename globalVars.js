if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

			var MARGIN = 60;

			var SCREEN_WIDTH = window.innerWidth;
			var SCREEN_HEIGHT = window.innerHeight - 2 * MARGIN;

			var renderer, container, stats;

			var camera, scene;
			var cameraOrtho, sceneRenderTarget;

			var uniformsNoise, uniformsNormal,
				heightMap, normalMap,
				quadTarget;

			var directionalLight, pointLight;

			var terrain;

			var textureCounter = 0;

			var animDelta = 0, animDeltaDir = -1;
			var lightVal = 0, lightDir = 1;
			var soundVal = 0, oldSoundVal = 0, soundDir = 1;

			var clock = new THREE.Clock();

			var morph, morphs = [];

			var updateNoise = true;

			var animateTerrain = false;

            var textMesh1;

            var handMesh;

			var mlib = {};
