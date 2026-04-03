Page({
  data: {
    level: 1,
    bestLevel: 0,
    gridSize: 3,
    cells: [],
    phase: 'idle',  // idle, memorize, input, success, fail
    statusText: '点击开始游戏',
    statusClass: ''
  },

  targets: [],
  found: [],
  timer: null,

  onLoad: function () {
    var best = wx.getStorageSync('memory_best') || 0
    this.setData({ bestLevel: best })
    this.initGrid()
  },

  getGridSize: function (level) {
    if (level <= 3) return 3
    if (level <= 6) return 4
    if (level <= 10) return 5
    return 6
  },

  getTargetCount: function (level) {
    if (level <= 2) return 3
    if (level <= 4) return 4
    if (level <= 6) return 5
    if (level <= 8) return 6
    if (level <= 10) return 7
    return 8
  },

  initGrid: function () {
    var size = this.getGridSize(this.data.level)
    var cells = []
    for (var i = 0; i < size * size; i++) {
      cells.push({ state: '' })
    }
    this.setData({ gridSize: size, cells: cells })
  },

  startGame: function () {
    var level = this.data.phase === 'fail' ? 1 : this.data.level
    this.setData({ level: level, phase: 'memorize', statusText: '记住高亮的格子', statusClass: 'memorize' })
    this.initGrid()

    var size = this.getGridSize(level)
    var total = size * size
    var count = this.getTargetCount(level)

    // Pick random targets
    var targets = []
    while (targets.length < count) {
      var r = Math.floor(Math.random() * total)
      if (targets.indexOf(r) === -1) targets.push(r)
    }
    this.targets = targets
    this.found = []

    // Show targets
    var cells = this.data.cells.slice()
    for (var i = 0; i < targets.length; i++) {
      cells[targets[i]] = { state: 'highlight' }
    }
    this.setData({ cells: cells })

    // Hide after delay
    var delay = Math.max(800, 2000 - (level - 1) * 100)
    var self = this
    this.timer = setTimeout(function () {
      var cells = []
      for (var i = 0; i < size * size; i++) {
        cells.push({ state: '' })
      }
      self.setData({ cells: cells, phase: 'input', statusText: '点击你记住的格子', statusClass: 'input' })
    }, delay)
  },

  tapCell: function (e) {
    if (this.data.phase !== 'input') return

    var idx = e.currentTarget.dataset.index
    if (this.found.indexOf(idx) !== -1) return // already tapped

    var cells = this.data.cells.slice()

    if (this.targets.indexOf(idx) !== -1) {
      // Correct
      cells[idx] = { state: 'correct' }
      this.found.push(idx)
      this.setData({ cells: cells })

      if (this.found.length === this.targets.length) {
        // Level complete
        var nextLevel = this.data.level + 1
        var best = this.data.bestLevel
        if (nextLevel - 1 > best) {
          best = nextLevel - 1
          wx.setStorageSync('memory_best', best)
        }
        this.setData({
          phase: 'success',
          statusText: '通过! 进入下一关',
          statusClass: 'success',
          bestLevel: best
        })
        var self = this
        setTimeout(function () {
          self.setData({ level: nextLevel })
          self.startGame()
        }, 800)
      }
    } else {
      // Wrong
      cells[idx] = { state: 'wrong' }
      // Reveal all targets
      for (var i = 0; i < this.targets.length; i++) {
        if (this.found.indexOf(this.targets[i]) === -1) {
          cells[this.targets[i]] = { state: 'reveal' }
        }
      }
      this.setData({
        cells: cells,
        phase: 'fail',
        statusText: '游戏结束! 到达第' + this.data.level + '关',
        statusClass: 'fail'
      })
    }
  },

  onShareAppMessage: function () {
    return {
      title: '记忆矩阵我到了第' + this.data.level + '关，你能超过我吗？',
      path: '/pages/memory/memory'
    }
  },

  onShareTimeline: function () {
    return {
      title: '记忆矩阵第' + this.data.level + '关，来挑战！'
    }
  },

  onUnload: function () {
    clearTimeout(this.timer)
  }
})
