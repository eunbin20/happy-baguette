import baseConfig from '../../eslint.config.mjs';
import next from '@next/eslint-plugin-next';
export default [
  ...baseConfig,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@next/next': next },
    settings: { next: { rootDir: 'apps/home/' } },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
];
