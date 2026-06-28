export default function Visual() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var canvas = ref.current; if (!canvas) return;
    var w = canvas.clientWidth || 320, h = 300;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(w, h, false);
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000010);
    var camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 4, 9); camera.lookAt(0, 0, 0);

    var sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xffcc33, emissive: 0x553300 })
    );
    scene.add(sun);

    var earth = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0x2f78c4, roughness: 0.7 })
    );
    scene.add(earth);

    var R = 3.2;
    var pts = [];
    for (var i = 0; i <= 64; i++) {
      var a = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R));
    }
    var orbit = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0x4f9eff, transparent: true, opacity: 0.45 })
    );
    scene.add(orbit);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    var sunlight = new THREE.PointLight(0xffffff, 1.6, 60);
    sunlight.position.set(0, 0, 0); scene.add(sunlight);

    var t = 0, raf = 0;
    function loop() {
      t += 0.015;
      earth.position.set(Math.cos(t) * R, 0, Math.sin(t) * R);
      earth.rotation.y += 0.05;
      sun.rotation.y += 0.003;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();
    return function () { cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);
  return React.createElement('canvas', { ref: ref, style: { width: '100%', height: 300 } });
}
