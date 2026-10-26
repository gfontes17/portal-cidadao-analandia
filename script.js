(() => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("siteSearch");
  const searchFeedback = document.getElementById("searchFeedback");
  const cards = Array.from(document.querySelectorAll(".area-card"));
  const noResults = document.getElementById("noResults");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    }));
  }

  function filterAreas(query) {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    let count = 0;
    cards.forEach(card => {
      const searchable = (card.innerText + " " + (card.dataset.search || "")).toLocaleLowerCase("pt-BR");
      const match = !normalized || searchable.includes(normalized);
      card.hidden = !match;
      if (match) count += 1;
    });
    noResults.hidden = count !== 0;
    return count;
  }

  if (searchForm) {
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      const query = searchInput.value;
      const count = filterAreas(query);
      if (!query.trim()) {
        searchFeedback.textContent = "Digite um assunto para localizar uma área do portal.";
      } else if (count) {
        searchFeedback.textContent = `${count} ${count === 1 ? "área encontrada" : "áreas encontradas"}. Os resultados estão logo abaixo.`;
        document.getElementById("areas").scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        searchFeedback.textContent = "Não encontramos uma área para esse termo. Tente palavras como orçamento, Câmara, obras ou contratos.";
        document.getElementById("areas").scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    searchInput.addEventListener("input", () => {
      if (!searchInput.value.trim()) {
        filterAreas("");
        searchFeedback.textContent = "";
      }
    });
  }

  // Os links de sugestão ficam desativados como canal oficial até que um endereço real seja configurado.
  const suggestLink = document.getElementById("suggestLink");
  if (suggestLink) {
    suggestLink.addEventListener("click", event => {
      event.preventDefault();
      alert("O canal de sugestões ainda não foi configurado. Antes da publicação, adicione um e-mail de contato válido ou um formulário seguro.");
    });
  }
})();
