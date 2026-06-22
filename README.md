<div align="center" style="text-align: center;">
<h1><img src="src/icons/icon32.png" height="30px">  HCTG+</h1>
<p>Adds some qol features to <a href="https://game.hackclub.com">HCTG</a> that i would like</p>

![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/some-du6e/HCTGplus/total)
![GitHub Release](https://img.shields.io/github/v/release/some-du6e/HCTGplus)
![GitHub License](https://img.shields.io/github/license/some-du6e/HCTGplus)
</div>
<!-- sorry maxstellar for skidding this ^-->

<div align="center">
<img src="img/hctgplusfullkindabad.png" width="67%">
</div>

## How to install
Install from the [webstore](https://chromewebstore.google.com/detail/hctg+/kdndfafcpodecbbjhoicneekmbdhhckm) or do these steps
1. Get the [latest release](https://github.com/some-du6e/HCTGplus/releases/latest)
2. Unzip the file
3. Go to `chrome://extensions/` and turn on developer mode
4. Click `Load unpacked` and select the unzipped file
5. Done

## API

See [API.md](API.md) for notes on Macondo's real project API, including
`GET /api/projects/{id}` for fetching project name, level, and description.

## Features

### `consts.js`
nothing much, just set the categories and dollars per hour
### `data.js`
parses the data-page from the app div and sets some stuff on `window.HCTG`
### `gallery.js`
sets the gallery projects on localstorage (probably a bad idea) and also changes every projects link to a new one
### `goals.js`
the main goal manager, gets hours done today and how much of the goal and all the calculations and also makes a "new" page
### `lander.js`
just adds a login button on the lander page so u dont need to add ur email
### `larp_reviewer.js`
adds a fake reviewer dashboard [here](https://game.hackclub.com/me#larp-reviewer)
### `larping_reviewing.js`
adds a fake reviewing process [example here](https://game.hackclub.com/me?projectId=1506#larp_review)
### `otherpersonprojectviewer.js`
adds a new page that gets the cached project(s) and creates a project card with the author and the demo links and everything
### `projects.js`
adds a green glow to projects that have been aproved
### `sidebar.js`
adds dollars and hours and goals if you have it, also adds goals tab and also adds dismissing the help notification
### `utils.js`
helper for running stuff
### `settings.js`
adds a new little section to the settings (`/me`) with these
- Hide black market items
- Developer mode
- Larp as admin/reviewer
- Fake golden ticket
- Fake balance  
- Bring back help
