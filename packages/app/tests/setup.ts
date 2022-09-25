/* eslint-disable import/first */
import 'reflect-metadata';

import path from 'path';

// eslint-disable-next-line import/order
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@': path.resolve(__dirname, '../src'),
  '#': __dirname,
});
