# Escape Reality VR

Jogo web de investigação e escape room. ISSUE 01: protótipo navegável do escritório.

## Executar

```powershell
python -m http.server 8085 --bind 127.0.0.1
```

Abra http://localhost:8085. É necessária conexão com a internet para carregar Three.js 0.170.0 via CDN.

## Controles

WASD: andar; mouse: olhar; Shift: correr; Ctrl: agachar; Esc: pausar.

## Estado

Motor Three.js, cenário procedural, colisões horizontais, menus e configurações. Reiniciar restaura a posição sem reconstruir a cena. A janela é cenográfica. Não há interações com objetos, enigmas, áudio, Firebase ou VR funcional ainda. Ranking e multiplayer serão implementados posteriormente.

## Validação

Verificar no navegador a inicialização, controles, colisões, iluminação, pausa, reinício, redimensionamento e configurações. O desempenho varia conforme o hardware.
