class ImageLoader {
  name_to_image: Map<string, HTMLImageElement>;

  constructor() {
    this.name_to_image = new Map();
  }

  addImages(namesToImageUrls: Map<string, string>) {
    namesToImageUrls.forEach((url, name) => {
      loadImage(url).then((image) => this.name_to_image.set(name, image));
    });
  }
}

function loadImage(img_url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    image.src = img_url;
  });
}
