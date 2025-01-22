import {
  Object3D,
  ObjectLoader,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';
import {
  addLight,
  camera,
  createScene,
  getCamera,
  getScene,
  renderer,
  setCamera,
  setScene,
} from './init3d116';
import { runScript } from './scriptDev';

export function getObjectNameByName(object3D: Object3D): string {
  return object3D.name.trim() === '' ? object3D.type : object3D.name;
}

export function hasClass(obj: any, className: string) {
  return obj.classList.contains(className);
}

export function toggleClass(currentSelectDiv: any, className: string) {
  currentSelectDiv.classList.contains(className)
    ? currentSelectDiv.classList.add(className)
    : currentSelectDiv.classList.remove(className);
}

export function toggleAttribute(
  currentSelectDiv: any,
  attribute: string,
  value: string,
) {
  currentSelectDiv.getAttribute(attribute)?.includes(value)
    ? currentSelectDiv.removeAttribute(attribute)
    : currentSelectDiv.setAttribute(attribute, value);
}

export function hasAttribute(obj: any, attribute: string, includes: string) {
  return obj.getAttribute(attribute)?.includes(includes);
}

export function init3d(canvas: React.RefObject<HTMLDivElement>) {
  const _scene = localStorage.getItem('scene');
  const _camera = localStorage.getItem('camera');

  if (canvas.current !== null) {
    if (_scene && _camera) {
      createScene(canvas.current);

      setScene(new ObjectLoader().parse(JSON.parse(_scene)));

      setCamera(new ObjectLoader().parse(JSON.parse(_camera)));
      const camera = getCamera();
      const scene = getScene();

      if (import.meta.env.MODE === 'development') {
        runScript({ camera: camera, scene: scene });
      }

      eval(`
              const cube = scene.getObjectByName('cube');
              if (cube !== undefined) { 
              cube.position.z+= 2;
                setInterval(() => {
                  cube.rotation.y += 0.5;
                
                }, 50);
              }
          `);
    } else {
      createScene(canvas.current);

      addLight();
    }

    window.addEventListener('resize', () =>
      onWindowResize(canvas, camera, renderer),
    );
  }
  return () => {
    window.removeEventListener('resize', () =>
      onWindowResize(canvas, camera, renderer),
    );
  };
}
function onWindowResize(
  canvas: React.RefObject<HTMLDivElement>,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) {
  if (canvas.current !== null) {
    camera.aspect = canvas.current.offsetWidth / canvas.current.offsetHeight; // 设置相机的宽高比和视口的宽高比一致
    camera.updateProjectionMatrix(); // 更新相机的投影矩阵
    renderer.setSize(canvas.current.offsetWidth, canvas.current.offsetHeight); // 更新渲染器的大小
  }
}

//return scene.getObjectByProperty('uuid', uuid);

export function loaderGlb() {}
