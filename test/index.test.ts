import { describe, expect, it } from 'vitest';

import * as plugin from '../src/index.js';
import { getLifecycleNames } from '../src/plugin.js';

describe('Plugin', () => {
  it('Exports lifecycle functions', () => {
    expect(Object.entries(plugin)).toEqual(
      getLifecycleNames().map((lifecycle) => [expect.stringMatching(lifecycle), expect.any(Function)]),
    );
  });
});
