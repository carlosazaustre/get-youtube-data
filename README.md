# Get YouTube Data

This is a Node.js script that fetches data about all videos from a specific YouTube channel and saves it in a JSON file.

## Installation

1. Clone this repository.
2. Run `npm install` to install the dependencies.

## Usage

1. Replace `'YOUR_API_KEY'` and `'YOUR_CHANNEL_ID'` in `index.mjs` with your YouTube Data v3 API key and the ID of the YouTube channel you want to fetch data from, respectively.
2. Run `npm start` to execute the script. This will create a file named `videos.json` with the data of the videos.

## Testing

Run `npm test` to execute the tests.

## Dependencies

- `axios`: Used to make HTTP requests to the YouTube Data v3 API.
- `fs`: Used to write the fetched data to a file.

## Author

Carlos Azaustre <cazaustre@gmail.com> (https://youtube.com/carlosazaustre)

## License

MIT