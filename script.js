/* =========================================================
   CPPEM — Formulário → Google Sheets + Pixel + PixelX + WhatsApp
   ========================================================= */

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxdFplWVSfhTjvyIA7HIWb645xRjGNhBVhTdTf5UMjo0lSpW_A_jCuys0qB4uImKXPQ/exec?aba=CPPEM";

const WHATSAPP_REDIRECT = "https://wa.me/5581973105354?text=Quero%20come%C3%A7ar%20minha%20prepara%C3%A7%C3%A3o!%20%F0%9F%92%80%F0%9F%94%A5";

/* --- Elementos --- */
const form = document.getElementById("lead-form");
const telefoneInput = document.getElementById("telefone");
const modal = document.getElementById("lead-modal");
const openBtn = document.getElementById("open-modal");

/* --- Popup / Modal --- */
function openModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("nome")?.focus(), 60);
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

/* --- Máscara: (00) 00000-0000 ---
   DDD + 9 dígitos. Aceita número pré-preenchido (com código do país):
   se vier com mais dígitos, mantém o valor digitado sem bloquear. */
if (telefoneInput) {
  telefoneInput.addEventListener("input", () => {
    let d = telefoneInput.value.replace(/\D/g, "");

    // Número pré-preenchido / com código do país (> 11 dígitos):
    // não aplica a máscara nem bloqueia — mantém o que a pessoa colou/digitou.
    if (d.length > 11) return;

    let out = "";
    if (d.length > 0) out = "(" + d.slice(0, 2);
    if (d.length >= 2) out += ") ";
    if (d.length > 2) out += d.slice(2, 7);
    if (d.length > 7) out += "-" + d.slice(7, 11);

    telefoneInput.value = out;
  });
}

/* --- Validação --- */
function setError(id, msg) {
  const input = document.getElementById(id);
  const errorEl = document.querySelector(`[data-error-for="${id}"]`);

  if (input) input.classList.add("is-invalid");
  if (errorEl) errorEl.textContent = msg;
}

function clearError(id) {
  const input = document.getElementById(id);
  const errorEl = document.querySelector(`[data-error-for="${id}"]`);

  if (input) input.classList.remove("is-invalid");
  if (errorEl) errorEl.textContent = "";
}

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validate() {
  let ok = true;

  const nome = document.getElementById("nome")?.value.trim() || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const tel = telefoneInput?.value.replace(/\D/g, "") || "";

  ["nome", "email", "telefone"].forEach(clearError);

  if (nome.length < 2) {
    setError("nome", "Informe seu nome completo.");
    ok = false;
  }

  if (!isEmail(email)) {
    setError("email", "Informe um e-mail válido.");
    ok = false;
  }

  // DDD (2) + número (8 ou 9). Aceita também número pré-preenchido com
  // código do país (até 13 dígitos) sem bloquear.
  if (tel.length < 10 || tel.length > 13) {
    setError("telefone", "Informe o WhatsApp com DDD.");
    ok = false;
  }

  return ok;
}

/* --- Envio --- */
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const btn = form.querySelector("button[type='submit']");

    const btnLabel = btn ? btn.textContent : "";

    if (btn) {
      btn.disabled = true;
      btn.textContent = "ENVIANDO...";
    }

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = telefoneInput.value.trim();

    const payload = {
      nome: nome,
      email: email,
      telefone: telefone,
      origem: "pagina_captura_cppem",
      pagina: window.location.href,
      data_envio: new Date().toISOString()
    };

    try {
      // 1. Envia primeiro para o Google Sheets
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      // 2. Envia o evento de Lead para o dataLayer (Google Tag Manager)
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "lead",
          lead_name: nome,
          lead_email: email,
          lead_phone: telefone,
          page_url: window.location.href
        });
      } catch (dlError) {
        console.warn("[GTM] Erro ao enviar evento de lead:", dlError);
      }

      // 3. Fecha o popup e redireciona IMEDIATAMENTE (mesma aba)
      form.reset();
      closeModal();

      window.location.href = WHATSAPP_REDIRECT;

    } catch (err) {
      console.error("[Form] Erro ao enviar:", err);

      setError("telefone", "Erro ao enviar. Tente novamente.");

      if (btn) {
        btn.disabled = false;
        btn.textContent = btnLabel || "ENVIAR E FALAR NO WHATSAPP";
      }
    }
  });
}
