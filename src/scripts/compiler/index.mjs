import { writeFileSync } from 'fs';

import capitalize from './capitalize.mjs';
import db from '../../lib/db.mjs';
import { property, replace, template } from './template.mjs';

const abbrInCodeOrigin = '../abbreviations-in-code/README.md';

let abbrsJson = db('abbrs/.json');

let section = (title, boundary) => {
   let s = `### ${capitalize(title)}\n`;

   let abbrs = abbrsJson.filter(a => a.word[0].match(boundary));

   for (let abbr of abbrs) s += property(abbr);

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
   let sections = {
      "symbols": "[^\\w\\s]",
      "numbers": "\\d"
   };
   let list = '';

   for (let s in sections) list += section(s, sections[s]);
   for (let letter of 'abcdefghijklmnopqrstuvwxyz') list += section(letter, letter);

   replace('{{ list }}', list);
}

// {{ length }}
{
   replace('{{ length }}', abbrsJson.length);
}

writeFileSync(abbrInCodeOrigin, template, 'utf8');