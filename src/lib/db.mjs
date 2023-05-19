import { readFileSync } from 'fs';
import { join } from 'path';

const abbrincodeDir = '../db';

export default path => {
   let data = readFileSync(join(abbrincodeDir, path), 'utf8');

   if (path.split('.')[1] === 'json') data = JSON.parse(data);

   return data;
};