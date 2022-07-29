/*jshint esversion: 11 */

function VideoLength(file) {
   let result = {
      duration: -1,
      size: -1
   };
   const { execFileSync } = require('node:child_process');
   //install mediainfo.js
   //npm install mediainfo.js -g
   const child = execFileSync('mediainfo.js', [file, '-f', 'JSON']);

   let specs = JSON.parse(child.toString());
   if (!specs.media.track) {
      __Log.error("Videolength : Can\'t extract video specs");
   }
   else {
      // General info
      let general_specs = specs.media.track.find(i => i['@type'] == 'General');
      if (!general_specs) {
         __Log.error("Videolength : Can\'t find General specs");
      }

      else {
         result = {
            duration: parseFloat(general_specs.Duration),
            size: parseFloat(general_specs.FileSize)
         };
      }
   }

   return result;
}

module.exports = VideoLength;
