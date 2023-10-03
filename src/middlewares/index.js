const fs = require("fs");

function logRequestResponse(filename) {
  return (request, response, next) => {
    const date = new Date().toLocaleString("en-GB", { hour12: true });

    fs.appendFile(
      filename,
      `\n\nNew Log:\n\t--> Date   = ${date}\n\t--> IP     = ${request.ip}\n\t--> Method = ${request.method}\n\t--> Path   = ${request.path}\n\t--> Body   = ${request.body.prompt}\n\t`,
      (error, data) => {
        if (error) {
          console.error(`Error: ${error}`);
        }
        next();
      }
    );
  };
}

module.exports = { logRequestResponse };
