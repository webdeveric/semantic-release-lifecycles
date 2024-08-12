import { writeFile } from 'node:fs/promises';

import type { LifecycleName, LifecycleFn, PluginConfig, PluginContext } from './types.js';

/**
 * Return supported lifecycles
 *
 * @see https://semantic-release.gitbook.io/semantic-release/developer-guide/plugin
 */
export const getLifecycleNames = (): LifecycleName[] => [
  'verifyConditions',
  'analyzeCommits',
  'verifyRelease',
  'generateNotes',
  'addChannel',
  'prepare',
  'publish',
  'success',
  'fail',
];

/**
 * Create a named function
 */
export function makeLifecycleFn(name: LifecycleName): LifecycleFn {
  return {
    async [name](pluginConfig: PluginConfig, context: PluginContext): Promise<void> {
      const { dryRun, enabled = getLifecycleNames() } = pluginConfig;

      if (enabled.includes(name)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { logger, env, stderr, stdout, ...contextData } = context;

        const outputFile = pluginConfig[`${name}OutputFile`] ?? `.semantic-release.${name}.json`;

        const contents = JSON.stringify({ pluginConfig, context: contextData }, null, 2);

        logger.info(dryRun ? `${name} data: ${contents}` : `Writing ${name} details to ${outputFile}`);

        if (!dryRun) {
          await writeFile(outputFile, contents);
        }
      }
    },
  }[name];
}
