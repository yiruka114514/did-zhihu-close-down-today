require('dotenv').config()

const axios = require('axios')
const moment = require('moment')
const { Toolkit } = require('actions-toolkit')
const { GistBox } = require('gist-box')

Toolkit.run(
  async tools => {
    const { GIST_ID, GH_USERNAME, GH_PAT } = process.env

    // Get the user's public events
    tools.log.debug(`Getting activity for ${GH_USERNAME}`)

    let closed = true
    for (let i = 0; i < 3; i++) {
      await axios.get('https://www.zhihu.com').then(res => {
        if (res.status === 200) {
          closed = false
        }
      })
    }

    const time = moment().format('YYYY-MM-DD kk:mm ZZ')

    let content = ''
    if (closed) {
       tools.log.debug( `知乎真的倒闭了！！！
Zhihu.com have closed down today!!!😊

${time}
      `)
    } else {
       tools.log.debug(`知乎还没有倒闭……
Zhihu.com haven't closed down today... 😔

${time}
      `)
    }
  },
  {
    event: ['schedule', 'push'],
    secrets: ['GH_PAT', 'GH_USERNAME', 'GIST_ID']
  }
)
