var TEXTS = [
  '\u751f\u6d3b\u5c31\u50cf\u6d77\u6d0b\uff0c\u53ea\u6709\u610f\u5fd7\u575a\u5f3a\u7684\u4eba\u624d\u80fd\u5230\u8fbe\u5f7c\u5cb8\u3002\u4eba\u751f\u7684\u4ef7\u503c\uff0c\u5e76\u4e0d\u662f\u7528\u65f6\u95f4\u6765\u8861\u91cf\uff0c\u800c\u662f\u7528\u6df1\u5ea6\u6765\u8861\u91cf\u3002\u6211\u4eec\u5fc5\u987b\u63a5\u53d7\u5931\u671b\uff0c\u56e0\u4e3a\u5b83\u662f\u6709\u9650\u7684\uff0c\u4f46\u5343\u4e07\u4e0d\u53ef\u5931\u53bb\u5e0c\u671b\uff0c\u56e0\u4e3a\u5b83\u662f\u65e0\u7a77\u7684\u3002',
  '\u4e16\u754c\u4e0a\u6700\u5bbd\u9614\u7684\u662f\u6d77\u6d0b\uff0c\u6bd4\u6d77\u6d0b\u66f4\u5bbd\u9614\u7684\u662f\u5929\u7a7a\uff0c\u6bd4\u5929\u7a7a\u66f4\u5bbd\u9614\u7684\u662f\u4eba\u7684\u80f8\u6000\u3002\u5728\u4eba\u751f\u7684\u9053\u8def\u4e0a\uff0c\u6bcf\u4e00\u4e2a\u4eba\u90fd\u662f\u5b64\u72ec\u7684\u65c5\u5ba2\u3002',
  '\u6210\u529f\u4e0d\u662f\u5c06\u6765\u624d\u6709\u7684\uff0c\u800c\u662f\u4ece\u51b3\u5b9a\u53bb\u505a\u7684\u90a3\u4e00\u523b\u8d77\u6301\u7eed\u7d2f\u79ef\u800c\u6210\u3002\u6bcf\u4e00\u4e2a\u4f18\u79c0\u7684\u4eba\uff0c\u90fd\u4e0d\u662f\u4e0e\u751f\u4ff1\u6765\u7684\uff0c\u800c\u662f\u7ecf\u5386\u4e86\u65e0\u6570\u6b21\u7684\u8dcc\u5012\u4e0e\u722c\u8d77\u3002',
  '\u8bfb\u4e00\u672c\u597d\u4e66\u5c31\u662f\u548c\u4e00\u4e2a\u9ad8\u5c1a\u7684\u4eba\u5bf9\u8bdd\u3002\u4e66\u7c4d\u662f\u5168\u4e16\u754c\u7684\u8425\u517b\u54c1\uff0c\u751f\u6d3b\u91cc\u6ca1\u6709\u4e66\u7c4d\uff0c\u5c31\u597d\u50cf\u5927\u5730\u6ca1\u6709\u9633\u5149\u3002\u667a\u6167\u91cc\u6ca1\u6709\u4e66\u7c4d\uff0c\u5c31\u597d\u50cf\u9e1f\u513f\u6ca1\u6709\u7fc5\u8180\u3002',
  '\u65f6\u95f4\u5c31\u50cf\u6d77\u7ef5\u91cc\u7684\u6c34\uff0c\u53ea\u8981\u613f\u6324\u603b\u8fd8\u662f\u6709\u7684\u3002\u4e0d\u8981\u7b49\u5f85\u673a\u4f1a\uff0c\u800c\u8981\u521b\u9020\u673a\u4f1a\u3002\u751f\u547d\u592a\u8fc7\u77ed\u6682\uff0c\u4eca\u5929\u653e\u5f03\u4e86\u660e\u5929\u4e0d\u4e00\u5b9a\u80fd\u5f97\u5230\u3002'
]

var DURATION = 60

Page({
  data: {
    phase: 'idle',  // idle, playing, result
    timeLeft: DURATION,
    timerPct: 100,
    targetChars: [],
    inputVal: '',
    inputFocus: false,
    cpm: 0,
    correctChars: 0,
    wrongChars: 0,
    accuracy: 0,
    bestCPM: 0
  },

  targetText: '',
  timer: null,

  onLoad: function () {
    var best = wx.getStorageSync('typing_best') || 0
    this.setData({ bestCPM: best })
  },

  startGame: function () {
    // Pick random text
    var text = TEXTS[Math.floor(Math.random() * TEXTS.length)]
    // May concatenate multiple texts
    while (text.length < 200) {
      text += TEXTS[Math.floor(Math.random() * TEXTS.length)]
    }
    this.targetText = text

    var chars = text.split('').map(function (ch, i) {
      return { ch: ch, state: i === 0 ? 'current' : '', idx: i }
    })

    this.setData({
      phase: 'playing',
      timeLeft: DURATION,
      timerPct: 100,
      targetChars: chars,
      inputVal: '',
      inputFocus: true
    })

    var self = this
    this.timer = setInterval(function () {
      var t = self.data.timeLeft - 1
      if (t <= 0) {
        clearInterval(self.timer)
        self.endGame()
        return
      }
      self.setData({
        timeLeft: t,
        timerPct: ((t / DURATION) * 100).toFixed(1)
      })
    }, 1000)
  },

  onInput: function (e) {
    if (this.data.phase !== 'playing') return
    var val = e.detail.value
    var target = this.targetText
    var correct = 0
    var wrong = 0

    var chars = target.split('').map(function (ch, i) {
      if (i < val.length) {
        if (val[i] === ch) {
          correct++
          return { ch: ch, state: 'correct', idx: i }
        } else {
          wrong++
          return { ch: ch, state: 'wrong', idx: i }
        }
      } else if (i === val.length) {
        return { ch: ch, state: 'current', idx: i }
      }
      return { ch: ch, state: '', idx: i }
    })

    this.setData({ inputVal: val, targetChars: chars })

    // Store for result calculation
    this._correct = correct
    this._wrong = wrong
  },

  endGame: function () {
    var correct = this._correct || 0
    var wrong = this._wrong || 0
    var total = correct + wrong
    var accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
    var cpm = correct // characters per minute (since duration is 60s)

    var best = this.data.bestCPM
    if (cpm > best) {
      best = cpm
      wx.setStorageSync('typing_best', best)
    }

    this.setData({
      phase: 'result',
      cpm: cpm,
      correctChars: correct,
      wrongChars: wrong,
      accuracy: accuracy,
      bestCPM: best,
      inputFocus: false
    })
  },

  onShareAppMessage: function () {
    return {
      title: '\u6211\u7684\u6253\u5b57\u901f\u5ea6 ' + this.data.cpm + ' \u5b57/\u5206\u949f\uff0c\u4f60\u80fd\u8d85\u8fc7\u6211\u5417\uff1f',
      path: '/pages/typing/typing'
    }
  },

  onShareTimeline: function () {
    return {
      title: '\u6253\u5b57\u901f\u5ea6\u6d4b\u8bd5 - \u6211 ' + this.data.cpm + ' \u5b57/\u5206\u949f'
    }
  },

  onUnload: function () {
    clearInterval(this.timer)
  }
})
