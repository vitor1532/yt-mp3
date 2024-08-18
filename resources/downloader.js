const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ytdl = require('@distube/ytdl-core');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

async function downloadAndConvertToMp3(youtubeUrl, outputFilePath) {
  const videoStream = ytdl(youtubeUrl, { quality: 'highestaudio' });
  const tempFilePath = path.resolve(__dirname, 'temp-video.mp4');

  const tempFileStream = fs.createWriteStream(tempFilePath);

  videoStream.pipe(tempFileStream);

  videoStream.on('end', () => {
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
