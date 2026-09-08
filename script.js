document.addEventListener("DOMContentLoaded", () => {
  // 1. Target your custom class buttons
  const copyButtons = document.querySelectorAll(".copy-code");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      // 2. Find the nearest <pre> container, then find its <code> tag
      const preBlock = button.closest("pre");
      if (!preBlock) return;
      
      const codeBlock = preBlock.querySelector("code");
      const textToCopy = codeBlock ? codeBlock.innerText : preBlock.innerText;

      try {
        // 3. Write to the clipboard
        await navigator.clipboard.writeText(textToCopy);
        
        // 4. Change button content to Font Awesome checkmark
        const originalHTML = button.innerHTML; // Saves original text or icons
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add("copied");

        // Disable button briefly to prevent double-clicks during animation
        button.style.pointerEvents = "none";

        // 5. Reset back to original state after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove("copied");
          button.style.pointerEvents = "auto";
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
        button.innerText = "Error";
      }
    });
  });
});
