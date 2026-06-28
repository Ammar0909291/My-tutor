export default function Visual() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var canvas = ref.current; if (!canvas) return;
    var w = canvas.clientWidth || 320, h = 300;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(w, h, false);
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);
    var camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 1.6, 4.5); camera.lookAt(0, 0, 0);

    var molecule = new THREE.Group();
    scene.add(molecule);

    var oxygen = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.35 })
    );
    molecule.add(oxygen);

    var bondAngle = 104.5 * Math.PI / 180;
    var half = bondAngle / 2;
    var bondLen = 1.2;
    var hx = Math.sin(half) * bondLen;
    var hy = -Math.cos(half) * bondLen;

    function makeHydrogen(x, y) {
      var h = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.4 })
      );
      h.position.set(x, y, 0);
      return h;
    }
    var h1 = makeHydrogen(-hx, hy);
    var h2 = makeHydrogen(hx, hy);
    molecule.add(h1); molecule.add(h2);

    function makeBond(toX, toY) {
      var dx = toX, dy = toY;
      var len = Math.sqrt(dx * dx + dy * dy);
      var geom = new THREE.CylinderGeometry(0.07, 0.07, len, 12);
      var mat = new THREE.MeshStandardMaterial({ color: 0x9ca3af });
      var m = new THREE.Mesh(geom, mat);
      m.position.set(toX / 2, toY / 2, 0);
      var angle = Math.atan2(dy, dx);
      m.rotation.z = angle - Math.PI / 2;
      return m;
    }
    molecule.add(makeBond(-hx, hy));
    molecule.add(makeBond(hx, hy));

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    var dir = new THREE.DirectionalLight(0xffffff, 0.85);
    dir.position.set(3, 4, 5); scene.add(dir);

    var raf = 0;
    function loop() {
      molecule.rotation.y += 0.008;
      molecule.rotation.x = Math.sin(molecule.rotation.y * 0.5) * 0.15;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();
    return function () { cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);
  return React.createElement('canvas', { ref: ref, style: { width: '100%', height: 300 } });
}
