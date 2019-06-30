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
  const findAPartner = (name) => {
    let partner = null;
    while (!partner) {
      const msg = [name, 'Would you care to dance?'];
      log(name + '>', msg);
      const selectedOther = randomOther(opposite(sex))
      selectedOther.pid.send(msg);
      while (!partner) {
        const result = await this.receive(mail => {
          log(name + '<', mail)
          const [fromName, newmsg] = mail;
          if (selectedOther.name === fromName &&
            newmsg === 'Would you care to dance?') {
            selectedOther.pid.send([name, 'yes!']);
            partner = selectedOther;
            return name + 'accepts invite from ' + selectedOther.name;
          }
          if (selectedOther.name === fromName && newmsg === 'yes!') {
            selectedOther.pid.send([name, 'great, thanks!']);
            partner = selectedOther;
            return selectedOther.name + ' accepted invite from ' + name;
          }
          // send a responce to the sender -- 'excuse me, one moment...'
          log(name + ' -- what?', mail);
          return 'excuse me, one moment...';
        });
        log(name + '*', result);
      }
    }
  };

  const dancerRecords = [{
    name: 'nate', sex: 'male', speed: 3
  },
  {
    name: 'kirsti', sex: 'female', speed: 3
  },
  {
    name: 'emma', sex: 'female', speed: 4
  },
  {
    name: 'darcy', sex: 'male', speed: 1
  }
  ];

  const dancers = r.map(({ name, sex }) => ({
    pid: spawn(async function () {
      const partner = findAPartner(name);

    }), name, sex
  }), dancerRecords);

  const opposite = (sex) => sex === 'male' ? 'female' : 'male';
  const randomOther = (otherSex) => r.find(
    r.and(r.propEq('sex', otherSex), r.propEq('partner', false)),
    dancers);

  function log(actor, result) {
    console.log(`${actor}: `, result);
  }

  return element;
}


document.body.appendChild(component());