export type LifecycleFn = (pluginConfig: PluginConfig, context: PluginContext) => Promise<void>;

export type LifecycleName =
  | 'verifyConditions'
  | 'analyzeCommits'
  | 'verifyRelease'
  | 'generateNotes'
  | 'addChannel'
  | 'prepare'
  | 'publish'
  | 'success'
  | 'fail';

export type LifecycleOutputFileOptions = Partial<Record<`${LifecycleName}OutputFile`, string>>;

export type PluginOptions = LifecycleOutputFileOptions & {
  enabled?: LifecycleName[];
};

export type PluginConfig = {
  dryRun: boolean;
  repositoryUrl: string;
  [option: string]: unknown;
} & PluginOptions;

export type PluginContext = {
  logger: Console;
  [property: string]: unknown;
};

export type SemanticReleasePlugin = Partial<Record<LifecycleName, LifecycleFn>>;
