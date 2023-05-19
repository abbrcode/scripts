import { writeFileSync } from 'fs';
import { join } from 'path';

import yaml from 'js-yaml';

import db, { dbOrigin } from '../../lib/db.mjs';

const yml = db('abbrs/.yml');

// json
{
   let json = yaml.load(yml);

   writeFileSync(join(dbOrigin, '.json'), JSON.stringify(json, null, 3), 'utf8');
}