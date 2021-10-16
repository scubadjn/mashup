import NodeCache from 'node-cache';

export type Ctx = ReturnType<typeof createCtx>
export function createCtx() {
  const cache = new NodeCache({
    stdTTL: 7 * 24 * 60 * 60, // 1 week
  });
  return {
    cache,
  };
};