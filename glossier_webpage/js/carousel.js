const carouselImages = ["carousel1.jpg", "carousel2.jpg", "carousel4.jpg", "carousel3.jpg"];
const carouselImgElement = document.getElementsByClassName("images")[0];

let currentImageIndex = 0;

function updateCarouselImage() {
    // Update the image source
    carouselImgElement.src = `./images/${carouselImages[currentImageIndex]}`;

    // Increment the current image index
    currentImageIndex++;

    // Reset the current image index if it exceeds the length of the images array
    if (currentImageIndex >= carouselImages.length) {
        currentImageIndex = 0;
    }
}

setInterval(updateCarouselImage, 2500);
