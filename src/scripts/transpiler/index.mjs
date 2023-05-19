import { writeFileSync } from 'fs';
import { join } from 'path';

import yaml from 'js-yaml';

import db from '../../lib/db.mjs';

let yml = db('abbrs/.yml');

let json = yaml.load(yml);

writeFileSync(join(dbPath, '.json'), JSON.stringify(json, null, 3), 'utf8');