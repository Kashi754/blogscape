import { TextEncoder, TextDecoder } from 'util';

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// eslint-disable-next-line no-undef
Object.assign(global, { TextDecoder, TextEncoder });

export const server = setupServer(...handlers);
