import { createAssetServer } from 'remix/assets'

const productionAssetBuildId =
  process.env.ASSET_BUILD_ID ??
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.RENDER_GIT_COMMIT ??
  process.env.COMMIT_SHA

export const assets = createAssetServer({
  basePath: '/assets',
  rootDir: process.cwd(),
  fileMap: {
    'app/*path': 'app/*path',
    'node_modules/*path': 'node_modules/*path',
  },
  allow: [
    'app/assets/**',
    'app/controllers/tools/cloud/tool-orb/**',
    'app/data/media.ts',
    'app/theme/**',
    'node_modules/**',
  ],
  deny: ['app/**/*.server.*'],
  ...(process.env.NODE_ENV === 'production' && productionAssetBuildId
    ? {
        fingerprint: { buildId: productionAssetBuildId },
        minify: true,
        watch: false,
      }
    : {}),
  sourceMaps: process.env.NODE_ENV === 'development' ? 'external' : undefined,
  scripts: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    },
  },
})
