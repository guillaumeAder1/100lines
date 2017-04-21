require(["esri/Map","esri/views/SceneView","esri/layers/GraphicsLayer","esri/Graphic","esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol","dojo/dom","dojo/domReady!","dojo/request/xhr"
], function(Map, SceneView, Graphicslayer, Graphic, Point, SimpleMarkerSymbol, dom, domReady, xhr) {
	
	var layer = new Graphicslayer();
	var map = new Map({
		basemap: "topo",
		layers: [layer]
	});

	var view = new SceneView({
		container: "viewDiv",
		map: map,
		center: [-61.125537, 35.863534],
		zoom: 4
	});
	view.ui.add("info", "top-right");

	view.on("click", function(evt) {
		var screenPoint = {
			x: evt.x,
			y: evt.y
		};
		view.hitTest(screenPoint).then(getGraphics);
	});

	function getGraphics(response) {
		
		if(response.results.length == 0) return;
		var point = response.results[0];
		view.popup.open({
		        // Set the popup's title to the coordinates of the clicked location
		        title: "Flight: " + point.graphic.attributes['Flight'],
		        content: "Callsign : " + point.graphic.attributes['CallSign'] + "From : " + point.graphic.attributes['Origin'],
		        location: point.mapPoint // Set the location of the popup to the clicked location
		    });		
	}
	function Flight(data){
		this.icao24 = data[0];
		this.callSign = data[1];
		this.originCountry = data[2];
		this.longitude = data[5];
		this.latitude = data[6];
		this.altitude = data[7];
	}

	function processFlights(response){
		var dataArray = JSON.parse(response).states;

		var flightPoints = dataArray.map(function(dt){
			var flight  = new Flight(dt);

			var point =  new Point({
				longitude: flight.longitude,
				latitude: flight.latitude,
				z: flight.altitude
			})

			 var markerSymbol = new SimpleMarkerSymbol({
			    color: [226, 119, 40],
			    outline: { // autocasts as new SimpleLineSymbol()
			      color: [255, 255, 255],
			      width: 2
			    }
			  });

			var attribs = {
				'Flight': flight.icao24,
				'CallSign': flight.callSign,
				'Origin': flight.originCountry
			}
			var pointGraphic = new Graphic({
			  geometry: point,
			  symbol: markerSymbol,
			  attributes: attribs
			});

			return pointGraphic;
		});
        layer.graphics = flightPoints;
	}
	view.then(function() {
		layer.then(function() {
			var renderer = layer.renderer.clone();
			renderer.symbol.width = 4;
			renderer.symbol.color = [128, 128, 128, 0.8];
			renderer.symbol.cap = "round";
			layer.renderer = renderer;
		});
		xhr.get('flights.json'			
		).then(processFlights);
	});
});