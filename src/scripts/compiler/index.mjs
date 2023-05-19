import { writeFileSync } from 'fs';

import capitalize from './capitalize.mjs';
import db from '../../lib/db.mjs';
import { property, replace, template } from './template.mjs';

let abbrsJson = db('abbrs/.json');
let sectionsJson = db('sections.json');

export let section = (title, boundary) => {
   let s = `### ${capitalize(title)}\n`;

   let abbrsOfLetter = abbrsJson.filter(a => a.word[0].match(boundary));

   for (let abbr of abbrsOfLetter) s += property(abbr);

   return `${s}\n`;
};

//

// {{ sections }}
{
   let sections = [];

   for (let s of sectionsJson) sections.push(`[${capitalize(s.name)}](#${s.name})`);

   replace('{{ sections }}', sections.join(' '));
}

// {{ list }}
{
   let list = '';

   for (let s of sectionsJson) list += section(s.name, s.boundary);
   for (let letter of 'abcdefghijklmnopqrstuvwxyz') list += section(letter, letter);

   replace('{{ list }}', list);
}

// {{ length }}
{
   replace('{{ length }}', `${abbrsJson.length} abbrs in the list`);
}

writeFileSync('../abbreviations-in-code/README.md', template, 'utf8');