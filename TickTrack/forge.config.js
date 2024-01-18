module.exports = {
  packagerConfig: {
    files: ['./dist/**/*'],
    ignore: [
      /^\/.github/,
      /^\/.idea/,
      /^\/web/,
      /^\/files/,
      /^.gitignore/,
      /^\/logs/,
    ],
    icon: ''
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32']
    }
  ],
};
