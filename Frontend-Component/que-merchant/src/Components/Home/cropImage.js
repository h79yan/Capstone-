const getCroppedImg = (imageSrc, croppedAreaPixels) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Set canvas dimensions
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Draw the cropped area of the image onto the canvas
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      // Convert canvas to blob or base64
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const fileUrl = URL.createObjectURL(blob);
            resolve(fileUrl);
          } else {
            reject(new Error('Canvas is empty'));
          }
        },
        'image/jpeg',
        0.9 // Image quality
      );
    };

    image.onerror = () => {
      reject(new Error('Failed to load image'));
    };
  });
};

export default getCroppedImg;