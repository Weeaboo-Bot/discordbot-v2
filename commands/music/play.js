const { SlashCommandBuilder, hyperlink } = require('@discordjs/builders');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const MUSIC_CHANNEL_ID = require('../../config').discord.MUSIC_CHANNEL_ID;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('music')
		.setDescription('play a song from youtube')
		.addSubcommand(subcommand =>
			subcommand
				.setName('play')
				.setDescription('play a song from youtube')
				.addStringOption(option =>
					option
						.setName('url')
						.setDescription('the url of the song to play')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('pause')
				.setDescription('pause the current song'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('resume')
				.setDescription('resume the current song'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('skip')
				.setDescription('skip the current song'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('stop')
				.setDescription('stop the current song')),
	async execute(interaction) {
		// interaction.client.user.setActivity('Listening to YouTube', { type: 'LISTENING' });
		const youtubeUrl = interaction.options.getString('url');
		const connection = joinVoiceChannel({
			channelId: MUSIC_CHANNEL_ID,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});

		const stream = ytdl(youtubeUrl, { filter: 'audioonly' });
		const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
		const player = createAudioPlayer();

		player.play(resource);
		connection.subscribe(player);

		interaction.reply('Now playing: ' + hyperlink(youtubeUrl));

		player.on(AudioPlayerStatus.Idle, () => connection.destroy());


		const optionName = interaction.options.data[0].name;

		switch (optionName) {
		case 'play':
			player.play(resource);
			break;
		case 'pause':
			player.pause();
			break;
		case 'resume':
			player.unpause();
			break;
		case 'skip':
			break;
		case 'stop':
			player.stop();
			break;
		default:
			player.play(resource);
			break;
		}
	},
};