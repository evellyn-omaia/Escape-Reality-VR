export const desafios = [
 {id:'quadro',titulo:'Investigue os quadros',pistas:['Observe a decoração próxima à saída.','Um quadro esconde um objeto.','Examine o quadro à esquerda da porta com E.']},
 {id:'chave-gaveta',titulo:'Encontre a chave pequena',pistas:['Olhe atrás do quadro deslocado.','Procure um brilho metálico.','Mire na chave revelada e pressione E.']},
 {id:'gaveta',titulo:'Destranque o armário',pistas:['A chave pequena serve em um móvel.','Investigue a gaveta superior.','Selecione a chave pequena no inventário e pressione E na gaveta superior.']},
 {id:'carta',titulo:'Leia o documento reservado',pistas:['Inspecione o interior da gaveta aberta.','Procure uma folha de papel.','Colete o documento com E e leia sua descrição no inventário.']},
 {id:'cofre',titulo:'Decifre o cofre',pistas:['A carta menciona uma hora.','Observe os ponteiros do relógio.','Digite 0900 no cofre.']},
 {id:'chave-saida',titulo:'Recupere a chave da saída',pistas:['O cofre guarda um objeto.','Olhe dentro do cofre aberto.','Mire na chave e pressione E.']},
 {id:'saida',titulo:'Escape do escritório',pistas:['Use a chave encontrada no cofre.','Selecione a chave da saída no inventário.','Pressione E na porta e, após abrir, pressione E novamente na saída.']}
];
export class Enigmas {
 constructor(){this.reiniciar();}
 reiniciar(){this.resolvidos=new Set();this.niveis=new Map();this.penalidade=0;this.quantidade=0;}
 concluir(id){if(!desafios.some(d=>d.id===id))return false;const antes=this.resolvidos.size;this.resolvidos.add(id);return this.resolvidos.size!==antes;}
 atual(){return desafios.find(d=>!this.resolvidos.has(d.id));}
 completosAntesDaSaida(){return desafios.slice(0,-1).every(d=>this.resolvidos.has(d.id));}
 solicitar(){const d=this.atual();if(!d)return null;const nivel=this.niveis.get(d.id)||0;if(nivel>=3)return null;const segundos=[15,30,60][nivel];this.niveis.set(d.id,nivel+1);this.penalidade+=segundos;this.quantidade++;return {texto:d.pistas[nivel],nivel:nivel+1,segundos};}
}
