// 为单个题目生成路径，如果失败返回 null
const generatePathForProblem = (problem) => {
  // 使用 URL 类解析 URL
  let urlObj = null
  try {
    urlObj = new URL(problem.url)
  } catch {
    return null
  }

  // 域名到 OJ 名称的映射表
  // 用于处理 group 字段不存在的情况（如 QOJ、CJOJ 等基于 UOJ 搭建的 OJ）
  const DOMAIN_MAPPING = {
    'qoj.ac': 'QOJ',
    '172.40.253.199': 'CJOJ',
    '172.40.253.164': 'XZOJ',
  }

  let folderName = null

  // 检查域名映射表
  const hostname = urlObj.hostname
  for (const [domain, ojName] of Object.entries(DOMAIN_MAPPING)) {
    if (hostname.includes(domain)) {
      folderName = ojName
      break
    }
  }

  if (folderName === null) {
    // 检查 group 字段是否存在且非空
    if (!problem.group) {
      logger.warn(`题目 "${problem.name}" 的 group 字段不存在或为空，使用默认文件夹名`)
      folderName = 'Unknown'
    } else {
      // 从 group 字段提取 OJ 名称作为文件夹
      folderName = problem.group
      if (folderName.includes(' - ')) {
        folderName = folderName.split(' - ')[0]
      }
    }
  }

  // 使用 utils.sanitize 清理文件夹名中的非法字符
  folderName = utils.sanitize(folderName)

  let fileName = ''

  // 检查是否是 Codeforces
  const isCodeforces = hostname.includes('codeforces.com')

  if (isCodeforces) {
    // Codeforces 特殊处理
    const pathname = urlObj.pathname
    const parts = pathname.split('/').filter(p => p)

    // 检查是否是 Gym
    const isGym = parts[0] === 'gym'

    if (isGym) {
      // Gym 题目：文件夹名改为 Gym
      folderName = 'Gym'
      assert(parts.length >= 4, `无效的 Codeforces Gym URL：${urlObj.href}`)
      fileName = parts[1] + parts[3]
    } else {
      // 普通 Codeforces 题目
      assert(parts.length >= 4, `无效的 Codeforces URL：${urlObj.href}`)
      if (parts[0] === 'problemset' && parts[1] === 'problem') {
        fileName = parts[2] + parts[3]
      } else if (parts[0] === 'contest' && parts[2] === 'problem') {
        fileName = parts[1] + parts[3]
      } else {
        assert(false, `无效的 Codeforces URL：${urlObj.href}`)
      }
    }
  }

  // 如果不是 Codeforces，使用通用方法
  else {
    // 获取路径名
    const pathname = urlObj.pathname

    // 移除路径末尾的斜杠，然后获取最后一段作为文件名
    const trimmedPathname = pathname.replace(/\/+$/, '')
    fileName = path.basename(trimmedPathname) || hostname
  }

  // 使用 utils.sanitize 清理文件名中的非法字符
  fileName = utils.sanitize(fileName)

  // 使用 path.join 组合相对路径，并添加 .cpp 后缀
  const relativePath = path.join(folderName, fileName + '.cpp')

  // 转换为绝对路径
  // 使用工作区根目录作为基础路径
  if (!workspaceFolders || workspaceFolders.length === 0) {
    logger.error('当前没有打开的工作区')
    return null
  }

  const absolutePath = path.join(workspaceFolders[0].path, relativePath)
  return absolutePath
}

const process = async () => {
  let results = []

  for (const problem of problems) {
    const filePath = generatePathForProblem(problem)
    results.push(filePath)
  }

  return results
}