export default function Visual() {
  var ref = React.useRef(null);
  React.useEffect(function () {
    var canvas = ref.current; if (!canvas) return;
    var w = canvas.clientWidth || 320, h = 300;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(w, h, false);
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1220);
    var camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 2.4, 7); camera.lookAt(0, 0, 0);

    var ground = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 4),
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.9 })
    );
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.5;
    scene.add(ground);

    var puck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 0.25, 32),
      new THREE.MeshStandardMaterial({ color: 0x4f9eff, metalness: 0.2, roughness: 0.4 })
    );
    puck.position.set(-4, -0.25, 0); scene.add(puck);

    var vArrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0.05, 0),
      0.8, 0x22c55e, 0.22, 0.16
    );
    puck.add(vArrow);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    var dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(3, 5, 4); scene.add(dir);

    var raf = 0;
    var startX = -4, endX = 4, speed = 0.025;
    function loop() {
      puck.position.x += speed;
      if (puck.position.x > endX) puck.position.x = startX;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();
    return function () { cancelAnimationFrame(raf); renderer.dispose(); };
  }, []);
  return React.createElement('canvas', { ref: ref, style: { width: '100%', height: 300 } });
}
