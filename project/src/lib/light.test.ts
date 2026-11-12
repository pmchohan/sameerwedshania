import { describe, expect, it } from 'vitest';
import { lightFor } from './light';

describe('lightFor', () => {
  it('always ends on day and starts darker for longer lists', () => {
    expect([0].map((i) => lightFor(i, 1))).toEqual(['day']);
    expect([0, 1].map((i) => lightFor(i, 2))).toEqual(['dawn', 'day']);
    expect([0, 1, 2].map((i) => lightFor(i, 3))).toEqual(['dusk', 'dawn', 'day']);
  });
});
