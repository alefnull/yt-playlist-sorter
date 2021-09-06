const usetube = require('usetube');
const chalk = require('chalk');
const plist_id = process.argv[2];
console.log(chalk.yellow('\nfetching playlist and sorting by upload date. please hold...'));
(async () => {
	const playlist = await usetube.getPlaylistVideos(plist_id);
	const videos = playlist.sort((a, b) => {
		return a.publishedAt > b.publishedAt ? 1 : -1;
	});
	let strings = [], ids = [];
	for (const video of videos) {
		const dt = await usetube.getVideoDate(video.id);
		const date = dt.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
		strings.push(`${video.title} (${date})`);
		ids.push(video.id);
	}
	console.log(`\n${chalk.yellow('sorted playlist:')}`)
	console.log(chalk.blue(strings.join('\n')));
	console.log(`\n${chalk.yellow('watch your sorted playlist at:')}`);
	console.log(chalk.blue('https://www.youtube.com/watch_videos?video_ids=' + ids.join(',')));
})();