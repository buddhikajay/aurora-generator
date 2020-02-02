const WIDTH = 256;
const HEIGHT = 128;


/**
 * We are going to make a colour pallet in a 32x32x32 3D space. 
 * To represent this, we use a 3d cordinate system wheare RGB axises represnt x, y, z respectively and each vertice represent a unique color.
 * Min value of an axis 0. Max 31
 * Respective color is calculated by multiplying cordinate by , CORDINATE*8 +7. Therefor single increment alogside an axis represents 8 step increase in each color.
 * Lowest possible color value 7. Max 255
 * 
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} z 
 */
 export const getRBGbyCordinates = (x, y, z) => {
  return [x*8+7, y*8+7, z*8+7]
 }

 /**
  * 8 corners of 3d color pallet represents 8 colors. So, lets try to draw an image with 8 different colros.
  * Pure color points for each colors are as follows
  * 
  * Black: 0,0,0
  * Red: 31,0,0
  * Green: 0,31,0
  * Blue: 0,0,31
  * Yellow: 31,31,0
  * Magenta: 31,0,31
  * Ceyan: 0,31,31
  * White: 31,31,31
  * 
  * For ease of traversal, we can also define the boundaries for each color region
  * Lets define the closest point to 0,0,0 and the farmost point to 0,0,0
  * 
  * Black: 0,0,0 : 15,15,15
  * Red: 15,0,0 : 31,15,15
  * Green: 0,15,0 : 15,31,15
  * Blue: 0,0,15 : 15,15,31
  * Yellow: 15,15,0 : 31,31,15
  * Magneta: 15,0,15 : 31,15,31
  * Ceyan: 0,15,15 : 15,31,31
  * White: 15,15,15: 31,31,31 
  * 
  */

  /**
   * Given the upperbound and the currentindex, this function will return the next available color.
   * This function assumes that the initial currentCordinatesArr is initialized to the lower bound
   */
 export const getNextAvailableColor = (loweboundArr, upperBoundArr, currentCordindatesArr) => {

  if(currentCordindatesArr[2]>=upperBoundArr[2]){
    currentCordindatesArr[2] = loweboundArr[2];
    //We have reached the upper bound for Blue.
    // Need to increment Green. Lets check wheather we have reached the upper bound of Green as well.
    if(currentCordindatesArr[1]>=upperBoundArr[1]){
      // Since we have reached the uppor bound of Green, we have to increment Red
      currentCordindatesArr[1] =  loweboundArr[1];
      if(currentCordindatesArr[0]>=upperBoundArr[0]){
        //We have ran out of colors
        return null;
      } else{
        //We can increment red
        currentCordindatesArr[0]++;
      }
    } else {
      currentCordindatesArr[1]++;
    }

  } else {
    //Cool. We can increment Blue.
    currentCordindatesArr[2]++; 
  }

  return currentCordindatesArr;
 }

export const getImage = () => {
  let imageArr = new Uint8ClampedArray(WIDTH*HEIGHT*4);
  let redVal = 0;
  let blueVal = 0;
  let greenVal = 0;

  for(let y=0; y<HEIGHT; y++) {
    for(let x =0; x<WIDTH; x++){

      const pixelIndex = getPixelIndexByCordinates(x, y, WIDTH);
      greenVal++;
      if(greenVal>=32){
        greenVal=0;
        blueVal++;
      }
      if(blueVal>=32){
        blueVal=0;
        redVal++;
      }

      // imageArr[pixelIndex] = 255;
      // imageArr[pixelIndex+1] = 255;
      // imageArr[pixelIndex+2] = 255;
      // imageArr[pixelIndex+3] = 255;


      imageArr[x*4+y*WIDTH*4] = redVal*8;
      imageArr[x*4+1+y*WIDTH*4] = greenVal*8;
      imageArr[x*4+2+y*WIDTH*4] = blueVal*8;
      imageArr[x*4+3+y*WIDTH*4] = 255;
      
    }
  }

  drawMountains(imageArr);
  drawLake(imageArr);
  console.log(`valule: ${redVal}, ${blueVal}, ${greenVal}`)
  console.log(`Sample alpha: ${imageArr[3]}`)
  return new ImageData(imageArr, WIDTH, HEIGHT);
}

const drawMountains = (imageArr) => {
  for(let x =0; x< WIDTH; x++) {
    let y = Math.round( Math.abs( 20*Math.sin(x/10)+70 ) );
    if(y<HEIGHT) {
      console.log(`x: ${x}, y: ${y}`);
      const index = getPixelIndexByCordinates(x, y, WIDTH);
      imageArr[index] = 255;
      imageArr[index+1] = 0;
      imageArr[index+2] = 0;
    }

  }
}

const drawLake = (imageArr) => {
  for(let x =0; x< WIDTH; x++) {
    let y = Math.round( Math.abs( 20*Math.abs(Math.sin(x/5 + 20))+100 ) );
    if(y<HEIGHT) {
      console.log(`x: ${x}, y: ${y}`);
      const index = getPixelIndexByCordinates(x, y, WIDTH);
      imageArr[index] = 255;
      imageArr[index+1] = 0;
      imageArr[index+2] = 0;
    }

  }
}

/**
 * Returns the index of the red colour of a pixel.
 * More info: https://developer.mozilla.org/en-US/docs/Web/API/ImageData 
 * @param {*} x cordinate 
 * @param {*} y cordinate
 * @param {*} width of the image
 */
export const getPixelIndexByCordinates = (x, y, width) => {
  return x*4+y*width*4;
}

export const paintRecursively = (lastX, lastY, lastRedValue, lastBlueValue, lastGreenValue, isWithingBoundary) => {

}