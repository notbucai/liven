import { readFileSync } from 'fs';
import { join } from 'path';

export const config = {
  SECRET: readFileSync(join(__dirname, '../../secret.key')),
};
