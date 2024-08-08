import { createServer } from "http";
import { readFile } from "fs/promises";

async function server(url) {
  if (url === "/") {
    const catFile = await readFile("./cats.txt", "utf8");
    const catNames = catFile.split("\n");
    const index = Math.floor(Math.random() * catNames.length);
    const catName = catNames[index];
    const json = { catName };
    const html = `<!doctype html>
      <html>
        <head>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          <script>
            function onClick() {
              const { catName } = ${JSON.stringify(json)};
              document.body.innerText = catName;
            }
          </script>
          <button onclick="onClick()">Reveal Cat Name</button>
        </body>
      </html>
    `;
    return { content: html, contentType: "text/html" };
  }

  if (url === "/client.js") {
    const js = await readFile("./client.js", "utf8");
    return { content: js, contentType: "application/javascript" };
  }

  if (url === "/style.css") {
    const css = await readFile("./style.css", "utf8");
    return { content: css, contentType: "text/css" };
  }

  if (url === "/favicon.ico") {
    const css = await readFile("./favicon.ico", "utf8");
    return { content: css, contentType: "image/x-icon" };
  }

  // Return 404 for unknown routes
  return { content: "Not Found", contentType: "text/plain", statusCode: 404 };
}

createServer(async (request, response) => {
  try {
    const {
      content,
      contentType,
      statusCode = 200,
    } = await server(request.url);
    response.writeHead(statusCode, { "Content-type": contentType });
    response.end(content);
  } catch (error) {
    response.writeHead(500, { "Content-type": "text/plain" });
    response.end("Internal Server Error");
    console.error(error);
  }
}).listen(3000, () => {
  console.log("Server is listening on port 3000");
});
