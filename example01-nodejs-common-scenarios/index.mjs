// 1 - 1 example - how the app interacts with the terminal

// const stdin = process.stdin.on("data", (msg) =>
//   console.log("terminal input was", msg)
// );

// const stdout = process.stdout.on("data", (msg) =>
//   process.stdout.write(msg.toString().toUpperCase())
// );

// stdin.pipe(stdout); // when there is an input (stdin) it redirects to stdout (output)

// the stdout.write() does the same as console.log. The difference is that console.log breaks line automatically
// the stdin is a readable stream and the stdout is a writable stream

// 2
import http from "http";
import { readFileSync, createReadStream } from "fs";

// request is a readable stream and response is a writable stream
http
  .createServer((request, response) => {
    // const file = readFileSync("big.file").toString();
    // response.write(file);
    // response.end();
    // getting the file from a readable stream and draining it into the writable stream
    createReadStream('big.file').pipe(response)
  })
  .listen(3000)
  .on("listening", () => console.log("server is listening on 3000"));
