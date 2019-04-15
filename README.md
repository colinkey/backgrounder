## Backgrounder

A node script to get the top post for a given subreddit and set it as your desktop background.

## Usage

- Clone this repo
- `cd` into the project directory
- `npm i`
- `node app.js <subreddit name>`

Images are saved the to `images/` folder in the project directory.

### A Note on Usage

For Windows, this script will not work if run in the Windows Subsystem for Linux shell. Wallpaper detects the environment where the script is run and will not correctly call the Windows executable that changes the background. Pop open Powershell and give it a whirl.

## Acknowledgement

[Wallpaper](https://github.com/sindresorhus/wallpaper) does all of the heavy lifting. This just hits the reddit api and calls wallpaper to set the background.
