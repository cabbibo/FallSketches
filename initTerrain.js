function initTerrain(){


// HEIGHT + NORMAL MAPS

				var normalShader = THREE.NormalMapShader;

				var rx = 256, ry = 256;
				var pars = { minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat };

				heightMap  = new THREE.WebGLRenderTarget( rx, ry, pars );
				normalMap = new THREE.WebGLRenderTarget( rx, ry, pars );

				uniformsNoise = {

					time:   { type: "f", value: 1.0 },
					scale:  { type: "v2", value: new THREE.Vector2( 1.5, 1.5 ) },
					offset: { type: "v2", value: new THREE.Vector2( 0, 0 ) }

				};

                console.log( THREE.NormalMapShader);
				uniformsNormal = THREE.UniformsUtils.clone( normalShader.uniforms );

				uniformsNormal.height.value = 0.05;
				uniformsNormal.resolution.value.set( rx, ry );
				uniformsNormal.heightMap.value = heightMap;

				var vertexShader = vertShader1;

				// TEXTURES

				var specularMap = new THREE.WebGLRenderTarget( 256 , 256, pars );

				diffuseTexture1 = THREE.ImageUtils.loadTexture( "textures/terrain/grasslight-big.jpg", null, function () {

				    loader.loadBarAdd();	loadTextures();	
					applyShader( THREE.LuminosityShader, diffuseTexture1, specularMap );

				} );

				diffuseTexture2 = THREE.ImageUtils.loadTexture( "textures/terrain/backgrounddetailed6.jpg", null, function(){loader.loadBarAdd();	loadTextures();	});
				detailTexture = THREE.ImageUtils.loadTexture( "textures/terrain/grasslight-big-nm.jpg", null,function(){ loader.loadBarAdd();	loadTextures(); } );
				//detailTexture = THREE.ImageUtils.loadTexture( "textures/moon_1024.jpg", null, loadTextures );

				diffuseTexture1.wrapS = diffuseTexture1.wrapT = THREE.RepeatWrapping;
				diffuseTexture2.wrapS = diffuseTexture2.wrapT = THREE.RepeatWrapping;
				detailTexture.wrapS = detailTexture.wrapT = THREE.RepeatWrapping;
				specularMap.wrapS = specularMap.wrapT = THREE.RepeatWrapping;

				// TERRAIN SHADER

				var terrainShader = THREE.ShaderTerrain[ "terrain" ];

				uniformsTerrain = THREE.UniformsUtils.clone( terrainShader.uniforms );

				uniformsTerrain[ "tNormal" ].value = normalMap;
				uniformsTerrain[ "uNormalScale" ].value = 3.5;

				uniformsTerrain[ "tDisplacement" ].value = heightMap;

				uniformsTerrain[ "tDiffuse1" ].value = diffuseTexture1;
				uniformsTerrain[ "tDiffuse2" ].value = diffuseTexture2;
				uniformsTerrain[ "tSpecular" ].value = specularMap;
				uniformsTerrain[ "tDetail" ].value = detailTexture;

				uniformsTerrain[ "enableDiffuse1" ].value = true;
				uniformsTerrain[ "enableDiffuse2" ].value = true;
				uniformsTerrain[ "enableSpecular" ].value = true;

				uniformsTerrain[ "diffuse" ].value.setHex( 0xff00ff );
				uniformsTerrain[ "specular" ].value.setHex( 0xffccff );
				uniformsTerrain[ "ambient" ].value.setHex( 0xaacc01 );

				uniformsTerrain[ "shininess" ].value = 1;

				uniformsTerrain[ "uDisplacementScale" ].value = 375;

				uniformsTerrain[ "uRepeatOverlay" ].value.set( 6, 6 );

				var params = [
								[ 'heightmap', 	fragShader1, 	vertexShader, uniformsNoise, false ],
								[ 'normal', 	normalShader.fragmentShader,  normalShader.vertexShader, uniformsNormal, false ],
								[ 'terrain', 	terrainShader.fragmentShader, terrainShader.vertexShader, uniformsTerrain, true ]
							 ];

				for( var i = 0; i < params.length; i ++ ) {

					material = new THREE.ShaderMaterial( {

						uniforms: 		params[ i ][ 3 ],
						vertexShader: 	params[ i ][ 2 ],
						fragmentShader: params[ i ][ 1 ],
						lights: 		params[ i ][ 4 ],
						fog: 			true
						} );

					mlib[ params[ i ][ 0 ] ] = material;

				}


				var plane = new THREE.PlaneGeometry( SCREEN_WIDTH, SCREEN_HEIGHT );

				quadTarget = new THREE.Mesh( plane, new THREE.MeshBasicMaterial( { color: 0x000000 } ) );
				quadTarget.position.z = -10;
				sceneRenderTarget.add( quadTarget );

				// TERRAIN MESH

				var geometryTerrain = new THREE.PlaneGeometry( 10000, 6000, 50 , 50 );

				geometryTerrain.computeFaceNormals();
				geometryTerrain.computeVertexNormals();
				geometryTerrain.computeTangents();

				terrain = new THREE.Mesh( geometryTerrain, mlib[ "terrain" ] );
				terrain.position.set( 0, -500, 0 );
                terrain.rotation.x = -Math.PI / 2;
				terrain.visible = false;
                scene.add( terrain );



}
