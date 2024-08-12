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

export type PluginOptions = LifecycleOutputFileOptions;

export type PluginConfig = {
  dryRun: boolean;
  repositoryUrl: string;
  [option: string]: unknown;
} & PluginOptions;

export type NextRelease = {
  gitHead: string;
  name: string;
  gitTag: string;
  notes: string;
};

export type PluginContext = {
  nextRelease?: NextRelease;
  logger: Console;
  [property: string]: unknown;
};

export type SemanticReleasePlugin = Partial<Record<LifecycleName, LifecycleFn>>;
