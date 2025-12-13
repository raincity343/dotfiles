const getRelativePath = (problem) => {
  logger.info(`正在处理题目 ${problem.name}`)

  let url = null
  try {
    url = new URL(problem.url)
  } catch {
    throw new Error(`不合法的 URL: ${problem.url}`)
  }

  const isHost = (host) => url.hostname === host || url.hostname.endsWith(`.${host}`)

  const ojByHost = new Map([
    ['qoj.ac', 'QOJ'],
    ['172.40.253.199', 'CJOJ'],
    ['172.40.253.164', 'XZOJ'],
  ])

  let ojName = null
  for (const [host, oj] of ojByHost) {
    if (isHost(host)) {
      ojName = oj
      break
    }
  }

  if (ojName === null && problem.group) {
    ojName = problem.group
    if (ojName.includes(' - ')) {
      ojName = ojName.split(' - ')[0]
    }
  }

  if (ojName === null) {
    logger.warn('题目不属于已知来源, 且题目的 group 字段不存在或为空, 使用默认文件夹名')
    ojName = 'Unknown'
  }

  ojName = utils.sanitize(ojName)

  let problemId = null

  if (isHost('codeforces.com')) {
    const regexPatterns = [
      /\/contest\/(\d+)\/problem\/(\w+)/,
      /\/problemset\/problem\/(\d+)\/(\w+)/,
      /\/gym\/(\d+)\/problem\/(\w+)/,
    ]
    for (const regex of regexPatterns) {
      const match = url.pathname.match(regex)
      if (match) {
        problemId = `${match[1]}${match[2]}`
        break
      }
    }
    if (problemId === null) {
      logger.warn(`不合法的 Codeforces URL: ${url.href}`)
    }
  }

  if (problemId === null) {
    problemId = url.pathname.replace(/\/+$/, '')
    problemId = path.basename(problemId)
  }

  problemId = utils.sanitize(problemId)

  const fileName = 'sol.cpp'
  return path.join(ojName, problemId, fileName)
}

const process = async () => {
  if (!workspaceFolders || workspaceFolders.length === 0) {
    throw new Error('没有打开的工作区')
  }

  const results = []
  for (const problem of problems) {
    const relativePath = getRelativePath(problem)
    const absolutePath = path.join(workspaceFolders[0].path, relativePath)
    results.push(absolutePath)
  }
  return results
}