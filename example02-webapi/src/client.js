import { get } from "node:http";
import { Transform, Writable } from "node:stream";
import { createWriteStream } from "node:fs";

const url = "http://localhost:3000";

const getHttpStream = () =>
  new Promise((resolve) => get(url, (response) => resolve(response)));

const stream = await getHttpStream();

stream
  .pipe(
    Transform({
      // forces the stream to use strings instead of buffers
      objectMode: true,
      transform(chunk, encode, callBack) {
        const item = JSON.parse(chunk);
        const myNumber = /\d+/.exec(item.name)[0];
        const isEven = myNumber % 2 === 0;
        item.name = item.name.concat(isEven ? " is even" : " is odd");

        callBack(null, JSON.stringify(item));
      },
    })
  )
  .filter((chunk) => chunk.includes("even"))
  .map((chunk) => chunk.toUpperCase() + "\n")
  .pipe(
    // flag "a" tells to append data is existent
    createWriteStream("response.log", { flags: "a" })
  );
// .pipe(
//   Writable({
//     objectMode: true,
//     write(chunk, encode, callBack) {
//       // the callback informs that the work is done in this chunk
//       return callBack();
//     },
//   })
// );
// .pipe(process.stdout);
