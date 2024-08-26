import fs from 'fs/promises';
import { existsSync } from 'fs';

export const conf = await loadConfig();

async function loadConfig() {
  let  text; 
  if (existsSync('./conf.json') ) {
    text = await fs.readFile('./conf.json');
  } else {
    text = '{}';
  }

  const global = JSON.parse(text);

  if (existsSync('./conf_local.json') ) {
    text = await fs.readFile('./conf_local.json');
  } else {
    text = '{}';
  }

  const local = JSON.parse(text);
    
  return {
    ...global,
    ...local
  };
}