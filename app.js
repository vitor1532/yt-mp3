
const readline = require('readline');
const path = require('path');
const { downloadAndConvertToMp3 } = require('./resources/downloader');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the youtube link: ', (youtubeUrl) => {
  if (!youtubeUrl) {
    console.error('Please provide a youtube URL');
    rl.close();
    return;
  }
  rl.question('Enter the file name: ', (pseudoName) => {
    const fileName = pseudoName + '.mp3';      
    const outputFilePath = path.resolve(__dirname, '..',  fileName); // Path to your output audio file
    if (!pseudoName) {
      console.error('Please provide a name for the file');
      rl.close();
      return;
    }


    downloadAndConvertToMp3(youtubeUrl, outputFilePath)
      .then(() => {
        console.log('Conversion successful');
      })
      .catch((err) => {
        console.error('Conversion failed', err);
      });
    rl.close();
  });
});
