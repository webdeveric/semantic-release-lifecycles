import { describe, expect, it } from 'vitest';

import plugin from '../src/index.js';
import { getLifecycleNames } from '../src/plugin.js';

describe('Plugin', () => {
  it('Has lifecycle methods', () => {
    expect(Object.entries(plugin)).toEqual(
      getLifecycleNames().map((lifecycle) => [expect.stringMatching(lifecycle), expect.any(Function)]),
    );
  });
});
