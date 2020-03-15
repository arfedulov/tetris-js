import { IPoint, IMatrix } from './types';

const multiplyMatrices = (m1: IMatrix, m2: IMatrix) => {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    b: m1.b * m2.a + m1.d * m2.b,
    d: m1.b * m2.c + m1.d * m2.d,
    f: m1.b * m2.e + m1.d * m2.f + m1.f,
  };
};

const transform = (...matrices: IMatrix[]): IMatrix => {
  switch (matrices.length) {
    case 0:
      throw new Error('no matrices provided');
    case 1:
      return matrices[0];
    case 2:
      return multiplyMatrices(matrices[0], matrices[1]);
    default: {
      const [m1, m2, ...rest] = matrices;
      const m = multiplyMatrices(m1, m2);

      return transform(m, ...rest);
    }
  }
};

const translate = (tx: number, ty: number): IMatrix => {
  return {
    a: 1,
    c: 0,
    e: tx,
    b: 0,
    d: 1,
    f: ty,
  };
};

const rotate = (angle: number, cx: number, cy: number) => {
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);

  const rotationMatrix = {
    a: cosAngle,
    c: -sinAngle,
    e: 0,
    b: sinAngle,
    d: cosAngle,
    f: 0,
  };

  if (typeof cx === 'undefined' || typeof cy === 'undefined') {
    return rotationMatrix;
  }

  return transform(translate(cx, cy), rotationMatrix, translate(-cx, -cy));
};

const applyToPoint = (matrix: IMatrix, point: IPoint) => {
  return {
    x: matrix.a * point.x + matrix.c * point.y + matrix.e,
    y: matrix.b * point.x + matrix.d * point.y + matrix.f,
  };
};

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
