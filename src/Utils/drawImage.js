export const getImage = () => {
  const WIDTH = 256;
  const HEIGHT = 128;
  let imageArr = new Uint8ClampedArray(WIDTH*HEIGHT*4);
  for(let x =0; x<WIDTH*4; x++) {
    for(let y=0; y<HEIGHT; y++){
      imageArr[x+y*WIDTH*4] = 200;
    }
  }
  return new ImageData(imageArr, 256, 128);
}