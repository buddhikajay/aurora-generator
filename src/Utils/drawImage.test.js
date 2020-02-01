import { getColorByCordinates, getPixelIndexByCordinates } from './drawImage';


test('Should get color 255, 255, 255 for cordinates 31, 31, 31', () => {
  expect(getColorByCordinates(31, 31, 31)).toStrictEqual([255, 255, 255])
})
test('Should get color 0, 0, 0 for cordinates 0,0,0', () => {
  expect(getColorByCordinates(0, 0, 0)).toStrictEqual([7, 7, 7])
})
test('Should return pixel index for cordinates x=100, y=100', () => {
  expect(getPixelIndexByCordinates(100, 100, 256)).toBe(102800);
})