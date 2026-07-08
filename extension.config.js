/** @type {import('extension').FileConfig} */
// Extension.js uses a fresh profile on every run.
// Prefer that default? Remove the profile config below.
const profile = (name) => `./dist/extension-profile-${name}`
const ciFlags = process.env.CI ? ['--no-sandbox', '--disable-gpu'] : []
const devWindowFlags = process.env.CI ? ciFlags : [
  ...ciFlags,
  '--new-window',
  '--start-maximized',
  '--window-position=80,40',
  '--window-size=1440,1000'
]

export default {
  browser: {
    chrome: {profile: profile('chrome'), browserFlags: devWindowFlags},
    chromium: {profile: profile('chromium'), browserFlags: devWindowFlags, persistProfile: true},
    edge: {profile: profile('edge'), browserFlags: ciFlags},
    firefox: {profile: profile('firefox')},
    'chromium-based': {
      profile: profile('chromium-based'),
      browserFlags: ciFlags
    },
    'gecko-based': {profile: profile('gecko-based')}
  }
}
