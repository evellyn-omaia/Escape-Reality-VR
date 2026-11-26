export class Cronometro {
 constructor(){this.reiniciar();}
 reiniciar(){this.acumulado=0;this.inicio=null;this.encerrado=false;}
 atualizar(ativo,agora=performance.now()){if(this.encerrado)return;if(ativo&&this.inicio===null)this.inicio=agora;else if(!ativo&&this.inicio!==null){this.acumulado+=Math.max(0,agora-this.inicio);this.inicio=null;}}
 segundos(agora=performance.now()){return Math.floor((this.acumulado+(this.inicio===null?0:Math.max(0,agora-this.inicio)))/1000);}
 finalizar(agora=performance.now()){this.atualizar(false,agora);this.encerrado=true;return this.segundos(agora);}
}
export function formatarTempo(s){return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
