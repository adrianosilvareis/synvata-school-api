/* eslint-disable import/first */
import 'reflect-metadata';
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@': __dirname,
});

import '@/config/modules';

import { server } from '@/config/express';
import { EXPRESS_PORT } from '@/config/settings';

// eslint-disable-next-line no-console
server.listen(EXPRESS_PORT, () => console.log(`Server started on port ${EXPRESS_PORT}`));
