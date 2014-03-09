

var points = [

  new THREE.Vector3( 0 , 0 , 0) ,
  new THREE.Vector3( 100 , 0 , 0) ,
  new THREE.Vector3( 200 , 100 , 0) ,
  new THREE.Vector3( 300 , -100 , 0) ,



]


var LineMaterial = new THREE.LineBasicMaterial({
  color: 0x4d4dff,
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 1,
  linewidth: 3
});

function GrowBar( points ){

  this.object = new THREE.Object3D();

  this.segments = [];

  var lineGeo = new THREE.Geometry();

  for( var i = 0; i < points.length; i++ ){
    lineGeo.vertices.push( points[i] );
    
    
    lineGeo.target = points[i];


    var line = new THREE.Line( lineGeo , LineMaterial );

    this.object.add( line );
    this.segments.push( line );

  }

  var line = new THREE.Line( lineGeo , LineMaterial );

  this.object.add( line );
  this.segments.push( line );



}

/*GrowBar.prototype.update = function(){

  var s = this.segments

  for( var i = 0; i < s.length; i++ ){

    var geo = s[i].geometry;

   
    var vert = geo.vertices[1];
    var target = geo.target;

    var dif = target.clone().sub( vert );

    //vert.add( dif.multiplyScalar( .3 ) );
    //
    vert.x += 1;

    s[i].geometryNeedsUpdate = true;




  }


}*/
