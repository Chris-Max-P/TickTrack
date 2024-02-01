const http = require("http");

const waitForAngularDevServer = (url, retries = 15, delay = 4000) => {
  return new Promise((resolve, reject) => {
    const tryConnecting = (attemptsRemaining) => {
      const request = http.get(url, (response) => {
        if (response.statusCode === 200) {
          resolve();
        } else {
          // Non-200 status code, retry
          if (attemptsRemaining > 0) {
            console.log(`Connection to ${url} failed. Retrying in ${delay}ms...`);
            setTimeout(() => tryConnecting(attemptsRemaining - 1), delay);
          } else {
            reject(new Error(`Could not connect to ${url} after ${retries} retries.`));
          }
        }
      });

      request.on('error', (error) => {
        if (attemptsRemaining > 0) {
          console.log(`Connection to ${url} failed. Retrying in ${delay}ms...`);
          setTimeout(() => tryConnecting(attemptsRemaining - 1), delay);
        } else {
          reject(new Error(`Could not connect to ${url} after ${retries} retries.`));
        }
      });

      request.end();
    };

    tryConnecting(retries);
  });
};

function runNgDev(win) {
  waitForAngularDevServer('http://localhost:4200')
    .then(() => {
      win.loadURL('http://localhost:4200');
      win.webContents.openDevTools({mode: "bottom"});
  });
}

module.exports = {
  runNgDev
}