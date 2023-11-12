import axios from "axios";
import fs from "fs";

const API_KEY = process.env.API_KEY;
const CHANNEL_ID = process.env.CHANNEL_ID;

/**
 * Fetches videos from the YouTube API for a given channel ID and API key.
 * @param {string} [pageToken] - The page token to retrieve the next page of results.
 * @returns {Promise<Object>} - A Promise that resolves with the response data from the API.
 */
async function getVideos(pageToken) {
	let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`;
	if (pageToken) {
		url += `&pageToken=${pageToken}`;
	}

	const response = await axios.get(url);

	return response.data;
}

/**
 * Saves an array of YouTube videos to a JSON file.
 *
 * @param {Array} videos - An array of YouTube video objects.
 */
function parseDataVideos(videos) {
	console.log("📦 Parsing data...");
	const formattedVideos = videos.map((item) => {
		return {
			title: item?.snippet?.title,
			publishedAt: item?.snippet?.publishedAt,
			description: item?.snippet?.description,
			thumbnail: item?.snippet?.thumbnails.high.url,
			videoId: item?.id?.videoId,
		};
	});

	return formattedVideos;
}

function saveVideos(formattedVideos) {
	console.log("💾 Saving data...");
	fs.writeFileSync("videos.json", JSON.stringify(formattedVideos, null, 2));
}

async function getAllVideos() {
	let videos = [];
	let nextPageToken;
	let i = 0;

	console.log("🚀 Fetching videos...");
	do {
		const data = await getVideos(nextPageToken);

		videos = videos.concat(parseDataVideos(data.items));
		nextPageToken = data.nextPageToken;
	} while (nextPageToken);

	saveVideos(videos);
	console.log("✅ Done!");
}

getAllVideos().catch((err) => console.log(err));
