module.exports = {
  packagerConfig: {
    files: ['./dist/**/*'],
    ignore: [
      /^\/.github/,
      /^\/.idea/,
      /^\/app/, // Ignore the app directory at the root
      /^\/files/,
      /^.gitignore/
    ],
    icon: './icon_fahrerapp'
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: '@electron-forge/maker-squirrel',
    //   platforms: ['win32']
    // },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32', 'darwin']
    }
  ],
};
