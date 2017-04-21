require(["esri/Map",
		 "esri/views/SceneView",
		 "esri/layers/GraphicsLayer",
		 "esri/Graphic",
		 "esri/geometry/Point", 
    	 "esri/renderers/UniqueValueRenderer",
		 "esri/symbols/SimpleMarkerSymbol",
		 "esri/symbols/WebStyleSymbol",
		 "dojo/dom",
		 "dojo/domReady!",
		 "dojo/request/xhr"
], function(Map, SceneView, Graphicslayer, Graphic, Point, UniqueValueRenderer, SimpleMarkerSymbol,WebStyleSymbol, dom, domReady, xhr) {
	
	
	var layer = new Graphicslayer({
		graphics: []
	});
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
	

	function getGraphics(response) {
		var graphic = response.results[0].graphic;
		var attributes = graphic.attributes;
		var category = attributes.CAT;
		var wind = attributes.WIND_KTS;
		var name = attributes.NAME;
		dom.byId("info").style.visibility = "visible";
		dom.byId("name").innerHTML = name;
		dom.byId("category").innerHTML = "Category " + category;
		dom.byId("wind").innerHTML = wind + " kts";
		var renderer = new UniqueValueRenderer({
			field: "NAME",
			defaultSymbol: layer.renderer.symbol || layer.renderer.defaultSymbol,
			uniqueValueInfos: [{
				value: name,
				symbol: new SimpleLineSymbol({
					color: "orange",
					width: 5,
					cap: "round"
				})
			}]
		});
		layer.renderer = renderer;
	}

	function getFlights(){
		xhr.get('flights.json'			
		).then(processFlights);

	}


	function Flight(data){
		this.icao24 = data[0];
		this.callSign = data[1];
		this.originCountry = data[2];
		this.timePosition = data[3];
		this.timeVelocity = data[4];
		this.longitude = data[5];
		this.latitude = data[6];
		this.altitude = data[7];
		this.onGround = data[8];
		this.velocity = data[9];
		this.heading = data[10];
		this.verticalRate = data[11];
		this.sensors = data[12];
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

			var pointGraphic = new Graphic({
			  geometry: point,
			  symbol: markerSymbol
			});

			return pointGraphic;
		});

		// plot the flight data as a point on the map
		// London
        // var point = new Point({
        //     longitude: -0.178,
        //     y: 51.48791,
        //     z: 1010
        //   });

        layer.graphics = flightPoints;

		console.log(flights[0]);

	}
	view.then(function() {
		layer.then(function() {
			var renderer = layer.renderer.clone();
			renderer.symbol.width = 4;
			renderer.symbol.color = [128, 128, 128, 0.8];
			renderer.symbol.cap = "round";
			layer.renderer = renderer;
		});
		getFlights();
	});

	// var webStyleSymbol = new WebStyleSymbol({
	//   name: "Eurocopter_H125_-_Flying",
	//   portal: {
	//     url: "https://www.arcgis.com"
	//   },
	//   styleName: "EsriRealisticTransportationStyle"
	// });


});