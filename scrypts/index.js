const initialCards = [
    'images/header image/11.jpg',
    'images/header image/11 (1).jpg',
    'images/header image/Untitled-1 2.jpg'
];

const header = document.querySelector('.header');
let currentIndex = 0;

header.style.backgroundImage = `url('${initialCards[currentIndex]}')`;
header.style.transition = 'background-image 1s ease';

currentIndex = (currentIndex + 1) % initialCards.length;

function changeBackground() {
    header.style.backgroundImage = `url('${initialCards[currentIndex]}')`;
    currentIndex = (currentIndex + 1) % initialCards.length;
}
setInterval(changeBackground, 5000);

document.addEventListener('DOMContentLoaded', () => {
  const attachContainer = document.querySelector('.screenshot-attach');
  const fileInput = attachContainer.querySelector('.file-input');
  const placeholderText = attachContainer.querySelector('.text');
  const imagesContainer = attachContainer.querySelector('.images-container');
  const maxImages = 6;

  attachContainer.addEventListener('click', () => {
    if (imagesContainer.children.length < maxImages) {
      fileInput.click();
    } else {
      alert(`Можно прикрепить максимум ${maxImages} изображений`);
    }
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file && file.type.startsWith('image/')) {
      if (imagesContainer.children.length >= maxImages) {
        alert(`Достигнут лимит ${maxImages} изображений`);
        return;
      }

      const reader = new FileReader();
      reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'screenshot-preview';
        img.addEventListener('click', () => {
          img.remove();
          if (imagesContainer.children.length === 0) {
            placeholderText.style.display = 'block';
          }
        });
        img.addEventListener('dblclick', () => {
          img.remove();
          if (imagesContainer.children.length === 0) {
            placeholderText.style.display = 'block';
          }
        });
        img.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          img.remove();
          if (imagesContainer.children.length === 0) {
            placeholderText.style.display = 'block';
          }
        });
        imagesContainer.appendChild(img);
        placeholderText.style.display = 'none';
        fileInput.value = '';
      };
      reader.readAsDataURL(file);
    } else {
      alert('Пожалуйста, выберите изображение.');
    }
  });
});