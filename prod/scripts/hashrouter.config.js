import { vHashRouter } from 'vhashrouter';

vHashRouter.init({
  defaultRoute: '#/home',
  routes: [

    {
      hash: '#/home',
      viewId: 'home'
    },

    {
      hash: '#/the-organisation',
      viewId: 'the-organisation'
    },

    {
      hash: '#/our-objectives',
      viewId: 'our-objectives'
    },

    {
      hash: '#/the-director',
      viewId: 'the-director'
    },

    {
      hash: '#/research',
      viewId: 'research'
    },

    {
      hash: '#/reconstruction',
      viewId: 'reconstruction'
    },

    {
      hash: '#/current-projects',
      viewId: 'current-projects'
    },

    {
      hash: '#/gallery',
      viewId: 'gallery'
    },

    {
      hash: '#/contact',
      viewId: 'contact'
    },

  ],
  viewSelector: 'sub-page'
});
