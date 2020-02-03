export const WIDTH = 256;
export const HEIGHT = 128;

// Colors and  Boundaries
export const black = {name: 'Black', lowerBoundary: [0,0,0], upperBoundary: [15,15,15], currentCordinates: [0,0,-1]}
export const red = {name: 'Red', lowerBoundary: [16,0,0], upperBoundary: [31,15,15], currentCordinates: [16,0,-1]}
export const green = {name:'Green', lowerBoundary: [0,16,0], upperBoundary: [15,31,15], currentCordinates: [0,16,-1]}
export const blue = {name: 'Blue', lowerBoundary: [0,0,16], upperBoundary: [15,15,31], currentCordinates: [0,0,15]}
export const yellow = {name: 'Yellow', lowerBoundary: [16,16,0], upperBoundary: [31,31,15], currentCordinates: [16,16,-1]}
export const magenta = {name: 'Magenta', lowerBoundary: [16,0,16], upperBoundary: [31,15,31], currentCordinates: [16,0,15]}
export const cyan = {name: 'Cyan', lowerBoundary: [0,16,16], upperBoundary: [15,31,31], currentCordinates: [0,16,15]}
export const white = {name:'White', lowerBoundary: [16,16,16], upperBoundary: [31,31,31], currentCordinates: [16,16,15]}