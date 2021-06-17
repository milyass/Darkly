const JSSoup = require('jssoup').default;
const axios = require('axios');
const ora = require('ora');
const process = require('process');
const chalk = require('chalk');
// 'http://10.12.100.249/.hidden/'
const url = process.argv[2]
const HashRegex = new RegExp(/^[a-f0-9]{33}$/)

if(!url) { 
    console.log(`Usage: node app.js ${chalk.yellow('Darkly_URL')}`);
    return process.exit(0)
} 

let README_LIST = []

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const GetReadmeFiles = async (url) => {
    try {
        var res = await axios.get(url)
        var soup = new JSSoup(res.data);
        var tags = soup.findAll('a')
        for (var i = 0; i < tags.length; i++) {
            await sleep(800)
            var a = tags[i]
            var link = a.contents[0]._text
            if (link.substring(0, 2) === '..') true
            else if (link.slice(-1) === '/') GetReadmeFiles(url + link)
            else {
                var res2 = await axios.get(url + link)
                if (README_LIST.indexOf(res2.data) === -1) {
                    README_LIST.push(res2.data)
                    const possibleHash = res2.data.replace(/\n/g, '')
                    if(HashRegex.test(possibleHash)) {
                        console.log(`   ✅ Found Hash: ${chalk.red(possibleHash)}`)
                        console.log(`   🔶 Hash Link: ${chalk.blueBright(url)}${chalk.blueBright(link)}`)
                        return process.exit(0) 
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err)
    }
}

ora(`🔍 Searching For Hash In ${chalk.magentaBright(url)} \n`).start();
GetReadmeFiles(url)