import * as THREE from 'three';
// Materiais originais gerados no navegador; sem arquivos externos.
function textura(tipo){
 const c=document.createElement('canvas');c.width=c.height=1024;const g=c.getContext('2d');let seed=137;
 const r=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const bases={madeira:'#60432d',parede:'#777365',couro:'#38291f',tecido:'#53382c',piso:'#59402e',janela:'#101c2b',papel:'#d0bd96',tapete:'#572824'};
 g.fillStyle=bases[tipo]||'#777777';g.fillRect(0,0,1024,1024);
 if(tipo==='madeira'||tipo==='piso'){
  const faixa=tipo==='piso'?128:1024;
  for(let x=0;x<1024;x+=faixa){g.fillStyle=`rgba(${r()>.5?'0,0,0':'220,170,110'},${r()*.23})`;g.fillRect(x,0,faixa,1024);}
  for(let i=0;i<4400;i++){const x=r()*1024,y=r()*1024;g.strokeStyle=`rgba(${r()>.45?'25,12,5':'220,175,110'},${.025+r()*.16})`;g.lineWidth=.4+r()*2;g.beginPath();g.moveTo(x,y);g.bezierCurveTo(x+8*Math.sin(y),y+80,x-9,y+180,x+3,y+350);g.stroke();}
  if(tipo==='piso')for(let x=0;x<1024;x+=128){g.fillStyle='#24170f';g.fillRect(x,0,3,1024);for(let y=(x%256?180:0);y<1024;y+=360){g.fillRect(x,y,128,3);g.fillRect(x+10,y+12,3,3);g.fillRect(x+115,y+12,3,3);}}
 }else if(tipo==='janela'){
  const grad=g.createLinearGradient(0,0,0,1024);grad.addColorStop(0,'#0b1422');grad.addColorStop(1,'#435363');g.fillStyle=grad;g.fillRect(0,0,1024,1024);g.fillStyle='#c5c9bb';g.beginPath();g.arc(760,170,42,0,Math.PI*2);g.fill();
  for(let x=0;x<1024;x+=65){let h=90+r()*330;g.fillStyle='#101820';g.fillRect(x,1024-h,60,h);for(let y=1030-h;y<990;y+=32)for(let k=0;k<3;k++)if(r()>.65){g.fillStyle='#a48b56';g.fillRect(x+8+k*17,y,6,12);}}
  for(let i=0;i<380;i++){let x=r()*1024,y=r()*1024;g.strokeStyle=`rgba(190,210,230,${r()*.24})`;g.beginPath();g.moveTo(x,y);g.lineTo(x-5,y+20+r()*80);g.stroke();}
 }else if(tipo==='tapete'){
  for(let i=0;i<5;i++){g.strokeStyle=i%2?'#a17a43':'#271b19';g.lineWidth=9;g.strokeRect(25+i*17,25+i*17,974-i*34,974-i*34);}
  for(let x=135;x<930;x+=150)for(let y=135;y<930;y+=150){g.save();g.translate(x,y);g.strokeStyle='#a28551';g.lineWidth=4;for(let k=0;k<8;k++){g.rotate(Math.PI/4);g.beginPath();g.ellipse(0,24,10,26,0,0,Math.PI*2);g.stroke();}g.restore();}
 }else if(tipo==='papel'){
  g.fillStyle='#3c3025';g.font='bold 48px Georgia';g.fillText('ARQUIVO RESERVADO',65,100);g.font='29px monospace';g.fillText('RELATÓRIO / 01',65,165);for(let i=0;i<17;i++){g.fillStyle='#695944';g.fillRect(65,230+i*37,250+r()*620,5);}g.strokeStyle='#793b30';g.lineWidth=8;g.strokeRect(600,820,330,110);g.fillStyle='#793b30';g.font='38px Georgia';g.fillText('CONFIDENCIAL',620,885);
 }else{
  for(let i=0;i<160;i++){let x=r()*1024,y=r()*1024,rr=20+r()*120;let a=g.createRadialGradient(x,y,0,x,y,rr);a.addColorStop(0,`rgba(20,15,10,${r()*.15})`);a.addColorStop(1,'rgba(20,15,10,0)');g.fillStyle=a;g.fillRect(x-rr,y-rr,rr*2,rr*2);}
 }
 if(tipo!=='janela'){const im=g.getImageData(0,0,1024,1024);for(let i=0;i<im.data.length;i+=4){let n=(r()-.5)*(tipo==='parede'?25:16);for(let k=0;k<3;k++)im.data[i+k]+=n;}g.putImageData(im,0,0);}
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t;
}
// Caixa com chanfros reais, mantendo a mesma envolvente dos colisores.
function geometriaSuave(l,a,p,r){r=Math.min(r,l*.24,a*.24,p*.24);const f=new THREE.Shape();const x=-l/2+r,y=-a/2+r,w=l-2*r,h=a-2*r;f.moveTo(x,y);f.lineTo(x+w,y);f.lineTo(x+w,y+h);f.lineTo(x,y+h);f.closePath();const geo=new THREE.ExtrudeGeometry(f,{depth:p-2*r,bevelEnabled:true,bevelSize:r,bevelThickness:r,bevelSegments:3,steps:1,curveSegments:1});geo.translate(0,0,-(p-2*r)/2);return geo;}
export function construirEscritorio(cena,fisica){
 const madeira=new THREE.MeshStandardMaterial({map:textura('madeira'),roughness:.68});const parede=new THREE.MeshStandardMaterial({map:textura('parede'),roughness:.98});const material=(cor,metalness=0,roughness=.8)=>new THREE.MeshStandardMaterial({color:cor,metalness,roughness});const escura=material(0x35251c),metal=material(0x68645a,.65,.45),latão=material(0xb69a58,.65,.38),tecido=new THREE.MeshStandardMaterial({map:textura('couro'),roughness:.78}),papel=material(0xd6c9a7),teto=material(0x999488),tapete=new THREE.MeshStandardMaterial({map:textura('tapete'),roughness:1}),vidro=new THREE.MeshBasicMaterial({map:textura('janela')});const grupo=new THREE.Group();grupo.name='escritorio';cena.add(grupo);
 function caixa(nome,x,y,z,l,a,p,mat,colisor=false){const m=new THREE.Mesh((/^(sofa|almofada|braco-sofa|cadeira-assento|mesa-tampo|cofre$)/.test(nome)?geometriaSuave(l,a,p,.065):new THREE.BoxGeometry(l,a,p)),mat);m.name=nome;m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;grupo.add(m);if(colisor)fisica.registrar(x,z,l,p);return m;}
 function cilindro(nome,x,y,z,r,a,mat){const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,a,20),mat);m.name=nome;m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;grupo.add(m);return m;}
 // Limites físicos e arquitetura.
 const mapaPiso=textura('piso');mapaPiso.repeat.set(4,3);const pisoMat=new THREE.MeshStandardMaterial({map:mapaPiso,roughness:.79});caixa('piso',0,-.08,0,8,.16,6,pisoMat);
 caixa('teto',0,3.25,0,8,.1,6,teto);caixa('parede-fundo',0,1.6,-3.06,8,3.2,.12,parede,true);caixa('parede-frente',0,1.6,3.06,8,3.2,.12,parede,true);caixa('parede-esquerda',-4.06,1.6,0,.12,3.2,6,parede,true);caixa('parede-direita',4.06,1.6,0,.12,3.2,6,parede,true);
 for(const z of [-2.97,2.97])caixa('rodape',0,.08,z,8,.16,.07,escura);for(const x of [-3.97,3.97])caixa('rodape',x,.08,0,.07,.16,6,escura);
 caixa('porta-saida',0,1.08,2.93,1.02,2.16,.12,madeira,true);for(const x of [-.58,.58])caixa('batente',x,1.13,2.83,.12,2.26,.14,escura);caixa('batente-superior',0,2.26,2.83,1.28,.12,.14,escura);for(const y of [.55,1.57])caixa('painel-porta',0,y,2.85,.76,.75,.05,escura);caixa('macaneta',.38,1.03,2.77,.15,.045,.12,latão);
 // Janela cenográfica (sem abertura física).
 caixa('janela',1.9,1.95,-2.98,1.7,1.25,.04,vidro);for(const x of [1.03,1.9,2.77])caixa('moldura-janela',x,1.95,-2.91,.07,1.4,.09,madeira);for(const y of [1.29,1.95,2.61])caixa('moldura-janela',1.9,y,-2.91,1.8,.07,.09,madeira);
 // Mesa, cadeira e objetos sobre a mesa.
 caixa('mesa-tampo',0,.82,-1.15,2,.12,.88,madeira,true);for(const x of [-.88,.88])for(const z of [-1.5,-.8])caixa('mesa-pe',x,.4,z,.12,.8,.12,escura);caixa('mesa-frente',0,.67,-1.58,1.8,.2,.06,madeira);for(const x of [-.55,.55])caixa('puxador-mesa',x,.67,-1.53,.16,.035,.08,latão);
 caixa('cadeira-assento',0,.47,-2.15,.55,.09,.55,tecido,true);caixa('cadeira-encosto',0,.83,-2.39,.55,.65,.09,madeira);for(const x of [-.23,.23])for(const z of [-2.37,-1.93])caixa('cadeira-pe',x,.23,z,.06,.46,.06,escura);
 const documentoMat=new THREE.MeshStandardMaterial({map:textura('papel'),roughness:1});for(let i=0;i<5;i++){const m=caixa('documento-'+i,-.55+i*.09,.89+i*.003,-1.1+i*.035,.28,.006,.2,documentoMat);m.rotation.y=i*.17;}
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
 for(let i=0;i<3;i++){if(i===1)continue;caixa('quadro-'+i,-1.2+i*1.2,1.95,2.91,.45,.56,.06,escura);caixa('fotografia-'+i,-1.2+i*1.2,1.95,2.87,.35,.45,.015,documentoMat);}
 caixa('luminaria-teto',0,3.08,0,.55,.12,.55,latão);
 cena.add(new THREE.HemisphereLight(0x9baec9,0x493326,.65));const luz=new THREE.PointLight(0xffc18a,7,7,2);luz.position.set(.7,1.3,-1.35);luz.castShadow=true;luz.shadow.mapSize.set(1024,1024);luz.shadow.bias=-.001;cena.add(luz);const janela=new THREE.PointLight(0x83a8e4,9,7,2);janela.position.set(1.9,2.3,-2.65);cena.add(janela);const geral=new THREE.PointLight(0xffd2a0,12,8,2);geral.position.set(0,2.95,0);cena.add(geral);
 // Molduras arquitetônicas, painéis baixos e detalhes sem ampliar colisores.
 for(const z of [-2.94,2.94]){caixa('cornija',0,3.09,z,8,.12,.13,escura);if(z<0)caixa('friso',0,.98,z,8,.045,.055,escura);else for(const x of [-2.32,2.32])caixa('friso',x,.98,z,3.3,.045,.055,escura);}
 for(const x of [-3.94,3.94]){caixa('cornija',x,3.09,0,.13,.12,6,escura);caixa('friso',x,.98,0,.055,.045,6,escura);}
 // Revestimento baixo segmentado; evitar a abertura da porta.
 for(const z of [-2.96,2.96])for(let x=-3.6;x<3.9;x+=.8){if(z>0&&Math.abs(x)<.85)continue;caixa('lambril',x,.54,z,.76,.77,.035,madeira);}
 for(const x of [-3.96,3.96])for(let z=-2.6;z<2.8;z+=.8)caixa('lambril',x,.54,z,.035,.77,.76,madeira);
 for(const x of [-.39,.39])for(const y of [.55,1.57])caixa('moldura-porta',x,y,2.81,.035,.78,.035,madeira);
 for(const z of [.45,1.35]){caixa('costura-sofa',2.61,.65,z,.012,.012,.72,escura);}
 // Lombadas com detalhes dourados e páginas aparentes.
 for(let i=0;i<20;i++){const x=-3.5+(i%7)*.2,y=.15+Math.floor(i/7)*.54,h=.25+(i%3)*.05;caixa('filete-livro',x,y+h*.85,-2.325,.11,.008,.008,latão);caixa('paginas-livro',x,y+h+.002,-2.48,.115,.008,.25,papel);}
 // Telefone cenográfico e pasta de investigação sobre a mesa.
 caixa('telefone-base',-.73,.92,-1.37,.31,.08,.22,escura);caixa('telefone-monofone',-.73,1.00,-1.37,.32,.055,.075,metal);
 const dial=cilindro('telefone-disco',-.73,.973,-1.30,.065,.012,latão);
 caixa('pasta-investigacao',.25,.895,-.92,.28,.018,.34,material(0x70603c));
 return grupo;
}
