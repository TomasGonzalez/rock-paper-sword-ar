import { useCallback, useEffect, useRef } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import {
  drawConnectors,
  drawLandmarks,
  drawRectangle,
} from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import useKeyPointClassifier from './useKeyPointClassifier';
import CONFIGS from '../../../../constants';

const maxVideoWidth = 960 / 3;
const maxVideoHeight = 540 / 3;

function useLogic(updateHandsGesture, updateHandsGesture2) {
  const videoElement = useRef<any>(null);
  const hands = useRef<any>(null);
  const camera = useRef<any>(null);
  const canvasEl = useRef(null);
  const handsGesture1 = useRef<any>([0]);
  const handsGesture2 = useRef<any>([0]);

  const { processLandmark } = useKeyPointClassifier();

  const onResults = useCallback(
    async (results) => {
      const tempCTX = results?.image?.getContext('2d');
      tempCTX?.scale(1, 1);
      if (canvasEl.current) {
        const ctx = canvasEl.current.getContext('2d');
        ctx.save();
        ctx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
        ctx.drawImage(results.image, 0, 0, maxVideoWidth, maxVideoHeight);

        if (results.multiHandLandmarks) {
          for (const [
            index,
            landmarks,
          ] of results.multiHandLandmarks.entries()) {
            if (index === 0) {
              processLandmark(landmarks, results.image).then((val) => {
                if (handsGesture1.current[0] !== val) {
                  handsGesture1.current[0] = val;
                  updateHandsGesture([...handsGesture1.current]);
                }
              });
              drawHand(landmarks, ctx, handsGesture1.current[0]) 
            } else {
              processLandmark(landmarks, results.image).then((val) => {
                if (handsGesture2.current[0] !== val) {
                  handsGesture2.current[0] = val;
                  updateHandsGesture2([...handsGesture2.current]);
                }
              });
              drawHand(landmarks, ctx, handsGesture2.current[0], '#000099') 
            }
          }
        }
        ctx.restore();
      }
    },
    [processLandmark, updateHandsGesture]
  );

  const drawHand = (landmarks, ctx, currentHand, color='#ff0000') => {
            const landmarksX = landmarks.map((landmark) => landmark.x);
            const landmarksY = landmarks.map((landmark) => landmark.y);

            ctx.fillStyle = color;
            ctx.font = '24px serif';
            ctx.fillText(
              CONFIGS.keypointClassifierLabels[currentHand],
              maxVideoWidth * Math.min(...landmarksX),
              maxVideoHeight * Math.min(...landmarksY) - 15
            );
            drawRectangle(
              ctx,
              {
                xCenter:
                  Math.min(...landmarksX) +
                  (Math.max(...landmarksX) - Math.min(...landmarksX)) / 2,
                yCenter:
                  Math.min(...landmarksY) +
                  (Math.max(...landmarksY) - Math.min(...landmarksY)) / 2,
                width: Math.max(...landmarksX) - Math.min(...landmarksX),
                height: Math.max(...landmarksY) - Math.min(...landmarksY),
                rotation: 0,
              },
              {
                fillColor: 'transparent',
                color,
                lineWidth: 1,
              }
            );
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
              color,
              lineWidth: 2,
            });
            drawLandmarks(ctx, landmarks, {
              color,
              lineWidth: 1,
            });
  }

  const loadHands = useCallback(() => {
    hands.current = new Hands({
      locateFile: (file) => `public/${file}`,
    });

    hands.current.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.current.onResults(onResults);
  }, [onResults]);

  useEffect(() => {
    async function initCamara() {
      camera.current = new Camera(videoElement.current, {
        onFrame: async () =>
          await hands.current.send({ image: videoElement.current }),
        width: maxVideoWidth,
        height: maxVideoHeight,
      });
      camera.current.start();
    }

    initCamara();
    loadHands();
  }, [loadHands]);

  return { maxVideoHeight, maxVideoWidth, canvasEl, videoElement };
}


export default useLogic;
