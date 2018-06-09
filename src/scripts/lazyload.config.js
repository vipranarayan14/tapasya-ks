import { vLazyLoad } from '../libs/vlazyload';

// Loading .banner background-images only when it comes into view

vLazyLoad('.banner:not(#home-banner)');
