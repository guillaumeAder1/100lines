require([
  "esri/Map",
  "esri/views/SceneView",
  "esri/views/MapView",
  "esri/core/watchUtils",
  "dojo/dom",
  "dojo/promise/all",
  "dojo/domReady!"
], function(Map, SceneView, MapView, watchUtils, dom, all) {
  const mainMap = new Map({
		basemap: "hybrid",
		ground: "world-elevation"
  });

  const mainView = new SceneView({
		container: "viewDiv",
		map: mainMap
  });

  mainView.then(() => {
		mainView.goTo({
		  center: [0, 50],
		  scale: 5000000
		}, {
		  animate: false
		});
  });

  // Minimap
  const overviewMap = new Map({
		basemap: "streets",
		ground: "world-elevation"
  });

  // Minimap view
  const mapView = new SceneView({
		container: "overviewDiv",
		map: overviewMap,
		constraints: {
		  rotationEnabled: false
		}
  });

  mapView.ui.components = [];
  const extentDiv = dom.byId("extentDiv");

  mapView.then(() => {
		// Update the Minimap whenever the MapView or SceneView extent changes
		mainView.watch("extent", () => updateMinimap(mainView, mapView));
		//mapView.watch("extent", () => updateMinimap(mapView, mainView));
		mainView.watch("camera", () => updateMinimap(mainView, mapView));
		//mapView.watch("camera", () => updateMinimap(mapView, mainView));

		// Update the Minimap overview when the main view becomes stationary
		mainView.watch("stationary", () => {
		  mapView.goTo({
				center: mainView.center,
				scale: mainView.scale * 2 * Math.max(mainView.width / mapView.width,
				  mainView.height / mapView.height)
		  });
		});

		function updateMinimap(sourceView, targetView) {
			console.log("ok", sourceView.extent);
			updateExtent(sourceView, targetView);
			updateCamera();
		}

		function updateExtent(sourceView, targetView) {
		  const extent = sourceView.extent;
		  if (extent) {
			  const bottomLeft = targetView.toScreen(extent.xmin, extent.ymin);
			  const topRight = targetView.toScreen(extent.xmax, extent.ymax);

			  extentDiv.style.top = `${topRight.y}px`;
			  extentDiv.style.left = `${bottomLeft.x}px`;
			  extentDiv.style.height = `${bottomLeft.y - topRight.y}px`;
			  extentDiv.style.width = `${topRight.x - bottomLeft.x}px`;
			}
		}

		function updateCamera() {
			const camera = mainView.camera;
			if (camera) {
				const { tilt, heading } = camera;
				extentDiv.style.transform = `rotateX(${tilt}deg) rotateZ(${heading}deg)`;
			}
		}
  });
});
