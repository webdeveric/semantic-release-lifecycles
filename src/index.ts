import { makeLifecycleFn } from './plugin.js';

export const verifyConditions = makeLifecycleFn('verifyConditions');

export const analyzeCommits = makeLifecycleFn('analyzeCommits');

export const verifyRelease = makeLifecycleFn('verifyRelease');

export const generateNotes = makeLifecycleFn('generateNotes');

export const addChannel = makeLifecycleFn('addChannel');

export const prepare = makeLifecycleFn('prepare');

export const publish = makeLifecycleFn('publish');

export const success = makeLifecycleFn('success');

export const fail = makeLifecycleFn('fail');
