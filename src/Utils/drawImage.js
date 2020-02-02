import { HEIGHT, WIDTH, black, red, green, blue, yellow, magenta, cyan, white} from './constants';


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
 export const getRGBbyCordinates = (x, y, z) => {
  return [x*8+7, y*8+7, z*8+7]
 }

 /**
  * 8 corners of 3d color pallet represents 8 color buckets. So, lets try to draw an image with 8 different colros (color buckets).
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
  * For ease of traversal, we can also define the boundaries for each color bucket. These are defined in the constants file
  * 
  */

  /**
   * Given the upperbound and the currentindex, this function will return the next available color.
   * This function assumes that the initial currentCordinatesArr is initialized to the lower bound
   */
 export const getNextAvailableColor = (loweboundArr, upperBoundArr, currentCordindatesArr) => {

  if(currentCordindatesArr[2]>=upperBoundArr[2]){
    //We have reached the upper bound for Blue.
    // Need to increment Green. Lets check wheather we have reached the upper bound of Green as well.
    if(currentCordindatesArr[1]>=upperBoundArr[1]){
      // Since we have reached the uppor bound of Green, we have to increment Red
      if(currentCordindatesArr[0]>=upperBoundArr[0]){
        //We have ran out of colors
        return null;
      } else{
        //We can increment red
        currentCordindatesArr[0]++;
      }
      currentCordindatesArr[1] =  loweboundArr[1];
    } else {
      currentCordindatesArr[1]++;
    }
    currentCordindatesArr[2] = loweboundArr[2];

  } else {
    //Cool. We can increment Blue.
    currentCordindatesArr[2]++; 
  }

  return currentCordindatesArr;
 }

export const getImage = () => {
  let imageArr = new Uint8ClampedArray(WIDTH*HEIGHT*4);
  artist(imageArr);
  return new ImageData(imageArr, WIDTH, HEIGHT);
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
 * We are going to draw the sky, mountains and forest with trees.. ha ha
 * We will be scanning the image from top to bottom, then left to right
 * In each iteration we will have two boundaries, mountain boundary and forestBoundary
 * 
 * Sky will be drawn with colors Yellow, white, red and magenta
 * Mountain : Blue, Back
 * Forest: Green, Cyan
 * 
 * If we run out of colors, we'll be using available colors
 * 
 */
const artist = (imageArr) => {
  let skyColors = [white,yellow, cyan, green]

  for(let x=0; x<WIDTH; x++) {
    const mountainBoundary = Math.round( Math.abs( 20*Math.sin(x/35)+50 ) );
    drawAlongYAxisFromTopToBottom(x, 0, mountainBoundary, skyColors, imageArr);
  }

  for(let x=0; x<WIDTH; x++) {

    skyColors.push(red, blue, magenta, black)
    const mountainBoundary = Math.round( Math.abs( 20*Math.sin(x/35)+50 ) );
    drawAlongYAxisFromTopToBottom(x, mountainBoundary, HEIGHT, skyColors, imageArr);
  }
  console.log(`Available colors : red: ${red.currentCordinates}, green: ${green.currentCordinates}`)
  return new ImageData(imageArr, WIDTH, HEIGHT);
}


const drawAlongYAxisFromTopToBottom = (x, yMin, yMax, colorBucketArray, imageArr) => {

  for(let y=yMin; y<yMax; y++) {

    if(colorBucketArray.length===0) {
      break;
    }
    //To make the color distribution even, we selet a randomr color from multiple color buckets
    let random = getRandomInt(colorBucketArray.length);
    // console.log(`random : ${random}, colorBucketArrayLength: ${colorBucketArray.length}`)
    let {lowerBoundary, upperBoundary, currentCordinates} = colorBucketArray[random];
    let colorCordinates = getNextAvailableColor(lowerBoundary, upperBoundary, currentCordinates);
    
    // if the color bucket is empty, remote it from the bucket array.
    while(colorCordinates==null) {
      colorBucketArray.splice(random, 1);
      if(colorBucketArray.length === 0) {
        break;
      }
      random = getRandomInt(colorBucketArray.length);
      try {
        let {lowerBoundary, upperBoundary, currentCordinates} = colorBucketArray[random];
        colorCordinates = getNextAvailableColor(lowerBoundary, upperBoundary, currentCordinates);
      } catch (error) {
        console.log(error);
        // console.log(`random : ${random}, colorBucketArrayLength: ${colorBucketArray.length}`)
      }
    }

    if(colorCordinates) {
      try {
        paitPixelByColorCordinates(x, y, ...colorCordinates, imageArr);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const paitPixelByColorCordinates = (x,y,redCordinate,greenCordinate,blueCordinate,imageArr) => {
  const pixelIndex = getPixelIndexByCordinates(x,y,WIDTH);
  const [red, green, blue] = getRGBbyCordinates(redCordinate, greenCordinate, blueCordinate);
  imageArr[pixelIndex] = red;
  imageArr[pixelIndex+1] = green;
  imageArr[pixelIndex+2] = blue;
  imageArr[pixelIndex+3] = 255;
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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

