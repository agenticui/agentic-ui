import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            require('@tailwindcss/postcss'),
            require('autoprefixer'),
          ],
        },
      },
    });
  },
};

export default config;