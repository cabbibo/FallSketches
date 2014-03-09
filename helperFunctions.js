	//

			function onWindowResize( event ) {

				SCREEN_WIDTH = window.innerWidth;
				SCREEN_HEIGHT = window.innerHeight - 2 * MARGIN;

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

        

			}

			//

			function onKeyDown ( event ) {

				switch( event.keyCode ) {

					case 78: /*N*/  lightDir *= -1; break;
					case 77: /*M*/  animDeltaDir *= -1; break;
					case 66: /*B*/  soundDir *= -1; break;

				}

			};

			//
            function assignUVs( geometry ){

              geometry.computeBoundingBox();

              var max     = geometry.boundingBox.max;
              var min     = geometry.boundingBox.min;

              var offset  = new THREE.Vector2(0 - min.x, 0 - min.y);
              var range   = new THREE.Vector2(max.x - min.x, max.y - min.y);

              geometry.faceVertexUvs[0] = [];
              var faces = geometry.faces;

              for (i = 0; i < geometry.faces.length ; i++) {

                var v1 = geometry.vertices[faces[i].a];
                var v2 = geometry.vertices[faces[i].b];
                var v3 = geometry.vertices[faces[i].c];

                geometry.faceVertexUvs[0].push([
                  new THREE.Vector2( ( v1.x + offset.x ) / range.x , ( v1.y + offset.y ) / range.y ),
                  new THREE.Vector2( ( v2.x + offset.x ) / range.x , ( v2.y + offset.y ) / range.y ),
                  new THREE.Vector2( ( v3.x + offset.x ) / range.x , ( v3.y + offset.y ) / range.y )
                ]);

              }

              geometry.uvsNeedUpdate = true;

            }

			function applyShader( shader, texture, target ) {

				var shaderMaterial = new THREE.ShaderMaterial( {

					fragmentShader: shader.fragmentShader,
					vertexShader: shader.vertexShader,
					uniforms: THREE.UniformsUtils.clone( shader.uniforms )

				} );

				shaderMaterial.uniforms[ "tDiffuse" ].value = texture;

				var sceneTmp = new THREE.Scene();

				var meshTmp = new THREE.Mesh( new THREE.PlaneGeometry( SCREEN_WIDTH, SCREEN_HEIGHT ), shaderMaterial );
				meshTmp.position.z = -500;

				sceneTmp.add( meshTmp );

				renderer.render( sceneTmp, cameraOrtho, target, true );

			};

			//

			function loadTextures() {

				textureCounter += 1;

				if ( textureCounter == 3 )	{

					terrain.visible = true;

				}

			}

            //


            function animateRig( mesh ){

              var bones = mesh.geometry.bones;

              for( var i = 0; i < bones.length; i++ ){

                bones[i].rotq[0] += .01;


              }

    
            }

		

