import { Console } from 'node:console';
import { createWriteStream } from 'node:fs';
import { PassThrough } from 'node:stream';

import { fs, vol } from 'memfs';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getInstance, getLifecycleNames, makeLifecycleFn } from '../src/plugin.js';

import type { PluginContext } from '../src/types.js';

vi.mock('node:fs/promises');

describe('getLifecycleNames()', () => {
  it('Returns array of lifecycle names', () => {
    expect(getLifecycleNames().every((name) => typeof name === 'string')).toBeTruthy();
  });
});

describe('makeLifecycleFn()', () => {
  let context: PluginContext;

  beforeEach(() => {
    context = {
      logger: new Console({
        stdout: new PassThrough(),
        stderr: new PassThrough(),
      }),
      env: {},
      stdout: createWriteStream('stdout', { fs }),
      stderr: createWriteStream('stderr', { fs }),
    };
    vol.reset();

    vol.mkdirSync(process.cwd(), { recursive: true });
  });

  it('Returns a function', () => {
    expect(makeLifecycleFn('success')).toBeInstanceOf(Function);
  });

  it('Logs data to when during dry run', async () => {
    const fn = makeLifecycleFn('success');

    const infoSpy = vi.spyOn(context.logger, 'info');

    await expect(fn({ dryRun: true, repositoryUrl: '' }, context)).resolves.toBeUndefined();

    await expect(fs.promises.readFile('.semantic-release.success.json')).rejects.toThrow('ENOENT');

    expect(infoSpy).toHaveBeenCalled();
  });

  it('Writes a JSON file', async () => {
    const fn = makeLifecycleFn('success');

    const infoSpy = vi.spyOn(context.logger, 'info');

    await expect(
      fn({ dryRun: false, repositoryUrl: '', successOutputFile: 'success.json' }, context),
    ).resolves.toBeUndefined();

    expect(infoSpy).toHaveBeenCalled();

    await expect(fs.promises.readFile('success.json', 'utf-8')).resolves.toEqual(
      expect.stringContaining('pluginConfig'),
    );
  });
});

describe('getInstance()', () => {
  it('Returns an object', () => {
    expect(getInstance()).toBeInstanceOf(Object);
  });
});
