require(["esri/Map", "esri/views/SceneView", "esri/Camera", "esri/widgets/Locate", "dojo/dom",
    "dojo/on", "dojo/domReady!"
], function(Map, SceneView, Camera, Locate, dom, on) {

    var map = new Map({
        basemap: "satellite",
        ground: "world-elevation"
    });

    var view = new SceneView({
        container: "viewDiv",
        map: map
    });

    var camBottom = new Camera({
        position: {
            longitude: -79.07526,
            latitude: 43.07711,
            z: 500
        },
        tilt: 60
    });

    var camTop = new Camera({
        position: {
            longitude: -79.07526,
            latitude: 43.07711,
            z: 5000
        },
        tilt: 80
    });

    var locateBtn = new Locate({
        view: view
    });

    var goToStartButton = dom.byId("goToStart");
    var ascendButton = dom.byId("ascend");
    var descendButton = dom.byId("descend");

    view.then(function() {
        view.environment.directShadowsEnabled = true;
        view.environment.ambientOcclusionEnabled = true;
        view.environment.atmophereEnabled = true;
        view.environment.quality = "high";

        view.ui.add(locateBtn, {
            position: "top-left"
        });

        on(goToStartButton, "click", function(e) {
            camBottom.position.longitude = view.center.longitude;
            camBottom.position.latitude = view.center.latitude;

            view.goTo(camBottom, {
                speedFactor: 0.5
            });
        });

        on(ascendButton, "click", function(e) {
            camTop.position.longitude = view.center.longitude + driftDistance();
            camTop.position.latitude = view.center.latitude + driftDistance();
            camTop.heading = randomDirection();

            view.goTo(camTop, {
                speedFactor: 0.1,
                easing: "linear"
            })
        });

        on(descendButton, "click", function(e) {
            camBottom.position.longitude += driftDistance();
            camBottom.position.latitude += driftDistance();
            camBottom.heading = randomDirection();

            view.goTo(camBottom, {
                speedFactor: 0.1,
                easing: "linear"
            })
        });

    }).otherwise(function(err) {
        console.error("SceneView rejected:", err);
    });

    function driftDistance() {
        return (Math.random() * 0.02) - 0.01;
    }

    function randomDirection() {
        return Math.floor(Math.random() * 360);
    }
});
