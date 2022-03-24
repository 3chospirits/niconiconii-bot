## General Intallation

In your terminal, run the following commands in order

```ps
# Clones this specific branch
git clone --single-branch --branch improved https://github.com/3chospirits/niconiconii-bot.git

# Go to working directory
cd niconiconii-bot
```

When on the working directory, you must create a '.env' file.
You can manually do it or use touch cli like so

```ps
touch .env
```

When created, you will have to put your application ID, guild ID and your bot token.
The file should look like this.

```txt
TOKEN=<YOUR_BOT_TOKEN>
GUILD_ID=
CLIENT_ID=
```

Bot's ID can be found in the developer page in the `Auth` tab.
Guild ID can be found on a server while right clicking the header and click `copy ID`, this needs developer options to be enabled in Discord's settings

## Install dependencies


Following commands will install all required packages.

With `npm`

```ps
npm install
```

With `yarn`

```ps
yarn
```

## Run the bot

Use the following command

```ps
npm run start
```

Or the shorthand

```
node .
```
