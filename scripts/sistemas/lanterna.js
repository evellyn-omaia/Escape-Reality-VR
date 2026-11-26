import * as THREE from 'three';
export class Lanterna {
 constructor(cena,camera){this.luz=new THREE.SpotLight(0xfff2d5,28,12,Math.PI/8,.65,1.8);this.luz.position.set(.18,-.15,-.08);this.luz.target.position.set(0,0,-5);camera.add(this.luz,this.luz.target);cena.add(camera);this.reiniciar();}
 alternar(){this.luz.visible=!this.luz.visible;return this.luz.visible;}
 reiniciar(){this.luz.visible=false;}
}
