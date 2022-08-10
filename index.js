// const os = require("os");
// const path = require("path");
const http = require("http");
// const { readFileSync, writeFileSync, readFile } = require("fs");
// const user = os.userInfo();
// const currentOs = {
//   name: os.type(),
//   release: os.release(),
//   totalMem: os.totalmem(),
//   freeMem: os.freemem(),
// };

// const first = readFileSync("./content/first.txt", "utf8");
// const second = readFileSync("./content/second.txt", "utf8");
// writeFileSync(
//   "./content/results.txt",
//   `results from writeFileSync is ${first} ${second}`
//     { flag: "a" }
// );

// const filePath = path.join("/content", "text.txt");
// const absolute = path.resolve(__dirname, "content", "text.txt");

// readFile("./content/first.txt", "utf8", (err, result) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(result);
// });
// console.log(first, second);

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === "/") {
      res.end("Welcome to our app");
    }
    if (req.url === "/about") {
      res.end("Welcome to our about page");
    }
    res.end(`
        <h1>Sorry this page doesn't seem to exist</h1><a href="/">Go back to home page</a>`);
  } catch (err) {
    console.log(err);
  }
});
server.listen(5000);
