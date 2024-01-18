const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  log: (message, logLevel) => ipcRenderer.send('log', message, logLevel),
  closeApp: () => ipcRenderer.send('close_app'),

  trackTime: (data) => ipcRenderer.invoke('trackTime', data),
  readTrackedTimes: (date) => ipcRenderer.invoke('readTrackedTimes', date),

  getProjects: () => ipcRenderer.invoke('getProjects'),
  addProject: (project) => ipcRenderer.invoke('addProject', project),
  deleteProject: (projectName) => ipcRenderer.invoke('deleteProject', projectName),
  updateProject: (oldProjectName, newProject) => ipcRenderer.invoke('updateProject', oldProjectName, newProject),
})
