/**
 * https://discord.com/developers/docs/interactions/slash-commands#registering-a-command
 *
 * Usage:
 *     npx projen register:discord
 */

import { readFileSync } from 'fs';
import fetch from 'node-fetch';

async function main(jsonBodyPath: string) {
  const APPLICATION_ID = process.env.APPLICATION_ID;
  const GUILD_ID = process.env.GUILD_ID;
  const BOT_TOKEN = process.env.BOT_TOKEN;

  const url = `https://discord.com/api/v8/applications/${APPLICATION_ID}/guilds/${GUILD_ID}/commands`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bot ${BOT_TOKEN}`,
  };
  const body = readFileSync(jsonBodyPath).toString();
  console.log(body);
  console.log(url);

  const response = await fetch(url, {
    method: 'post',
    headers,
    body,
  });

  console.log(await response.text());
}

const jsonBodyPath = process.argv[2] ?? './assets/commands.json';

main(jsonBodyPath).catch(e => console.error(e));
