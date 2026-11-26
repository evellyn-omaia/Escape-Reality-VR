import { MotorJogo } from "./motor/motor-jogo.js";
const obter = (id) => document.getElementById(id);
const menu = obter("menu"),
  hud = obter("hud"),
  iniciar = obter("iniciar"),
  mensagem = obter("mensagem");
let partida = false;
const motor = new MotorJogo(obter("cenario"), (ativo) => {
  if (ativo) partida = true;
  menu.hidden = ativo;
  hud.hidden = !ativo;
  iniciar.textContent = partida
    ? "Continuar investigação"
    : "Iniciar investigação";
  obter("reiniciar").hidden = !partida;
  obter("voltar").hidden = !partida;
  mensagem.textContent = partida
    ? "Investigação pausada."
    : "Uma sala. Uma investigação. Uma saída.";
});
async function entrar() {
  try {
    await motor.iniciar();
  } catch (erro) {
    mensagem.textContent =
      "Não foi possível capturar o mouse. Clique novamente ou use outro navegador.";
    console.error(erro);
  }
}
iniciar.addEventListener("click", entrar);
obter("reiniciar").addEventListener("click", () => {
  motor.reiniciar();
  entrar();
});
obter("voltar").addEventListener("click", () => {
  motor.reiniciar();
  partida = false;
  iniciar.textContent = "Iniciar investigação";
  obter("reiniciar").hidden = true;
  obter("voltar").hidden = true;
  mensagem.textContent = "Uma sala. Uma investigação. Uma saída.";
});
obter("sensibilidade").addEventListener(
  "input",
  (e) => (motor.controles.sensibilidade = Number(e.target.value))
);
obter("exposicao").addEventListener(
  "input",
  (e) => (motor.renderizador.webgl.toneMappingExposure = Number(e.target.value))
);
obter("qualidade").addEventListener("change", (e) =>
  motor.renderizador.qualidade(e.target.value)
);
document.addEventListener("pointerlockerror", () => {
  mensagem.textContent =
    "O navegador bloqueou o controle do mouse. Tente novamente.";
});
