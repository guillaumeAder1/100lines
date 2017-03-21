require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", 
    "esri/renderers/UniqueValueRenderer",
	"esri/symbols/SimpleLineSymbol", "dojo/dom", "dojo/domReady!"
], function(Map, MapView, FeatureLayer, UniqueValueRenderer, SimpleLineSymbol, dom) {
	var layer = new FeatureLayer({
		url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/1",
		outFields: ["*"]
	});
	var map = new Map({
		basemap: "dark-gray",
		layers: [layer]
	});
	var view = new MapView({
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
		view.hitTest(screenPoint).then(getGraphics);
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