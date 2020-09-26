const Axios = require('axios');
const fs = require('fs');
const Path = require('path');

const cliProgress = require('cli-progress');

const outPath = Path.join(__dirname, '../out.json');

const defaultConfig = require('../config.default.json');

const config = Object.assign({}, defaultConfig, require('../config.json'));

const axios = Axios.create({
	baseURL: config.url,
	headers: {
		Cookie: `dynobot.sid=${config.SID}`
	}
});

const logs = [];

const loadingBar = new cliProgress.SingleBar();

(async () => {
	let page = 0;
	let pageCount = 1;

	loadingBar.start(pageCount, page);

	while(page < pageCount) {
		const response = await axios.post(`/api/modules/${config.guildID}/${config.type}`, {
			page,
			pageSize: config.pageSize
		});

		const data = response.data;
		const pageLogs = data.logs;

		pageCount = data.pageCount;
		page += 1;
		loadingBar.setTotal(pageCount);
		loadingBar.update(page);

		logs.push(...pageLogs.map(log => {
			return {
				caseNum: log.caseNum,
				guildID: log.server,
				type: log.type,
				user: log.user,
				mod: log.mod,
				reason: log.reason,
				message: log.message,
				action: log.action
				createdAt: new Date(log.createdAt)
			};
		}));
	}

	loadingBar.stop();

	fs.writeFileSync(outPath, JSON.stringify(logs, null, '	'));
	console.log(`Scraped ${logs.length} logs`);
})();