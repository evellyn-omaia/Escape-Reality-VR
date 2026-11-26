import * as THREE from 'three';
export class Mecanismo {
 constructor(grupo,nomes,pivo,fisica,transformar,rotulo){this.grupo=new THREE.Group();this.grupo.position.set(...pivo);grupo.add(this.grupo);grupo.updateMatrixWorld(true);for(const nome of nomes){const objeto=grupo.getObjectByName(nome);if(objeto)this.grupo.attach(objeto);}this.grupo.userData.mecanismo=this;this.transformar=transformar;this.rotulo=rotulo;this.valor=0;this.alvo=0;this.caixa=new THREE.Box3();this.colisor=fisica.registrar(0,0,0,0);this.aplicar();}
 aplicar(){this.transformar(this.grupo,this.valor);this.grupo.updateWorldMatrix(true,true);this.caixa.setFromObject(this.grupo);Object.assign(this.colisor,{minX:this.caixa.min.x,maxX:this.caixa.max.x,minZ:this.caixa.min.z,maxZ:this.caixa.max.z});}
 alternar(){this.alvo=this.alvo===1?0:1;}
 atualizar(dt,posicao,fisica){if(this.valor===this.alvo)return;const anterior=this.valor;this.valor=THREE.MathUtils.moveTowards?THREE.MathUtils.moveTowards(this.valor,this.alvo,dt*2):this.valor+Math.sign(this.alvo-this.valor)*Math.min(dt*2,Math.abs(this.alvo-this.valor));this.aplicar();const c=this.colisor;const x=Math.max(c.minX,Math.min(posicao.x,c.maxX)),z=Math.max(c.minZ,Math.min(posicao.z,c.maxZ));if((posicao.x-x)**2+(posicao.z-z)**2<fisica.raio**2){this.valor=anterior;this.alvo=anterior;this.aplicar();}}
 reiniciar(){this.valor=this.alvo=0;this.aplicar();}
}
