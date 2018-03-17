import { vHashRouter } from 'vhashrouter';

vHashRouter.init({

  defaultRoute: '#/home',

  routes: [

    {
      hash: '#/home',
      viewId: 'home'
    },

    {
      hash: '#/about/the-organisation',
      viewId: 'the-organisation'
    },

    {
      hash: '#/about/our-objectives',
      viewId: 'our-objectives'
    },

    {
      hash: '#/about/the-director',
      viewId: 'the-director'
    },

    {
      hash: '#/activities/research',
      viewId: 'research'
    },

    {
      hash: '#/activities/reconstruction',
      viewId: 'reconstruction'
    },

    {
      hash: '#/activities/current-projects',
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
      contentUrl: '/pages/events/index.html',
      hash: '#/events',
      resources: {
        styles: ['/pages/events/styles.min.css']
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
