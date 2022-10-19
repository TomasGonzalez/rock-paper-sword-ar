import React, { memo } from 'react';
import useLogic from './hooks/index';

const HandsCapture = ({ updateHandsGesture }) => {
  const { videoElement, maxVideoWidth, maxVideoHeight, canvasEl } =
    useLogic(updateHandsGesture);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
        padding: 16,
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
          opacity: 0.3,
        }}
        ref={canvasEl}
        width={maxVideoWidth}
        height={maxVideoHeight}
      />
    </div>
  );
};

export default memo(HandsCapture);
