const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ytdl = require('@distube/ytdl-core');
const path = require('path');
const fs = require('fs');
const cliProgress = require('cli-progress');

ffmpeg.setFfmpegPath(ffmpegPath);

async function downloadAndConvertToMp3(youtubeUrl, outputFilePath) {
  const videoStream = ytdl(youtubeUrl, { quality: 'highestaudio' });
  const tempFilePath = path.resolve(__dirname, 'temp-video.mp4');
  const tempFileStream = fs.createWriteStream(tempFilePath);

  // Create a progress bar instance
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

  // Get the total size of the video
  let totalSize = 0;
  videoStream.on('response', (res) => {
    totalSize = parseInt(res.headers['content-length'], 10);
    progressBar.start(totalSize, 0);
  });

  // Update the progress bar as the download progresses
  let downloadedSize = 0;
  videoStream.on('data', (chunk) => {
    downloadedSize += chunk.length;
    progressBar.update(downloadedSize);
  });

  videoStream.pipe(tempFileStream);

  videoStream.on('end', () => {
    progressBar.stop(); // Stop the progress bar when download is complete
    ffmpeg(tempFilePath)
      .output(outputFilePath)
      .on('end', () => {
        console.log('Conversion finished');
        fs.unlinkSync(tempFilePath); // Delete the temporary video file
      })
      .on('error', (err) => {
        console.error('Error:', err);
        fs.unlinkSync(tempFilePath); // Delete the temporary video file in case of an error
      })
      .run();
  });

  videoStream.on('error', (err) => {
    console.error('Error downloading the video:', err.message);
    fs.unlinkSync(tempFilePath);
  });
}

module.exports = { downloadAndConvertToMp3 };
