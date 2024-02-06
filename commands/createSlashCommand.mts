import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';

config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN ?? '';
const GUILD_ID = process.env.GUILD_ID ?? '';
const APP_ID = process.env.APP_ID ?? '';

const createCommand = new SlashCommandBuilder()
  .setName('add_music')
  .setDescription('Add a new music to playlist')
  .addStringOption(option =>
    option
      .setName('youtube_url')
      .setDescription('youtube url(without query parameter)')
      .setRequired(true),
  )
  .addStringOption(option =>
    option
      .setName('youtube_title')
      .setDescription('youtube title')
      .setRequired(true),
  )
  .addStringOption(option =>
    option
      .setName('music_title')
      .setDescription('music title')
      .setRequired(true),
  )
  .addStringOption(option =>
    option.setName('artist').setDescription('artist name').setRequired(true),
  )
  .addNumberOption(option =>
    option
      .setName('start_time')
      .setDescription('this music start time')
      .setRequired(true),
  )
  .addNumberOption(option =>
    option
      .setName('end_time')
      .setDescription('this music end time')
      .setRequired(true),
  );

const createSlashCommand = async () => {
  const rest = new REST().setToken(DISCORD_TOKEN);
  // The put method is used to fully refresh all commands in the guild with the current set
  const commands = [createCommand];
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );
    await rest.put(Routes.applicationGuildCommands(APP_ID, GUILD_ID), {
      body: commands,
    });
    console.log(`Successfully reloaded aa application (/) commands.`);
  } catch (e) {
    console.error(e);
  }
};

await createSlashCommand();
