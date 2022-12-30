import Vinyl from "vinyl"
import otf2ttf from "otf2ttf"
import lazypipe from "lazypipe"
import through2 from "through2"

function transform_vinylfile() {
  return through2.obj(
    function(file, encoding, callback) {
      file = new Vinyl({
        cwd: file.cwd,
        base: file.base,
        path: `${file.base}${file.data.fontFile}`,
        contents: file._contents,
        stat: file.stat,
        history: file.history,
        data: file.data,
      });
      callback(null, file);
    }
  );
}

export function plugin(options) {
  const transform = lazypipe().pipe(otf2ttf, options).pipe(transform_vinylfile);
  return transform();
}
export default plugin;
