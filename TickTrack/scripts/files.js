const path = require('path');
const fs = require('fs');
const environment = require("../environments/environment");
const dayjs = require("dayjs");

let DATA_PATH = path.join(__dirname, '..', 'files');
let PROJECTS_PATH = path.join(DATA_PATH, 'projects.json');
if (!environment.production) DATA_PATH = path.join(__dirname, '..', 'files');
function createDirectories() {
  if (!fs.existsSync(DATA_PATH)) fs.mkdirSync(DATA_PATH);
}

createDirectories();

function writeJsonFile(fileName, object) {
  console.log(`Writing data to ${fileName} ...`);
  fs.writeFileSync(fileName, JSON.stringify(object, null, 2), (error) => {
    if (error) {
      console.error('An error has occurred while writing the file ', error);
      return;
    }
    console.log('Data written successfully to disk as .json file.');
  });
}

function readJson(path) {
  console.log(`Reading data from ${path} ...`);
  try {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    console.log(`Reading succesfull.`);
    return data;
  } catch (error) {
    console.error(`Reading failed: ${error.message}`);
    return undefined;
  }
}

function deleteFile(path) {
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log(`Deleted file: ${path}`)
    } else {
      console.log("Could not delete file: " + path + " because it does not exist.")
    }
  } catch (error) {
    console.error(`Deleting of ${path} failed: ${error.message}`);
  }
}

async function emptyDirectory(directory) {
  if (fs.existsSync(directory)) {
    await fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        try {
          fs.unlinkSync(path.join(directory, file));
        } catch (e) {

        }
      }
    });
    console.log("Emptied directory " + directory);
  } else {
    console.log("Did not empty directory " + directory + " because it does not exist.");
  }
}



function trackTime(trackModel) {
  let fileName = dayjs().format('YYYY-MM-DD') + '_track.json';
  let trackPath = path.join(DATA_PATH, fileName)
  let timeTrackJson = [];
  if (fs.existsSync(trackPath)) {
    timeTrackJson = readJson(path.join(DATA_PATH, fileName));
  }
  timeTrackJson.push(trackModel);
  writeJsonFile(trackPath, timeTrackJson);
}

function readTrackedTimes(date) {
  //TODO handle 00:00 case -> get times from yesterday
  let fileName = dayjs(date).format('YYYY-MM-DD') + '_track.json';
  return readJson(path.join(DATA_PATH, fileName));
}



function getProjects() {
  return readJson(PROJECTS_PATH);
}

function addProject(project) {
  let projects = getProjects();
  if (!projects) projects = [];
  projects.push(project);
  writeJsonFile(PROJECTS_PATH, projects);
}

function deleteProject(projectName) {
  let projects = getProjects();
  if (!projects) return;
  projects = projects?.filter(p => p.name !== projectName.name);
  writeJsonFile(PROJECTS_PATH, projects);
}

function updateProject(projectName, project) {
  let projects = getProjects();

  projects = projects?.map(proj => {
    if (proj.name === projectName) {
      return project;
    }
    return proj;
  });
  writeJsonFile(PROJECTS_PATH, projects);
}



module.exports = {
  trackTime,
  readTrackedTimes,
  getProjects,
  addProject,
  deleteProject,
  updateProject,
}
