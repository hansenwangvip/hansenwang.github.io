/* global hexo */

'use strict';

hexo.on('generateBefore', () => {
  // Merge config.
  require('./lib/config')(hexo);
  // Add filter type `theme_inject`
  require('./lib/injects')(hexo);
});

