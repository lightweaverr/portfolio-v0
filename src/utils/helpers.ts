import * as THREE from 'three';

let count = 0;

function areUint8ArraysEqual(arr1: Uint8Array, arr2: Uint8Array) {
  // Check if both arrays have the same length
  if (arr1.length !== arr2.length) {
    console.log(`Arrays have different lengths: ${arr1.length} vs ${arr2.length}`);
    return false;
  }

  let unequalCount = 0; // Counter to track the number of unequal elements

  // Compare each element in the arrays
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      unequalCount++;
    }
  }

  console.log(`Number of unequal elements: ${unequalCount}`);

  return unequalCount === 0;
}


interface CanvasSize {
  width: number;
  height: number;
}

// Main function to create a data texture for a cellular automaton
export function createDataTexture(canvasSize: CanvasSize): THREE.DataTexture {
  // Destructure width and height from the input
  const { width, height } = canvasSize;

  // Calculate total number of pixels
  const size = width * height;

  // Create a Uint8Array to store pixel data (8-bit unsigned integers)
  const data = new Uint8Array(size);

  // Utility function to set a pixel value in the texture
  const setPixel = (x: number, y: number, value: number) => {
    // Boundary check to prevent out-of-bounds array access
    if (x >= 0 && x < width && y >= 0 && y < height) {
      // Calculate 1D index from 2D coordinates
      // y * width gives the start of the row, then add x to get the specific pixel
      data[y * width + x] = value;
    }
  };

  // Function to create a glider gun pattern
  const createGliderGun = (startX: number, startY: number, flipHorizontal: boolean) => {
    // Predefined coordinates for a classic Game of Life glider gun
    const gun = [
      [0, 4], [0, 5], [1, 4], [1, 5], [10, 4], [10, 5], [10, 6], [11, 3], [11, 7],
      [12, 2], [12, 8], [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4],
      [16, 5], [16, 6], [17, 5], [20, 2], [20, 3], [20, 4], [21, 2], [21, 3],
      [21, 4], [22, 1], [22, 5], [24, 0], [24, 1], [24, 5], [24, 6], [34, 2],
      [34, 3], [35, 2], [35, 3]
    ];

    // Iterate through each coordinate in the gun pattern
    gun.forEach(([x, y]) => {
      let px: number, py: number;

      // Handle horizontal flipping if needed
      if (flipHorizontal) {
        px = startX - x;  // Reverse x-coordinate for mirroring
      } else {
        px = startX + x;
      }
      py = startY + y;

      // Set the pixel to full brightness (255)
      setPixel(px, py, 255);
    });
  };

  // Fill the entire texture with random noise
  for (let i = 0; i < size; i++) {
    // 50% chance of being black (0) or white (255)
    data[i] = Math.random() < 0.2 ? 255 : 0;
  }

  // Clear the edge bands to create a border (50 pixels on each side)
  for (let y = 0; y < height; y++) {
    // Clear left edge
    for (let x = 0; x < 50; x++) {
      data[y * width + x] = 0;
    }

    // Clear right edge
    for (let x = 0; x < 50; x++) {
      data[y * width + (width - 1 - x)] = 0;
    }
  }

  // Create glider guns on opposite sides of the texture
  // Left side gun shooting right
  let curHeight = 10;

  while (curHeight < height) {
    createGliderGun(3, curHeight, false);

    createGliderGun(width - 5, curHeight, true);

    curHeight += 30;
  }

  // createGliderGun(3, Math.floor(height / 2 - 20), false);

  // // Right side gun shooting left
  // createGliderGun(width - 5, Math.floor(height / 2 - 20), true);

  // Create Three.js DataTexture
  const texture = new THREE.DataTexture(
    data,       // Pixel data
    width,      // Texture width
    height,     // Texture height
    THREE.RedFormat  // Single channel texture (8-bit)
  );

  // Important: Mark texture as needing an update
  texture.needsUpdate = true;

  return texture;
}

