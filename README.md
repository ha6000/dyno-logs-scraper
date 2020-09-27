# dyno-logs-scraper
> Scrapes dyno logs

_If you want a moduler version please create a issue_

## Prerequisites
* node v12.x.x (tested for this version)

## Setup
Clone the repository and install all the modules.

When that is done create a config.json file

Here is a example one
```json
{
	"SID": "mysid.do.not.share.this.thanks",
	"guildID": "759486953317466155"
}
```
to get the SID in chrome press ctrl+shift+i or right click and inspect.

go to the application tab -> Cookies -> dyno.gg.
and then look for cookie with the name dynobot.sid, copy its content and paste it in SID value.

## Running
To run the program run
```
node src
# or
npm run run
```

## Config
Here is the properties of the config ([property] means required)
### [SID]
Your dynobot.sid cookie

### [guildID]
The snowflake of the guild

### url
The url to the dyno.gg website

### pageSize
The amount of logs to fetch at once (there is no limit so far I know)

### type
The type of logs to fetch, types include
* dashboardlogs
* modlogs
* automodlogs
* commandlogs
