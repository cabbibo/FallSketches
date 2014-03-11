var TIME = 0;	

function render() {

                //animateRig( handMesh );
      
        /*for( var i = 0; i < songObjects.length; i++ ){

          //console.log( songObjects[i] );
          songObjects[i].growBar.update();

        }*/

      audioController.update();
      MusicObject.update();
                var delta = clock.getDelta();

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

					var fLow = 0.1, fHigh = 0.8;

					lightVal = THREE.Math.clamp( lightVal + 0.5 * delta * lightDir, fLow, fHigh );

					var valNorm = ( lightVal - fLow ) / ( fHigh - fLow );

					//scene.fog.color.setHSL( 0.1, 0.5, lightVal );

					renderer.setClearColor( scene.fog.color, 1 );

					directionalLight.intensity = THREE.Math.mapLinear( valNorm, 0, 1, 0.1, 1.15 );
					pointLight.intensity = THREE.Math.mapLinear( valNorm, 0, 1, 0.9, 1.5 );

					uniformsTerrain[ "uNormalScale" ].value = THREE.Math.mapLinear( valNorm, 0, 1, 0.1, 3.5 );

					if ( updateNoise ) {

						animDelta = THREE.Math.clamp( animDelta + 0.00075 * animDeltaDir, 0, 0.05 );
						uniformsNoise[ "time" ].value += delta * animDelta;

						//uniformsNoise[ "offset" ].value.x += delta * 0.05;

						uniformsTerrain[ "uOffset" ].value.x = 4 * uniformsNoise[ "offset" ].value.x;

						quadTarget.material = mlib[ "heightmap" ];
						renderer.render( sceneRenderTarget, cameraOrtho, heightMap, true );

						quadTarget.material = mlib[ "normal" ];
						renderer.render( sceneRenderTarget, cameraOrtho, normalMap, true );

						//updateNoise = false;

					}


					for ( var i = 0; i < morphs.length; i ++ ) {

						morph = morphs[ i ];

						morph.updateAnimation( 1000 * delta );

						morph.position.x += morph.speed * delta;

						if ( morph.position.x  > 2000 )  {

							morph.position.x = -1500 - Math.random() * 500;

						}


					}

                    renderer.autoClearColor = true;
                    /*composer.reset();

                    //model.material = depthMaterial;
                    composer.render( scene, camera );
                    composer.toTexture( depthTexture );

                    //model.material = modelMaterial;
                    composer.render( scene, camera );

                                      if( guidedFullBoxBlurPass.isLoaded() ) {
                        guidedFullBoxBlurPass.guidedBoxPass.shader.uniforms.isPacked.value = true;
                        guidedFullBoxBlurPass.guidedBoxPass.shader.uniforms.tBias.value = depthTexture;
                    }
                    
                    composer.pass( vignettePass );
                    composer.pass( multiPassBloomPass );
                    //composer.pass( guidedFullBoxBlurPass );
                    //composer.pass( dirtPass );

                    composer.toScreen();*/

					renderer.render( scene, camera );
					//composer.render( 0.1 );

				}

			}

