/* =========================================================
   CPPEM — Formulário → Google Sheets + Pixel + PixelX + WhatsApp
   ========================================================= */

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxdFplWVSfhTjvyIA7HIWb645xRjGNhBVhTdTf5UMjo0lSpW_A_jCuys0qB4uImKXPQ/exec?aba=CPPEM";

const WHATSAPP_REDIRECT = "https://wa.me/5581973105354?text=Quero%20come%C3%A7ar%20minha%20prepara%C3%A7%C3%A3o!%20%F0%9F%92%80%F0%9F%94%A5";

/* Tempo antes de redirecionar. A conversão da PixelX é assíncrona (debounce de
   ~1500 ms); navegar antes disso cancela a requisição e o Lead se perde,
   principalmente no mobile. Antes daqui o redirect era imediato. §7.6. */
const REDIRECT_DELAY_MS = 1500;

/* Identificador deste site no painel — o mesmo valor do id do <form>. */
const PIXELX_ID = "IPEyzyfmJhKQEYIXAlZH";

/* --- Elementos --- */
const form = document.getElementById(PIXELX_ID);

/* Referências explícitas (§6.0): com name="name", o acesso `form.name`
   colidiria com a propriedade nativa HTMLFormElement.name — mesma família de
   armadilha do §7.3. */
const nomeInput = document.getElementById("lead_name");
const emailInput = document.getElementById("lead_email");
const telefoneInput = document.getElementById("lead_phone");
const submitBtn = document.getElementById("lead_submit");

const modal = document.getElementById("lead-modal");
const openBtn = document.getElementById("open-modal");

/* Falha barulhenta em vez de silenciosa (§8.1). */
if (!form) {
  console.error(
    `[tracking] Formulário "${PIXELX_ID}" não encontrado. Este id é o ` +
    `identificador do painel e precisa estar no <form>.`
  );
}
if (document.querySelectorAll(`[id="${PIXELX_ID}"]`).length > 1) {
  console.error(`[tracking] id "${PIXELX_ID}" duplicado na página.`);
}

/* --- Popup / Modal --- */
function openModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => nomeInput?.focus(), 60);
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/* Todos os gatilhos que abrem o popup: botão principal + "Suporte via WhatsApp" no rodapé */
document
  .querySelectorAll("#open-modal, [data-open-modal]")
  .forEach((el) => el.addEventListener("click", openModal));

if (modal) {
  modal.querySelectorAll("[data-close]").forEach((el) =>
    el.addEventListener("click", closeModal)
  );
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});

/* --- Validação ---
   A chave do erro é o valor de data-error-for (= atributo name do campo). */
function setError(errorKey, input, msg) {
  const errorEl = document.querySelector(`[data-error-for="${errorKey}"]`);

  if (input) input.classList.add("is-invalid");
  if (errorEl) errorEl.textContent = msg;
}

function clearError(errorKey, input) {
  const errorEl = document.querySelector(`[data-error-for="${errorKey}"]`);

  if (input) input.classList.remove("is-invalid");
  if (errorEl) errorEl.textContent = "";
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/* Conta DÍGITOS, não caracteres, e remove o "+55" da máscara pelo "+" literal
   antes de contar (§7.7). O "+55" é texto FIXO da máscara: aparece desde o
   primeiro caractere digitado e somaria 2 dígitos, deixando passar número
   incompleto. Remover pelos dígitos seria ambíguo — o DDD 55 existe.

   O campo era "livre" (só não podia ficar em branco), o que aceitava "a" e
   mandava telefone inválido para a PixelX. */
const isPhone = (v) => {
  const nacional = v.trim().replace(/^\+\s*55\s*/, "");
  const d = nacional.replace(/\D/g, "");

  return d.length === 11 && d[2] === "9";
};

function validate() {
  let ok = true;

  const nome = nomeInput?.value.trim() || "";
  const email = emailInput?.value.trim() || "";
  const tel = telefoneInput?.value.trim() || "";

  clearError("name", nomeInput);
  clearError("email", emailInput);
  clearError("phone", telefoneInput);

  if (nome.length < 2) {
    setError("name", nomeInput, "Informe seu nome completo.");
    ok = false;
  }

  if (!isEmail(email)) {
    setError("email", emailInput, "Informe um e-mail válido.");
    ok = false;
  }

  if (!isPhone(tel)) {
    setError("phone", telefoneInput, "Informe seu WhatsApp com DDD — ex: (81) 90000-0000.");
    ok = false;
  }

  return ok;
}

/* --- Envio ---
   Quem dispara o Lead é a regra de conversão do painel, vinculada ao id do
   <form>. Este arquivo NÃO emite conversão.

   Havia aqui um dataLayer.push({event:"lead"}) que era um SEGUNDO emissor: com
   um acionador no GTM para esse evento, cada envio contaria dois Leads (§4/§5).
   Removido — existe exatamente um emissor, e ele é o painel. */
const BTN_LABEL = "ENVIAR E FALAR NO WHATSAPP";

let enviando = false;

async function enviar() {
  if (enviando) return;
  enviando = true;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "ENVIANDO...";
  }

  const payload = {
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    telefone: telefoneInput.value.trim(),
    origem: "mentoria_individual",
    pagina: window.location.href,
    data_envio: new Date().toISOString()
  };

  try {
    await fetch(SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("[Form] Erro ao enviar:", err);

    enviando = false;
    setError("phone", telefoneInput, "Erro ao enviar. Tente novamente.");

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = BTN_LABEL;
    }
    return;
  }

  /* NÃO chamar form.reset() aqui: a PixelX lê os campos no blur, e limpar o
     formulário antes de ela concluir faz gravar valores vazios. §7.6.
     O closeModal() também sai daqui pelo mesmo motivo — esconder o formulário
     enquanto a conversão está em voo é risco desnecessário. */
  const successEl = document.getElementById("form-success");

  if (successEl) {
    successEl.hidden = false;
    successEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  setTimeout(() => {
    window.location.href = WHATSAPP_REDIRECT;
  }, REDIRECT_DELAY_MS);
}

/* PRIMEIRA BARREIRA — no clique do botão, fase de captura. §7.8.
   Se os dados forem inválidos, o preventDefault cancela a ação padrão do botão
   e o navegador NUNCA chega a disparar o evento "submit" — é isso que impede a
   PixelX de registrar uma conversão incompleta. O Enter também passa por aqui,
   via submissão implícita. */
submitBtn?.addEventListener(
  "click",
  (e) => {
    if (!validate()) e.preventDefault();
  },
  true
);

/* SEGUNDA BARREIRA — "submit" capturado no DOCUMENT, em fase de captura. §7.8.
   Roda SEMPRE antes de qualquer listener registrado no próprio <form>,
   independente de quem registrou primeiro — a PixelX registra o dela de dentro
   de um start() assíncrono.

   - Inválido -> stopImmediatePropagation(): o evento morre aqui.
   - Válido   -> propaga, e a PixelX registra a conversão. */
document.addEventListener(
  "submit",
  (e) => {
    if (!form || e.target !== form) return;

    e.preventDefault();

    if (!validate()) {
      e.stopImmediatePropagation();
      return;
    }

    enviar();
  },
  true
);
