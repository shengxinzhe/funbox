var LIFESPAN = 80

Page({
  data: {
    birthDate: '',
    livedWeeks: 0,
    remainWeeks: 0,
    pct: 0,
    rows: []
  },

  onLoad: function () {
    var saved = wx.getStorageSync('life_birth')
    if (saved) {
      this.calculate(saved)
    }
  },

  onDateChange: function (e) {
    var date = e.detail.value
    wx.setStorageSync('life_birth', date)
    this.calculate(date)
  },

  calculate: function (dateStr) {
    var birth = new Date(dateStr)
    var now = new Date()
    var totalWeeks = LIFESPAN * 52
    var diffMs = now.getTime() - birth.getTime()
    var livedWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
    if (livedWeeks < 0) livedWeeks = 0
    if (livedWeeks > totalWeeks) livedWeeks = totalWeeks
    var remainWeeks = totalWeeks - livedWeeks
    var pct = ((livedWeeks / totalWeeks) * 100).toFixed(1)

    // Build grid rows
    var rows = []
    var weekIdx = 0
    for (var year = 0; year < LIFESPAN; year++) {
      var weeks = []
      for (var w = 0; w < 52; w++) {
        var state = 'future'
        if (weekIdx < livedWeeks) state = 'lived'
        else if (weekIdx === livedWeeks) state = 'current'
        weeks.push({ idx: weekIdx, state: state })
        weekIdx++
      }
      rows.push({ year: year, weeks: weeks })
    }

    this.setData({
      birthDate: dateStr,
      livedWeeks: livedWeeks,
      remainWeeks: remainWeeks,
      pct: pct,
      rows: rows
    })
  },

  reset: function () {
    wx.removeStorageSync('life_birth')
    this.setData({ birthDate: '', rows: [] })
  },

  onShareAppMessage: function () {
    return {
      title: '\u6211\u7684\u4eba\u751f\u5df2\u8fc7 ' + this.data.pct + '%\uff0c\u4f60\u5462\uff1f',
      path: '/pages/life-weeks/life-weeks'
    }
  },

  onShareTimeline: function () {
    return {
      title: '\u4eba\u751f\u5c0f\u683c\u5b50 - \u7528\u683c\u5b50\u770b\u89c1\u4f60\u7684\u4e00\u751f'
    }
  }
})
