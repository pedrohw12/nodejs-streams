import http from "node:http";
import { Readable } from "node:stream";
import { randomUUID } from "node:crypto";

// generators was meant to consume or generate data on demand
// with generators its not necessary to wait the for loop to finish to send data

function* run() {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `Pedro-${index}`,
      at: Date.now(),
    };

    yield data;
  }
}

function handler(request, response) {
  // const readableStream = Readable({
  //   read() {
  //     this.push("Hello");
  //     this.push("World");
  //     this.push(null);
  //   },
  // });

  const readableStream = Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat("\n"));
      }
      // informe the stream has finished
      this.push(null);
    },
  });

  readableStream.pipe(response);
}

http
  .createServer(handler)
  .listen(3000)
  .on("listening", () => console.log("server listening on port 300"));
