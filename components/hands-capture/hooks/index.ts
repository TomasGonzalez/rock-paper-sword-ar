import { useCallback, useEffect, useRef } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import {
  drawConnectors,
  drawLandmarks,
  drawRectangle,
} from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import _ from 'lodash';
import useKeyPointClassifier from './useKeyPointClassifier';
import CONFIGS from '../../../constants';

const maxVideoWidth = 960 / 3;
const maxVideoHeight = 540 / 3;

function useLogic(updateHandsGesture) {
  const videoElement = useRef<any>(null);
  const hands = useRef<any>(null);
  const camera = useRef<any>(null);
  const canvasEl = useRef(null);
  const handsGesture = useRef<any>([0]);

  const { processLandmark } = useKeyPointClassifier();

  const onResults = useCallback(
    async (results) => {
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
            processLandmark(landmarks, results.image).then((val) => {
              if (handsGesture.current[index] !== val) {
                handsGesture.current[index] = val;
                updateHandsGesture([...handsGesture.current]);
              }
            });

            const landmarksX = landmarks.map((landmark) => landmark.x);
            const landmarksY = landmarks.map((landmark) => landmark.y);

            ctx.fillStyle = '#ff0000';
            ctx.font = '24px serif';
            ctx.fillText(
              CONFIGS.keypointClassifierLabels[handsGesture.current[index]],
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
                rectId: 13,
              },
              {
                fillColor: 'transparent',
                color: '#ff0000',
                lineWidth: 1,
              }
            );
            drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
              color: '#00ffff',
              lineWidth: 2,
            });
            drawLandmarks(ctx, landmarks, {
              color: '#ffff29',
              lineWidth: 1,
            });
          }
        }
        ctx.restore();
      }
    },
    [processLandmark, updateHandsGesture]
  );

  const loadHands = useCallback(() => {
    hands.current = new Hands({
      locateFile: (file) => `js/@mediapipe/hands/${file}`,
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
        onFrame: async () => {
          await hands.current.send({ image: videoElement.current });
        },
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
