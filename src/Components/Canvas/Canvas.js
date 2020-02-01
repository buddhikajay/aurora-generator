import React, {useEffect, useRef} from 'react';

const Canvas = () => {

  const canvasElement = useRef(null);

  useEffect(()=>{
    const canvas = canvasElement.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 256, 128);
  });
  return (
    <canvas
      ref={canvasElement}
    />
  )
}

export default Canvas;