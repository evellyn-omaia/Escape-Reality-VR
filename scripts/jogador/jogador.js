import * as THREE from 'three';
export class Jogador {
 constructor(camera,fisica){this.camera=camera;this.fisica=fisica;this.reiniciar();}
 reiniciar(){this.camera.position.set(0,1.7,2.35);this.camera.rotation.set(0,0,0,'YXZ');}
 atualizar(dt,controles){const frente=Number(controles.pressionada('KeyW'))-Number(controles.pressionada('KeyS'));const lado=Number(controles.pressionada('KeyD'))-Number(controles.pressionada('KeyA'));const agachado=controles.pressionada('ControlLeft','ControlRight');const velocidade=agachado?1.2:controles.pressionada('ShiftLeft','ShiftRight')?4:2.4;const direcao=new THREE.Vector3(lado,0,-frente);if(direcao.lengthSq()>0){direcao.normalize().applyAxisAngle(new THREE.Vector3(0,1,0),this.camera.rotation.y).multiplyScalar(velocidade*dt);this.fisica.mover(this.camera.position,direcao.x,direcao.z);}this.camera.position.y=THREE.MathUtils.damp(this.camera.position.y,agachado?1.12:1.7,12,dt);}
}
