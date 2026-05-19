import { createAssetServer } from 'remix/assets'

const productionAssetBuildId =
  process.env.ASSET_BUILD_ID ??
  process.env.COMMIT_REF ??
  process.env.BUILD_ID ??
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.RENDER_GIT_COMMIT ??
  process.env.COMMIT_SHA

const isProduction = process.env.NODE_ENV === 'production'

export const assets = createAssetServer({
  basePath: '/assets',
  rootDir: process.cwd(),
  fileMap: {
    'app/*path': 'app/*path',
    'node_modules/*path': 'node_modules/*path',
  },
  allow: [
    'app/assets/**',
    'app/controllers/contact/**',
    'app/controllers/tools/cloud/tool-orb/**',
    'app/data/media.ts',
    'app/routes.ts',
    'app/theme/**',
    'node_modules/**',
  ],
  deny: ['app/**/*.server.*'],
  ...(isProduction
    ? {
        ...(productionAssetBuildId ? { fingerprint: { buildId: productionAssetBuildId } } : {}),
        minify: true,
        watch: false,
      }
    : {}),
  sourceMaps: isProduction ? undefined : 'external',
  scripts: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'development'),
    },
  },
})
