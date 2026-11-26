import {Interacao} from '../sistemas/interacao.js';
import * as THREE from 'three';
import {Renderizador} from './renderizador.js';
import {Fisica} from './fisica.js';
import {Jogador} from '../jogador/jogador.js';
import {ControlesComputador} from '../jogador/controles-computador.js';
import {construirEscritorio} from '../fases/escritorio.js';
export class MotorJogo {
 constructor(elemento,aoAlterar){this.cena=new THREE.Scene();this.cena.background=new THREE.Color(0x101113);this.camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.05,50);this.renderizador=new Renderizador(elemento);this.fisica=new Fisica();const grupo=construirEscritorio(this.cena,this.fisica);this.jogador=new Jogador(this.camera,this.fisica);this.controles=new ControlesComputador(this.renderizador.webgl.domElement,this.camera,aoAlterar);this.interacao=new Interacao(grupo,this.fisica,this.camera,this.controles);this.renderizador.redimensionar(this.camera);window.addEventListener('resize',()=>this.renderizador.redimensionar(this.camera));let anterior=null;this.renderizador.webgl.setAnimationLoop(tempo=>{const dt=anterior===null?0:Math.min(.05,Math.max(0,(tempo-anterior)/1000));anterior=tempo;if(this.controles.ativo)this.jogador.atualizar(dt,this.controles);this.interacao.atualizar(this.interacao.modal||this.controles.ativo?dt:0);this.renderizador.webgl.render(this.cena,this.camera);});}
 iniciar(){return this.controles.iniciar();}
 reiniciar(){this.jogador.reiniciar();this.interacao.reiniciar();this.controles.teclas.clear();}
}
