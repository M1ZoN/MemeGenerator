var images = JSON.parse(localStorage.getItem("images"))
  ? JSON.parse(localStorage.getItem("images"))
  : [];

document.getElementById("generate-btn").addEventListener("click", function () {
  let imageURL = document.querySelector("#imageURL").value;
  if (imageURL.length > 0) {
    let topText = document.getElementById("top-text").value;
    let bottomText = document.getElementById("bottom-text").value;

    let image = {};
    image.src = imageURL;
    image.topText = topText;
    image.bottomText = bottomText;

    images.push(image);

    localStorage.setItem("images", JSON.stringify(images));
    window.location.reload();
  } else {
    alert("You need ImageURL to create Memes!");
  }
});

const generateMeme = (img, idx, total) => {
  let canvas = document.createElement("canvas");
  let div = document.createElement("div");
  let overlay = document.createElement("div");
  let memeContainer = document.querySelector(".meme-container");
  let ctx = canvas.getContext("2d");
  let image = new Image();
  let deleteIco = new Image();

  canvas.width = 350;
  canvas.height = 350;
  div.setAttribute("class", "memecanvas");
  if (total === 1) {
    overlay.setAttribute("class", "overlay1");
  } else if (total === 2) {
    overlay.setAttribute("class", "overlay2");
  } else {
    overlay.setAttribute("class", "overlay3");
  }
  deleteIco.src =
    "https://www.vippng.com/png/full/493-4930781_letter-png-white-x-letter-png.png";
  deleteIco.width = 150;
  deleteIco.height = 150;
  deleteIco.classList = "deleteIco";
  deleteIco.id = idx;
  overlay.appendChild(deleteIco);
  div.appendChild(overlay);
  div.appendChild(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  image.onload = function () {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.fillText(img.topText, canvas.width / 2, 50);
    ctx.strokeText(img.topText, canvas.width / 2, 50);
    ctx.fillText(img.bottomText, canvas.width / 2, 340);
    ctx.strokeText(img.bottomText, canvas.width / 2, 340);
  };
  image.src = img.src;
  ctx.font = "45px Impact";
  ctx.fillStyle = "white";
  ctx.lineWidth = "2";
  ctx.textAlign = "center";
  memeContainer.appendChild(div);
};

const main = () => {
  let total = images.length;
  images.map((img, idx) => {
    generateMeme(img, idx, total);
  });
};

if (images.length > 0) {
  main();
  let deleteIco = document.querySelectorAll(".deleteIco");
  for (let i = 0; i < deleteIco.length; i++) {
    deleteIco[i].addEventListener("click", () => {
      let idx = parseInt(deleteIco[i].id);
      images.splice(idx, 1);
      localStorage.setItem("images", JSON.stringify(images));
      window.location.reload();
    });
  }
}
