import * as THREE from 'three';
function textura(tipo){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');let s=137;const aleatorio=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};g.fillStyle=tipo==='madeira'?'#795438':'#77766b';g.fillRect(0,0,256,256);for(let i=0;i<3000;i++){g.fillStyle=`rgba(${aleatorio()>.5?'255,240,210':'20,12,8'},${aleatorio()*.12})`;g.fillRect(aleatorio()*256,aleatorio()*256,tipo==='madeira'?20+aleatorio()*130:2+aleatorio()*8,1+aleatorio()*2);}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;}
export function construirEscritorio(cena,fisica){
 const madeira=new THREE.MeshStandardMaterial({map:textura('madeira'),roughness:.72});const parede=new THREE.MeshStandardMaterial({map:textura('parede'),roughness:.95});const material=(cor,metalness=0,roughness=.8)=>new THREE.MeshStandardMaterial({color:cor,metalness,roughness});const escura=material(0x35251c),metal=material(0x68645a,.65,.45),latão=material(0xb69a58,.65,.38),tecido=material(0x414b42),papel=material(0xd6c9a7),teto=material(0x999488),tapete=material(0x63372d),vidro=material(0x304d65,.2,.35);const grupo=new THREE.Group();grupo.name='escritorio';cena.add(grupo);
 function caixa(nome,x,y,z,l,a,p,mat,colisor=false){const m=new THREE.Mesh(new THREE.BoxGeometry(l,a,p),mat);m.name=nome;m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;grupo.add(m);if(colisor)fisica.registrar(x,z,l,p);return m;}
 function cilindro(nome,x,y,z,r,a,mat){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,a,20),mat);m.name=nome;m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;grupo.add(m);return m;}
 // Limites físicos e arquitetura.
 caixa('piso',0,-.08,0,8,.16,6,madeira);for(let i=0;i<20;i++)caixa('junta-piso',-3.8+i*.4,.003,0,.012,.006,6,escura);
 caixa('teto',0,3.25,0,8,.1,6,teto);caixa('parede-fundo',0,1.6,-3.06,8,3.2,.12,parede,true);caixa('parede-frente',0,1.6,3.06,8,3.2,.12,parede,true);caixa('parede-esquerda',-4.06,1.6,0,.12,3.2,6,parede,true);caixa('parede-direita',4.06,1.6,0,.12,3.2,6,parede,true);
 for(const z of [-2.97,2.97])caixa('rodape',0,.08,z,8,.16,.07,escura);for(const x of [-3.97,3.97])caixa('rodape',x,.08,0,.07,.16,6,escura);
 caixa('porta-saida',0,1.08,2.93,1.02,2.16,.12,madeira,true);for(const x of [-.58,.58])caixa('batente',x,1.13,2.83,.12,2.26,.14,escura);caixa('batente-superior',0,2.26,2.83,1.28,.12,.14,escura);for(const y of [.55,1.57])caixa('painel-porta',0,y,2.85,.76,.75,.05,escura);caixa('macaneta',.38,1.03,2.77,.15,.045,.12,latão);
 // Janela cenográfica (sem abertura física).
 caixa('janela',1.9,1.95,-2.98,1.7,1.25,.04,vidro);for(const x of [1.03,1.9,2.77])caixa('moldura-janela',x,1.95,-2.91,.07,1.4,.09,madeira);for(const y of [1.29,1.95,2.61])caixa('moldura-janela',1.9,y,-2.91,1.8,.07,.09,madeira);
 // Mesa, cadeira e objetos sobre a mesa.
 caixa('mesa-tampo',0,.82,-1.15,2,.12,.88,madeira,true);for(const x of [-.88,.88])for(const z of [-1.5,-.8])caixa('mesa-pe',x,.4,z,.12,.8,.12,escura);caixa('mesa-frente',0,.67,-1.58,1.8,.2,.06,madeira);for(const x of [-.55,.55])caixa('puxador-mesa',x,.67,-1.53,.16,.035,.08,latão);
 caixa('cadeira-assento',0,.47,-2.15,.55,.09,.55,tecido,true);caixa('cadeira-encosto',0,.83,-2.39,.55,.65,.09,madeira);for(const x of [-.23,.23])for(const z of [-2.37,-1.93])caixa('cadeira-pe',x,.23,z,.06,.46,.06,escura);
 for(let i=0;i<5;i++){const m=caixa('documento-'+i,-.55+i*.09,.89+i*.003,-1.1+i*.035,.28,.006,.2,papel);m.rotation.y=i*.17;}
 cilindro('base-luminaria',.7,.92,-1.35,.14,.05,latão);cilindro('haste-luminaria',.7,1.1,-1.35,.024,.35,latão);const cúpula=new THREE.Mesh(new THREE.CylinderGeometry(.09,.23,.2,32,1,true),material(0x887b49,.2,.6));cúpula.position.set(.7,1.32,-1.35);grupo.add(cúpula);
 // Estante com livros.
 caixa('estante-fundo',-2.85,1.15,-2.72,1.6,2.3,.12,escura,true);for(const x of [-3.65,-2.05])caixa('estante-lateral',x,1.15,-2.49,.1,2.3,.48,madeira);for(const y of [.08,.62,1.16,1.7,2.25])caixa('prateleira',-2.85,y,-2.49,1.6,.08,.48,madeira);fisica.registrar(-2.85,-2.49,1.7,.48);const cores=[0x773c34,0x47564b,0x786a3d,0x3d4d63,0x625347].map(c=>material(c));for(let i=0;i<20;i++){const x=-3.5+(i%7)*.2,y=.15+Math.floor(i/7)*.54,h=.25+(i%3)*.05;caixa('livro-'+i,x,y+h/2,-2.48,.15,h,.29,cores[i%5]);caixa('lombada-'+i,x,y+h*.65,-2.326,.1,.025,.008,latão);}
 // Arquivo e cofre.
 caixa('armario',-3.55,.65,.1,.7,1.3,1.1,madeira,true);for(let i=0;i<4;i++){const y=.18+i*.31;caixa('gaveta-'+i,-3.16,y,.1,.06,.27,.97,escura);caixa('puxador-gaveta-'+i,-3.1,y,.1,.08,.04,.23,latão);}
 caixa('cofre',3.32,.48,-2.37,.86,.96,.82,metal,true);caixa('porta-cofre',3.32,.48,-1.93,.72,.82,.06,material(0x343a3c,.6,.5));const disco=cilindro('disco-cofre',3.32,.55,-1.86,.13,.05,latão);disco.rotation.x=Math.PI/2;caixa('alavanca-cofre',3.55,.35,-1.85,.045,.19,.06,latão);
 // Sofá.
 caixa('sofa-base',3.15,.32,.9,1.25,.38,2,escura,true);caixa('sofa-encosto',3.72,.78,.9,.32,.9,2,tecido);for(const z of [.45,1.35])caixa('almofada',3.05,.57,z,.9,.18,.84,tecido);for(const z of [-.06,1.86])caixa('braco-sofa',3.15,.66,z,1.25,.36,.22,tecido);
 caixa('tapete',0,.018,.85,2.5,.025,2.1,tapete);for(const x of [-1.16,1.16])caixa('borda-tapete',x,.034,.85,.04,.006,1.95,latão);for(const z of [-.1,1.8])caixa('borda-tapete',0,.034,z,2.35,.006,.04,latão);
 // Relógio com ponteiros e quadros.
 const relogio=cilindro('relogio',-.1,2.36,-2.91,.29,.08,escura);relogio.rotation.x=Math.PI/2;const face=cilindro('face-relogio',-.1,2.36,-2.85,.24,.025,papel);face.rotation.x=Math.PI/2;caixa('ponteiro-hora',-.18,2.36,-2.82,.16,.025,.014,escura);caixa('ponteiro-minuto',-.1,2.45,-2.82,.018,.18,.014,escura);for(let i=0;i<12;i++){const ang=i*Math.PI/6;caixa('marca-relogio',-.1+Math.sin(ang)*.2,2.36+Math.cos(ang)*.2,-2.82,.014,.014,.014,escura);}
 for(let i=0;i<3;i++){caixa('quadro-'+i,-1.2+i*1.2,1.95,2.91,.45,.56,.06,escura);caixa('fotografia-'+i,-1.2+i*1.2,1.95,2.87,.35,.45,.015,papel);}
 caixa('luminaria-teto',0,3.08,0,.55,.12,.55,latão);
 cena.add(new THREE.HemisphereLight(0xa7bbd5,0x65513a,1.25));const luz=new THREE.PointLight(0xffd29b,17,8,2);luz.position.set(.7,1.3,-1.35);luz.castShadow=true;luz.shadow.mapSize.set(1024,1024);luz.shadow.bias=-.001;cena.add(luz);const janela=new THREE.PointLight(0x9bc9ff,24,9,2);janela.position.set(1.9,2.3,-2.65);cena.add(janela);const geral=new THREE.PointLight(0xffdfb0,26,9,2);geral.position.set(0,2.95,0);cena.add(geral);
 return grupo;
}
