import * as THREE from 'three';
export class Renderizador {
 constructor(elemento){this.webgl=new THREE.WebGLRenderer({antialias:true});this.webgl.outputColorSpace=THREE.SRGBColorSpace;this.webgl.toneMapping=THREE.ACESFilmicToneMapping;this.webgl.toneMappingExposure=1.3;this.webgl.shadowMap.enabled=true;this.webgl.shadowMap.type=THREE.PCFSoftShadowMap;elemento.append(this.webgl.domElement);this.qualidade('media');}
 redimensionar(camera){this.webgl.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/Math.max(1,innerHeight);camera.updateProjectionMatrix();}
 qualidade(nivel){const fatores={baixa:.75,media:1,alta:1.5,ultra:2};this.webgl.setPixelRatio(Math.min(devicePixelRatio,fatores[nivel]??1));this.webgl.shadowMap.enabled=nivel!=='baixa';this.webgl.setSize(innerWidth,innerHeight);}
}
