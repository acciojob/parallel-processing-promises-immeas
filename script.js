document.addEventListener("DOMContentLoaded", function () {
  const output = document.getElementById("output");
  const loadingDiv = document.createElement("div");
  loadingDiv.id = "loading";
  loadingDiv.textContent = "Loading images...";
  output.appendChild(loadingDiv);
  
  const errorDiv = document.createElement("div");
  errorDiv.id = "error";
  errorDiv.style.color = "red";
  output.appendChild(errorDiv);

  const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300"
  ];

  function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(`Failed to load image: ${url}`);
    });
  }

  function downloadImages() {
    errorDiv.textContent = "";
    loadingDiv.style.display = "block";
    
    const promises = imageUrls.map(downloadImage);

    Promise.all(promises)
      .then((images) => {
        loadingDiv.style.display = "none";
        images.forEach((img) => output.appendChild(img));
      })
      .catch((error) => {
        loadingDiv.style.display = "none";
        errorDiv.textContent = error;
      });
  }

  downloadImages();
});
