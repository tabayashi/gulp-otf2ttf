import Vinyl from "vinyl"
import plugin from "otf2ttf"
import src from "lazypipe"
import through2 from "through2"

function transform(file, encode, callback) {
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

export function otf2ttf(options) {
  return src().pipe(plugin, options)
              .pipe(() => through2.obj(transform));
}
export default otf2ttf;
