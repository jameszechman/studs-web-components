import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'STUDS',
    customCss: ['@studs/styles', './src/styles/index.css'],
    components: {
      Header: './src/components/Header.astro',
      Sidebar: './src/components/Sidebar.astro'
    },
    social: {
      bitbucket: 'https://bitbucket.org/strongtie-it/studs-lit',
      github: 'https://github.com/studs-ui/studs'
    },
    sidebar: [{
      label: 'Guides',
      items: [
      // Each item here is one entry in the navigation menu.
      {
        label: 'Example Guide',
        link: '/guides/example/'
      }]
    }, {
      label: 'Reference',
      autogenerate: {
        directory: 'reference'
      }
    }]
  }), lit()],
  output: "hybrid"
});