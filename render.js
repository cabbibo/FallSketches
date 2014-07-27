var TIME = 0;
var frame = 0;

function render() {

                //animateRig( handMesh );
      
        /*for( var i = 0; i < songObjects.length; i++ ){

          //console.log( songObjects[i] );
          songObjects[i].growBar.update();

        }*/

     audioController.update();
      //MusicObject.update();
                var delta = clock.getDelta();

                controls.update();
                TIME += delta;
				soundVal = THREE.Math.clamp( soundVal + delta * soundDir, 0, 1 );

        		if ( soundVal !== oldSoundVal ) {

					if ( soundtrack ) {

						soundtrack.volume = soundVal;
						oldSoundVal = soundVal;

					}

				}

				if ( terrain.visible ) {

					controls.update();

					time = Date.now() * 0.001;

                    	//if ( frame <= 20 ) {

					var fLow = 0.1, fHigh = 0.8;

					lightVal = THREE.Math.clamp( lightVal + 0.5 * delta * lightDir, fLow, fHigh );

					var valNorm = ( lightVal - fLow ) / ( fHigh - fLow );

					//scene.fog.color.setHSL( 0.1, 0.5, lightVal );

					//renderer.setClearColor( scene.fog.color, 1 );

					directionalLight.intensity = THREE.Math.mapLinear( valNorm, 0, 1, 0.1, 1.15 );
					pointLight.intensity = THREE.Math.mapLinear( valNorm, 0, 1, 0.9, 1.5 );
					uniformsTerrain[ "uNormalScale" ].value = THREE.Math.mapLinear( valNorm, 0, 1, 0.1, 3.5 );


                    if ( frame <= 20 ) {

                      console.log('FRNAMS');
						animDelta = THREE.Math.clamp( animDelta + 0.00075 * animDeltaDir, 0, 0.05 );
						uniformsNoise[ "time" ].value += delta * animDelta;

						//uniformsNoise[ "offset" ].value.x += delta * 0.05;

						uniformsTerrain[ "uOffset" ].value.x = 4 * uniformsNoise[ "offset" ].value.x;

						quadTarget.material = mlib[ "heightmap" ];
						renderer.render( sceneRenderTarget, cameraOrtho, heightMap, true );

						quadTarget.material = mlib[ "normal" ];
						renderer.render( sceneRenderTarget, cameraOrtho, normalMap, true );

						//updateNoise = false;

					}else{
                    // scene.remove(terrain ); //terrain.visable = false;
                    }

                    frame ++;

                  }
		
//}
					renderer.render( scene, camera );
					//composer.render( 0.1 );


			}

