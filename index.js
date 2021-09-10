const usetube = require('usetube');
const { yellow } = require('chalk');
const plist_id = process.argv[2];
console.log(yellow('\nfetching playlist and sorting by upload date. please hold...'));
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
	console.log(`\n${yellow('sorted playlist:')}`)
	console.log(strings.join('\n'));
	console.log(`\n${yellow('watch your sorted playlist at:')}`);
	console.log('https://www.youtube.com/watch_videos?video_ids=' + ids.join(','));
})();