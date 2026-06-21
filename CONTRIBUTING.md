# Contributing
no ai slop allowed

## Updating shop categories
> [!NOTE]
> I havent tried the python script on other OSes except windows
> <br> You can vibe code it if it doesnt work
### Requirements:
- Agent
    - Copilot
    - —OR—
    - Codex
- Python



### Steps
#### Shop items dumping
1. Enable developer mode
0. Open the [shop](https://game.hackclub.com/shop)
0. Open developer tools and navigate to the console tab
0. Right click the item that looks like a bunch of {...} (see image) and then select `Copy object` ![](img/contribshopitems.png)
0. Create or modify `shopitemsdumpy.js` and paste the object that you previously copied
#### Agentic modification of categories (actually run the script/agent)
1. Install requirements
2. Run the python script 
```bash
python scripts/update-shop-categories.py
```
3. Choose your prefered agent (codex is free and allows you to do ~$10 of inference for free)
0. The agent tui will open, you can now see if the changes you see fit

## Testing
### Importing HCA cookies
#### Exporting them
1. Install [EditThisCookie](https://chromewebstore.google.com/detail/editthiscookie-v3/ojfebgpkimhlhcblbalbfjblapadhbol)
0. Go to [HCA](https://auth.hackclub.com/) and make your your logged in
0. Open EditThisCookie and click the "download" icon to paste to your clipboard
0. Paste them into `cookies.json` (create it if doesnt exist)
![](img/editthiscookie.png)
#### Importing them using the script 
1. Run `python import_cookies.py` (you should be in the testing dir)
0. Press enter and follow the scripts intructions

## cws action publishing
tbh its a pile of slop just use ai...
### instructions for agents
```md
## Release Workflow

The repository uses GitHub Actions workflow `Release Chrome Extension`.

Behavior:
1. Pushes to `main` create a release build and GitHub release artifact.
2. Manual runs can also publish to Chrome Web Store.

## Chrome Web Store Publish (Manual)

### 1) Configure repository secrets

Add these secrets in GitHub repository settings:

- `CHROME_EXTENSION_ID`
- `CHROME_CLIENT_ID`
- `CHROME_CLIENT_SECRET`
- `CHROME_REFRESH_TOKEN`

Path in GitHub UI:
`Settings -> Secrets and variables -> Actions -> Repository secrets`

### 2) Trigger publish

From GitHub:
1. Go to `Actions`.
2. Select `Release Chrome Extension`.
3. Click `Run workflow`.
4. Set `publish_to_store` to `true`.
5. Run it on `main`.

From CLI:

```bash
gh workflow run release-extension.yml -f publish_to_store=true
```

### 3) Verify publish step

Check the run logs for step `Publish to Chrome Web Store`.

CLI examples:

```bash
gh run list --workflow release-extension.yml --limit 5
gh run view <run_id> --json jobs
```

## Notes

- Manual publish with `publish_to_store=true` now forces stable release metadata for the run.
- If publish fails with auth errors, refresh/recreate `CHROME_REFRESH_TOKEN` and update secrets.
```