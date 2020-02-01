import React, { useEffect, useRef } from 'react';
import { getImage } from '../../Utils/drawImage';

const Canvas = () => {

  const canvasElement = useRef(null);

  useEffect(()=>{
    const canvas = canvasElement.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.putImageData(getImage(), 0, 0);
  });
  return (
    <canvas
      ref={canvasElement}
    />
  )
}

export default Canvas;