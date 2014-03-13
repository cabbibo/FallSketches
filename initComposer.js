function initComposer(){	// COMPOSER
		composer = new WAGNER.Composer( renderer, { useRGBA: false } );

	invertPass = new WAGNER.InvertPass();
	boxBlurPass = new WAGNER.BoxBlurPass();
	fullBoxBlurPass = new WAGNER.FullBoxBlurPass();
	zoomBlurPass = new WAGNER.ZoomBlurPass();
	multiPassBloomPass = new WAGNER.MultiPassBloomPass();
	denoisePass = new WAGNER.DenoisePass();
	sepiaPass = new WAGNER.SepiaPass();
	noisePass = new WAGNER.NoisePass();
	vignettePass = new WAGNER.VignettePass();
	vignette2Pass = new WAGNER.Vignette2Pass();
	CGAPass = new WAGNER.CGAPass();
	//edgeDetectionPass = new WAGNER.EdgeDetectionPass();
	dirtPass = new WAGNER.DirtPass();
	blendPass = new WAGNER.BlendPass();
	guidedFullBoxBlurPass = new WAGNER.GuidedFullBoxBlurPass();
   // SSAOPass = new WAGNER.SSAOPass();

    multiPassBloomPass.params.blurAmount = 20;
    var w = window.innerWidth;
    var h = window.innerHeight - 2 * MARGIN;

    composer.setSize( w * 2 , h * 2 );

    depthTexture = WAGNER.Pass.prototype.getOfflineTexture( w, h );
    normalTexture = WAGNER.Pass.prototype.getOfflineTexture( w, h );
    colorTexture = WAGNER.Pass.prototype.getOfflineTexture( w, h );
	

}

