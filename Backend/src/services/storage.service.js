const Imagekit = require('imagekit')

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  try {
    const result = await imagekit.upload({  
      file: file,
      fileName: fileName,
      folder: "/izest/videos", 
    });
    return result;
  } catch (error) {
    throw new Error(`ImageKit Upload Failed: ${error.message}`);
  }
}

module.exports = {
  uploadFile,
}