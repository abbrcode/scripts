import db from '../../lib/db.mjs';

let degreesJson = db('degrees.json');

//

export let template = db('template.md');

export let replace = (o, n) => template = template.replace(o, n);

export let property = (abbr) => {
   let temp = `- ${abbr.word}`;

   for (let a of abbr.abbrs) {
      temp += ` • ${degreesJson[a.degree]} ${a.abbr}`;

      if (a.degree === 'yellow') temp += ` { ${a.context} }`;
   }

   return `${temp}\n`;
};