import {
  computeTranslatedPoint,
  computeRotatedPoint,
} from '../src/utils';

describe('computeTranslatedPoint', () => {
  it('moves point right', () => {
    const POINT = { x: 25, y: 40 };
    const EXPECT = { x: POINT.x + 1, y: POINT.y };

    expect(computeTranslatedPoint(POINT, 1, 0)).toEqual(EXPECT);
  });

  it('moves point left', () => {
    const POINT = { x: 25, y: 40 };
    const EXPECT = { x: POINT.x - 1, y: POINT.y };

    expect(computeTranslatedPoint(POINT, -1, 0)).toEqual(EXPECT);
  });

  it('moves point down', () => {
    const POINT = { x: 25, y: 40 };
    const EXPECT = { x: POINT.x, y: POINT.y + 1 };

    expect(computeTranslatedPoint(POINT, 0, 1)).toEqual(EXPECT);
  });
});

describe('computeRotatedPoint', () => {
  it('does not move point if it is a pivot point', () => {
    const POINT = { x: 25, y: 40 };
    const PIVOT = { ...POINT };
    const EXPECT = { ...POINT };
    const ANGLE = 1;

    expect(computeRotatedPoint(POINT, PIVOT, ANGLE)).toEqual(EXPECT);
  });

  it('apply (PI / 2)rad rotation to the point', () => {
    const POINT = { x: 1, y: 0 };
    const PIVOT = { x: 0, y: 0 };
    const EXPECT = { x: 0, y: 1 };
    const ANGLE = Math.PI / 2;

    expect(computeRotatedPoint(POINT, PIVOT, ANGLE)).toEqual(EXPECT);
  });

  it('apply (65PI / 2)rad rotation to the point', () => {
    const POINT = { x: 1, y: 0 };
    const PIVOT = { x: 0, y: 0 };
    const EXPECT = { x: 0, y: 1 };
    const ANGLE = 65 * Math.PI / 2;

    expect(computeRotatedPoint(POINT, PIVOT, ANGLE)).toEqual(EXPECT);
  });

  it('apply (PI)rad rotation to the point', () => {
    const POINT = { x: 1, y: 0 };
    const PIVOT = { x: 0, y: 0 };
    const EXPECT = { x: -1, y: 0 };
    const ANGLE = Math.PI;

    expect(computeRotatedPoint(POINT, PIVOT, ANGLE)).toEqual(EXPECT);
  });

  it('apply (65PI)rad rotation to the point', () => {
    const POINT = { x: 1, y: 0 };
    const PIVOT = { x: 0, y: 0 };
    const EXPECT = { x: -1, y: 0 };
    const ANGLE = 65 * Math.PI;

    expect(computeRotatedPoint(POINT, PIVOT, ANGLE)).toEqual(EXPECT);
  });

  it('apply (-PI / 2)rad rotation to the point', () => {
    const POINT = { x: 1, y: 0 };
    const PIVOT = { x: 0, y: 0 };
    const EXPECT = { x: 0, y: -1 };
    const ANGLE = -Math.PI / 2;

    expect(computeRotatedPoint(POINT, PIVOT, ANGLE)).toEqual(EXPECT);
  });

  it('apply (-65PI / 2)rad rotation to the point', () => {
    const POINT = { x: 1, y: 0 };
    const PIVOT = { x: 0, y: 0 };
    const EXPECT = { x: 0, y: -1 };
    const ANGLE = -65 * Math.PI / 2;

    expect(computeRotatedPoint(POINT, PIVOT, ANGLE)).toEqual(EXPECT);
  });
});
