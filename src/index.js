import * as r from 'ramda';
import {
  Scene, PerspectiveCamera,
  WebGLRenderer, BoxGeometry, MeshBasicMaterial,
  Vector3, Mesh, Geometry, LineBasicMaterial, Line
} from 'three';
import spawn from 'actorjs';

function component() {
  const element = document.createElement('div');

  const scene = new Scene();

  // let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  // camera.position.z = 5;

  let camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 0, 50);
  camera.lookAt(0, 0, 0);

  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  element.appendChild(renderer.domElement);

  var geometry = new BoxGeometry(1, 1, 1);
  var material = new MeshBasicMaterial({ color: 0x0088ff });
  var cube = new Mesh(geometry, material);
  scene.add(cube);

  //create a blue LineBasicMaterial
  var l_material = new LineBasicMaterial({ color: 0x0000ff });
  var l_geometry = new Geometry();
  l_geometry.vertices.push(new Vector3(-3, 0, 0));
  l_geometry.vertices.push(new Vector3(0, 3, 0));
  l_geometry.vertices.push(new Vector3(3, 0, 0));
  var line = new Line(l_geometry, l_material);
  scene.add(line);

  renderer.render(scene, camera);
  // // function animate() {
  // //   const t = requestAnimationFrame(animate);
  // //   const at = (t % 100 > 50) ? 1 : -1;
  // //   renderer.render(scene, camera);
  // //   cube.rotation.x += at * 0.01;
  // //   cube.rotation.y += at * 0.01;
  // // }
  // // animate();

  //  element.innerHTML = r.join(' ', ['Hello', 'ECD']);


  const nate = spawn(async function () {
    const msg = ['nate', 'will you be my partner?'];
    log('nate>', msg);
    kirsti.send(msg);
    while (1) {
      const result = await this.receive(mail => {
        log('nate<', mail)
        const [pid, newmsg] = mail;
        if (newmsg === 'will you be my partner?') {
          pids[pid].send(['nate', 'yes!']);
          return 'got invite from ' + pid;
        }
        if (newmsg === 'yes!') {
          pids[pid].send(['nate', 'great, thanks!']);
          return 'accepted invite from ' + pid;
        }
        log('what?', mail);
        return 'shhh';
      });
      log('nate*', result);
    }
  }).catch(console.error)

  const kirsti = spawn(async function () {
    const msg = ['kirsti', 'will you be my partner?'];
    log('kirsti>', msg)
    nate.send(msg);
    while (1) {
      const result = await this.receive(mail => {
        log('kirsti<', mail);
        const [pid, newmsg] = mail;
        if (newmsg === 'will you be my partner?') {
          pids[pid].send(['kirsti', 'yes!']);
          return 'got invite from ' + pid;
        }
        if (newmsg === 'yes!') {
          pids[pid].send(['kirsti', 'great, thanks!']);
          return 'accepted invite from ' + pid;
        }
        log('what?', mail);
        return 'shhh';
      });
      log('kirsti*', result);
    }
  })
    .then(value => log('kirsti then ', value))
    .catch(console.error)

  const pids = { nate, kirsti };

  function log(actor, result) {
    console.log(`${actor}: `, result);
  }

  return element;
}


document.body.appendChild(component());