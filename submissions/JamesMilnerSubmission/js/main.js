require(["esri/Map", "esri/views/SceneView", "esri/layers/FeatureLayer", 
    "esri/renderers/UniqueValueRenderer",
	"esri/symbols/SimpleLineSymbol", "dojo/dom", "dojo/dom-class", "dojo/domReady!"
], function(Map, SceneView, FeatureLayer, UniqueValueRenderer, SimpleLineSymbol, dom, domClass) {

	$(document).ready(function() {
		$('select').material_select();
	});

	var map = new Map({
		basemap: "hybrid",
	});

	var view = new SceneView({
		container: "viewDiv",
		map: map,
		center: [-61.125537, 35.863534],
		zoom: 4
	});

	var history = [];
	var recordHandler;
	var recording = false;

	var playButton = document.getElementById("play");
	var recordButton = document.getElementById("record");
	var playback = document.getElementById("playback");

	recordButton.addEventListener("click",  function() {
		if (!recording) {
			recording = true;
			this.innerHTML = "Stop";
			domClass.add(playButton, "disabled");
			history = [];
			var startPosition = view.camera.clone()
			history.push(startPosition);
			recordHandler = view.on("pointer-up", function(evt){
				var dragPosition = view.camera.clone()
				history.push(dragPosition);
			});
		} else {
			recording = false;
			this.innerHTML = '<i class="material-icons right">videocam</i>Record';
			domClass.remove(playButton, "disabled");
			recordHandler.remove();
		}
	});

	playButton.addEventListener("click",  function() {
		if (!recording) {
			domClass.add(recordButton, "disabled");
			goTo(view, history, 0, getSpeed());
		}
	});

	function goTo(view, positions, i, speedFactor) {
		if (positions[i]) {
			if (i === 0) options = { animate: false };
			else options = { speedFactor: speedFactor };

			view.goTo(positions[i], options)
			.then(function() {
				i++;
				goTo(view, positions, i, speedFactor);
			})
		} else {
			domClass.remove(recordButton, "disabled");
		}
	}

	function getSpeed() {
		return parseFloat(playback.options[playback.selectedIndex].value);
	}
	
});