# YT-MP3

A simple Node.js application that uses the following npm packages for downloading and processing YouTube videos:

- `fluent-ffmpeg`
- `ffmpeg-static`
- `ytdl-core`

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

## Installation

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Install the required npm packages by running:

   ```sh
   npm install

## Usage

1. Enter the project directory in the terminal:

   ```sh
   cd your-project-directory

2. Run the application:
  ```sh
  node app.js

## Example

Here's an example of what the interaction might look like:

  ```sh
  $ node app.js
  Enter the YouTube link: https://www.youtube.com/watch?v=example
  Enter the name of the file: myvideo

  Downloading and processing...
  ```

## Dependencies

This project uses the following npm packages:

- [`fluent-ffmpeg`](https://www.npmjs.com/package/fluent-ffmpeg): A fluent API for ffmpeg, a tool for handling multimedia data.
- [`ffmpeg-static`](https://www.npmjs.com/package/ffmpeg-static): Provides a static version of ffmpeg for usage.
- [`ytdl-core`](https://www.npmjs.com/package/ytdl-core): A YouTube video downloader.

## Disclaimer

This project is for study purposes only. It is not intended for production use.
