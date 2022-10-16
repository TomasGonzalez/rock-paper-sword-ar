import React from 'react';
import useLogic from './hooks/index';

function HandsCapture() {
  const { videoElement, maxVideoWidth, maxVideoHeight, canvasEl } = useLogic();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'absolute',
      }}
    >
      <video
        style={{ display: 'none' }}
        className='video'
        playsInline
        ref={videoElement}
      />
      <canvas
        style={{
          borderColor: 'red',
          borderWidth: 1,
          borderStyle: 'solid',
        }}
        ref={canvasEl}
        width={maxVideoWidth}
        height={maxVideoHeight}
      />
    </div>
  );
}

export default HandsCapture;
