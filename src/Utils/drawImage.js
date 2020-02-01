const WIDTH = 256;
const HEIGHT = 128;

export const getImage = () => {
  let imageArr = new Uint8ClampedArray(WIDTH*HEIGHT*4);
  let redVal = 0;
  let blueVal = 0;
  let greenVal = 0;

  for(let y=0; y<HEIGHT; y++) {
    for(let x =0; x<WIDTH; x++){
      greenVal++;
      if(greenVal>=32){
        greenVal=0;
        blueVal++;
      }
      if(blueVal>=32){
        blueVal=0;
        redVal++;
      }

      imageArr[x*4+y*WIDTH*4] = redVal*8;
      imageArr[x*4+1+y*WIDTH*4] = greenVal*8;
      imageArr[x*4+2+y*WIDTH*4] = blueVal*8;
      imageArr[x*4+3+y*WIDTH*4] = 255;
    }
    console.log(`valule: ${redVal}, ${blueVal}, ${greenVal}`)
  }
  return new ImageData(imageArr, 256, 128);
}

// export const getImage2 = () => {
//   let imageArr = new Uint8ClampedArray(WIDTH*HEIGHT*4);
//   for(let redStep=0; redStep<32; redStep++){
//     for(let blueStep=0; blueStep<256; blueStep++) {
//       for(let greenStep=0; greenStep<256; greenStep++) {
//         imageArr[redStep*greenStep*blueStep] = 
//       }
//     }
//   }
// }