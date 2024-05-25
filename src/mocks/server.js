import { TextEncoder, TextDecoder } from 'util';

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

Object.assign(global, { TextDecoder, TextEncoder });

export const server = setupServer(...handlers);
