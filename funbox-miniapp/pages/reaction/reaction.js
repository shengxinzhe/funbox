Page({
  data: {
    state: 'idle',     // idle, waiting, ready, early, result
    reactionTime: 0,
    bestTime: 0,
    rating: ''
  },

  timer: null,
  startTime: 0,

  onLoad: function () {
    var best = wx.getStorageSync('reaction_best') || 0
    this.setData({ bestTime: best })
  },

  handleTap: function () {
    var state = this.data.state

    if (state === 'idle' || state === 'early' || state === 'result') {
      this.startWaiting()
    } else if (state === 'waiting') {
      // Tapped too early
      clearTimeout(this.timer)
      this.setData({ state: 'early' })
    } else if (state === 'ready') {
      // Record reaction time
      var time = Date.now() - this.startTime
      var best = this.data.bestTime
      if (best === 0 || time < best) {
        best = time
        wx.setStorageSync('reaction_best', best)
      }
      var rating = this.getRating(time)
      this.setData({
        state: 'result',
        reactionTime: time,
        bestTime: best,
        rating: rating
      })
    }
  },

  startWaiting: function () {
    this.setData({ state: 'waiting' })
    var delay = 1000 + Math.random() * 4000
    var self = this
    this.timer = setTimeout(function () {
      self.startTime = Date.now()
      self.setData({ state: 'ready' })
    }, delay)
  },

  getRating: function (ms) {
    if (ms < 200) return '\u95ea\u7535\u53cd\u5e94\uff01\u8d85\u4eba\u7c7b\u6c34\u5e73'
    if (ms < 250) return '\u975e\u5e38\u5feb\uff01\u4e13\u4e1a\u7ea7\u53cd\u5e94'
    if (ms < 300) return '\u5f88\u5feb\uff01\u8d85\u8fc7\u591a\u6570\u4eba'
    if (ms < 400) return '\u4e0d\u9519\uff01\u6b63\u5e38\u6c34\u5e73'
    return '\u518d\u52a0\u6cb9\uff01\u591a\u7ec3\u4e60\u53ef\u4ee5\u66f4\u5feb'
  },

  onShareAppMessage: function () {
    var time = this.data.reactionTime
    return {
      title: '\u6211\u7684\u53cd\u5e94\u901f\u5ea6 ' + time + 'ms\uff0c\u4f60\u80fd\u8d85\u8fc7\u6211\u5417\uff1f',
      path: '/pages/reaction/reaction'
    }
  },

  onShareTimeline: function () {
    return {
      title: '\u6211\u7684\u53cd\u5e94\u901f\u5ea6 ' + this.data.reactionTime + 'ms\uff0c\u6765\u6311\u6218\uff01'
    }
  },

  onUnload: function () {
    clearTimeout(this.timer)
  }
})
