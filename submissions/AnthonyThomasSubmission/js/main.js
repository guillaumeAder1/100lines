require(["esri/Map", "esri/views/SceneView", "esri/layers/GraphicsLayer","esri/Graphic", 
    "esri/renderers/UniqueValueRenderer",
	"esri/symbols/SimpleLineSymbol", "dojo/dom", "dojo/domReady!","dojo/request/xhr"
], function(Map, SceneView, Graphicslayer, Graphic, UniqueValueRenderer, SimpleLineSymbol, dom, domReady, xhr) {
	
	var graphic = new Graphic();

	var layer = new Graphicslayer({
		graphics: [graphic]
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
	
	view.on("pointer-move", function(evt) {
		var screenPoint = {
			x: evt.x,
			y: evt.y
		};
		// view.hitTest(screenPoint).then(getGraphics);
		getFlights();
	});

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

	function processFlights(response){
		var dataArray = JSON.parse(response).states;

		console.log(dataArray[0]);


	}
	view.then(function() {
		layer.then(function() {
			var renderer = layer.renderer.clone();
			renderer.symbol.width = 4;
			renderer.symbol.color = [128, 128, 128, 0.8];
			renderer.symbol.cap = "round";
			layer.renderer = renderer;
		});
	});
});