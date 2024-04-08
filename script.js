document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("result");
  const previewBtn = document.getElementById("preview");
  const downloadBtn = document.getElementById("downloadBtn");
  const fontFamilySelect = document.getElementById("fontFamily");
  const fontColorInput = document.getElementById("fontColor");
  const inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]');

  const ctx = canvas.getContext("2d");

  previewBtn.addEventListener("click", previewCard);
  downloadBtn.addEventListener("click", downloadCard);

  // Add event listeners for input fields for animation while typing
  inputs.forEach(input => {
      input.addEventListener('input', () => {
          input.classList.add('input-animation');
          setTimeout(() => {
              input.classList.remove('input-animation');
          }, 500);
      });
  });

  function previewCard() {
      const inName = document.getElementById("inName").value;
      const inBirth = document.getElementById("inBirth").value;
      const inField = document.getElementById("inField").value;
      const inYear = document.getElementById("inYear").value;
      const inNum = document.getElementById("inNum").value;
      const fontFamily = fontFamilySelect.value;
      const fontColor = fontColorInput.value;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Animation
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const radius = Math.random() * 5;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${Math.random()})`;
          ctx.fill();
      }

      ctx.fillStyle = fontColor;
      ctx.font = `20px ${fontFamily}`;
      ctx.fillText("College ID Card", 10, 25);
      ctx.font = "16px Arial";
      ctx.fillText("Undergraduate", 15, 45);

      const logo = new Image();
      logo.src = "logo.png";
      logo.onload = function() {
          ctx.drawImage(logo, canvas.width - 80, 3, 50, 50);
      };

      const image = new Image();
      image.src = URL.createObjectURL(document.getElementById("file").files[0]);
      image.onload = function() {
          ctx.drawImage(image, 10, 65, 80, 110);
      };

      ctx.fillText(inName, 110, 90);
      ctx.fillText(inBirth, 110, 115);
      ctx.fillText(inField + "0" + inYear, 110, 140);
      ctx.fillText("SubN° " + inNum, 110, 165);

      document.getElementById("collegeCard").style.display = "block";
  }

  function downloadCard() {
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "Id_Card.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
});
