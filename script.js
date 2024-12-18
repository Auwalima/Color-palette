const fileInput = document.getElementById("fileInput");
      const imagePreview = document.getElementById("imagePreview");
      const paletteContainer = document.getElementById("palette");
      const colorThief = new ColorThief();

      fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();

          reader.onload = function (e) {
            imagePreview.style.display = "block";
            imagePreview.src = e.target.result;

            imagePreview.onload = function () {
              const palette = colorThief.getPalette(imagePreview, 8);
              displayPalette(palette);
            };
          };

          reader.readAsDataURL(file);
        }
      });

      function displayPalette(palette) {
        paletteContainer.innerHTML = "";

        palette.forEach((color) => {
          const [r, g, b] = color;
          const colorBox = document.createElement("div");
          colorBox.className = "color-box";
          colorBox.style.backgroundColor = `rgb(${r},${g},${b})`;

          const hexColor = rgbToHex(r, g, b);
          const colorValue = document.createElement("div");
          colorValue.className = "color-value";
          colorValue.textContent = hexColor;

          colorBox.appendChild(colorValue);
          paletteContainer.appendChild(colorBox);

          colorBox.addEventListener("click", () => {
            navigator.clipboard.writeText(hexColor);
            alert(`Color ${hexColor} copied to clipboard!`);
          });
        });
      }

      function rgbToHex(r, g, b) {
        return (
          "#" +
          [r, g, b]
            .map((x) => {
              const hex = x.toString(16);
              return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
        );
      }