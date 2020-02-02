import { getRGBbyCordinates, getPixelIndexByCordinates, getNextAvailableColor } from './drawImage';
import { WIDTH, blue, green, cyan, red, black } from './constants';


test('Should return pixel index for cordinates x=100, y=100', () => {
  expect(getPixelIndexByCordinates(100, 100, WIDTH)).toBe(102800);
});


test('Should get color 255, 255, 255 for cordinates 31, 31, 31', () => {
  expect(getRGBbyCordinates(31, 31, 31)).toStrictEqual([255, 255, 255])
});
test('Should get color 0, 0, 0 for cordinates 0,0,0', () => {
  expect(getRGBbyCordinates(0, 0, 0)).toStrictEqual([7, 7, 7])
});


test('Test NextAvailableColor: test upperbound', ()=>{
  const lowerBound = [0,15,0];
  const upperBound = [15,31,15]
  let currentCordinates = [15,31,15]
  expect(getNextAvailableColor(lowerBound, upperBound, currentCordinates)).toStrictEqual(null);
});
test('Test NextAvailableColor: test just before upperbound', ()=>{
  const lowerBound = [0,15,0];
  const upperBound = [15,31,15]
  let currentCordinates = [15,31,14]
  expect(getNextAvailableColor(lowerBound, upperBound, currentCordinates)).toStrictEqual([15,31,15]);
});
test('Test NextAvailableColor: test Green increment', ()=>{
  const lowerBound = [0,15,0];
  const upperBound = [15,31,15]
  let currentCordinates = [14,31,15]
  expect(getNextAvailableColor(lowerBound, upperBound, currentCordinates)).toStrictEqual([15,15,0]);
});


describe('Test color count for each color', ()=> {
  for(let color of [black, red, green, blue]) {
    test(`Test for color: ${color.name}`, ()=>{
      let lastResult = null;
      let {lowerBoundary, upperBoundary, currentCordinates} = color;
      let colorCount = 0;
      do {
        lastResult = getNextAvailableColor(lowerBoundary, upperBoundary, currentCordinates);
        colorCount++;
      } while(lastResult);
    
      expect(currentCordinates).toStrictEqual(upperBoundary);
      expect(colorCount).toBe(4096);
    })
  }
});