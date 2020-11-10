const MAIN_SEPARATOR = '\n'
const DEFAULT_SEPARATOR = ' '

function parseEvent (raw) {
  const input = raw.split(DEFAULT_SEPARATOR)
  let idx = 0

  return {
    type: +input[idx++],
    playerIdx: +input[idx++],
    spellId: +input[idx++],
    resultId: +input[idx++],
    tomeIdx: +input[idx++],
    acquired: +input[idx++],
    lost: +input[idx++]
  }
}

function parseSpells (raw) {
  const input = raw.split(DEFAULT_SEPARATOR)
  let idx = 0
  const spells = []
  const toIdx = parseInt(input[idx]) * 7 + ++idx

  while (idx < toIdx) {
    spells.push({
      id: +input[idx++],
      delta: [+input[idx++], +input[idx++], +input[idx++], +input[idx++]],
      repeatable: input[idx++] === 'true',
      score: +input[idx++]
    })
  }

  return spells
}

function parseAnimData (raw) {
  const input = raw.split(DEFAULT_SEPARATOR)
  let idx = 0
  const animData = []
  const toIdx = parseInt(input[idx]) * 4 + ++idx

  while (idx < toIdx) {
    animData.push({
      start: +input[idx++],
      end: +input[idx++],
      trigger: +input[idx++],
      triggerEnd: +input[idx++]
    })
  }

  return animData
}

function parseArray (raw, parseFun = parseInt) {
  if (raw === '') {
    return []
  }

  const input = raw.split(DEFAULT_SEPARATOR)
  return input.map(element => parseFun(element))
}

function parseMap (raw, parseFunKey = parseInt, parseFunValue = parseInt) {
  if (raw === '') {
    return []
  }

  const input = raw.split(DEFAULT_SEPARATOR)
  const map = []
  for (let i = 0; i < input.length; i += 2) {
    map[parseFunKey(input[i])] = parseFunValue(input[i + 1])
  }
  return map
}

function parsebonusData (raw) {
  const input = raw.split(',')
  return {
    value: parseInt(input[0]),
    amount: parseInt(input[1])
  }
}

function parseMessage (raw, messages) {
  if (raw === '') {
    return
  }

  const separatorIndex = raw.indexOf(' ')
  const key = +raw.substring(0, separatorIndex)
  messages[key] = raw.substring(separatorIndex + 1)
}

export function parseData (raw, globalData) {
  const input = raw.split(MAIN_SEPARATOR)

  const data = {
    events: [],
    playerSpells: [],
    inventories: [],
    messages: []
  }

  let idx = 0
  let toIdx = parseInt(input[idx]) * 3 + ++idx
  while (idx < toIdx) {
    const event = parseEvent(input[idx++])
    event.spells = parseSpells(input[idx++])
    event.animData = parseAnimData(input[idx++])
    data.events.push(event)
  }

  data.scores = parseArray(input[idx++])

  toIdx = parseInt(input[idx]) + ++idx
  while (idx < toIdx) {
    data.playerSpells.push(parseArray(input[idx++]))
  }

  data.tomeSpells = parseArray(input[idx++])
  data.deliveries = parseArray(input[idx++])

  toIdx = parseInt(input[idx]) + ++idx
  while (idx < toIdx) {
    data.inventories.push(parseArray(input[idx++]))
  }

  data.active = parseArray(input[idx++])
  data.stock = parseMap(input[idx++])
  data.bonus = parseMap(input[idx++], parseInt, parsebonusData)

  toIdx = input.length
  while (idx < toIdx) {
    parseMessage(input[idx++], data.messages)
  }

  return data
}

export function parseGlobalData (raw) {
  const input = raw.split(MAIN_SEPARATOR)

  const data = {
    playerSpells: [],
    tomeSpells: [],
    deliveries: []
  }

  let idx = 0
  const toIdx = parseInt(input[idx]) + ++idx
  while (idx < toIdx) {
    data.playerSpells.push(parseSpells(input[idx++]))
  }

  data.tomeSpells = parseSpells(input[idx++])
  data.deliveries = parseSpells(input[idx++])

  return data
}
