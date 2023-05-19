import { readFileSync } from 'fs';
import { join } from 'path';

export const dbOrigin = '../db';

export default path => {
   let data = readFileSync(join(dbOrigin, path), 'utf8');

   if (path.split('.')[1] === 'json') data = JSON.parse(data);

   return data;
};