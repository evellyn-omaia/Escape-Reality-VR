export class Fisica {
 constructor(){this.colisores=[];this.raio=.24;}
 registrar(x,z,largura,profundidade){const colisor={minX:x-largura/2,maxX:x+largura/2,minZ:z-profundidade/2,maxZ:z+profundidade/2};this.colisores.push(colisor);return colisor;}
 livre(x,z){return !this.colisores.some(c=>{if(c.ativo===false)return false;const px=Math.max(c.minX,Math.min(x,c.maxX)),pz=Math.max(c.minZ,Math.min(z,c.maxZ));return (x-px)**2+(z-pz)**2<this.raio**2;});}
 mover(posicao,dx,dz){const passos=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.08));for(let i=0;i<passos;i++){const x=posicao.x+dx/passos,z=posicao.z+dz/passos;if(this.livre(x,posicao.z))posicao.x=x;if(this.livre(posicao.x,z))posicao.z=z;}}
}
