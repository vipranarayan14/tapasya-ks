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
      contentUrl: '/pages/gallery/index.html',
      hash: '#/gallery',
      resources: {
        scripts: ['/pages/gallery/scripts.min.js'],
        styles: ['/pages/gallery/styles.min.css']
      },
      viewId: 'gallery'
    },

    {
      contentUrl: '/pages/bulletin/index.html',
      hash: '#/events',
      resources: {
        styles: ['/pages/bulletin/styles.min.css']
      },
      viewId: 'events'
    },

    {
      hash: '#/contact',
      viewId: 'contact'
    },

  ],

  viewSelector: 'sub-page'

});
