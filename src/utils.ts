import {
  translate,
  rotate,
  applyToPoint,
} from 'transformation-matrix';

import { IPoint } from './types';

export const computeRotatedPoint = (point: IPoint, pivot: IPoint, angle: number) => {
  const matrix = rotate(angle, pivot.x, pivot.y);

  const p = applyToPoint(matrix, { ...point }) as IPoint;

  return { x: Math.round(p.x), y: Math.round(p.y) };
};

export const computeTranslatedPoint = (point: IPoint, tx: number, ty: number) => {
  const matrix = translate(tx, ty);

  const p = applyToPoint(matrix, { ...point }) as IPoint;

  return { x: Math.round(p.x), y: Math.round(p.y) };
};
