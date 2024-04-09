import { memo } from 'react';
import useLogic from './hooks/index';

const HandsCapture = ({ updateHandsGesture, updateHandsGesture2 }) => {
  const { videoElement, maxVideoWidth, maxVideoHeight, canvasEl } = useLogic(updateHandsGesture, updateHandsGesture2);

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
        style={{
          display: 'none',
          transform: 'scale(-1, 1)',
        }}
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
