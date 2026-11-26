export class ControlesComputador {
 constructor(canvas,camera,aoAlterar){this.canvas=canvas;this.camera=camera;this.teclas=new Set();this.sensibilidade=1;this.camera.rotation.order='YXZ';this.ativo=false;document.addEventListener('keydown',e=>{if(this.ativo){this.teclas.add(e.code);if(['Space','ControlLeft','ControlRight'].includes(e.code))e.preventDefault();}});document.addEventListener('keyup',e=>this.teclas.delete(e.code));document.addEventListener('mousemove',e=>{if(!this.ativo)return;this.camera.rotation.y-=e.movementX*.002*this.sensibilidade;this.camera.rotation.x=Math.max(-1.5,Math.min(1.5,this.camera.rotation.x-e.movementY*.002*this.sensibilidade));});document.addEventListener('pointerlockchange',()=>{this.ativo=document.pointerLockElement===canvas;this.teclas.clear();aoAlterar(this.ativo);});window.addEventListener('blur',()=>{this.teclas.clear();if(this.ativo)document.exitPointerLock();});}
 pressionada(...codigos){return codigos.some(c=>this.teclas.has(c));}
 iniciar(){return this.canvas.requestPointerLock();}
 pausar(){if(document.pointerLockElement===this.canvas)document.exitPointerLock();this.teclas.clear();}
}
