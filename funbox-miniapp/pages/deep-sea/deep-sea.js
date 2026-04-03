var ZONES = [
  { name: '\u6d77\u9762', from: 0, to: 200, color1: '#0077be', color2: '#005a8e',
    creatures: [
      { icon: '\ud83d\udc2c', depth: 10, name: '\u6d77\u8c5a', desc: '\u7fa4\u5c45\u52a8\u7269\uff0c\u80fd\u8df3\u51fa\u6c34\u97623\u7c73\u9ad8' },
      { icon: '\ud83e\udeb8', depth: 20, name: '\u73ca\u7469\u7901', desc: '\u5360\u6d77\u6d0b\u4e0d\u52301%\uff0c\u517b\u6d3b25%\u7684\u6d77\u6d0b\u751f\u7269' },
      { icon: '\ud83d\udc22', depth: 40, name: '\u6d77\u9f9f', desc: '\u80fd\u5c4f\u4f4f\u547c\u5438\u957f\u8fbe7\u5c0f\u65f6' },
      { icon: '\ud83d\udc20', depth: 60, name: '\u5c0f\u4e11\u9c7c', desc: '\u548c\u6d77\u8475\u5171\u751f\uff0c\u4e92\u76f8\u4fdd\u62a4' },
      { icon: '\ud83e\udd88', depth: 100, name: '\u5927\u767d\u9ca8', desc: '\u6d77\u6d0b\u9876\u7ea7\u730e\u98df\u8005\uff0c\u65f6\u901f56\u516c\u91cc' },
      { icon: '\ud83e\udead', depth: 120, name: '\u6d77\u8c79', desc: '\u80fd\u5728\u6c34\u4e0b\u7761\u89c9\uff0c\u6bcf\u6b21\u53ea\u95ed\u4e00\u53ea\u773c' },
      { icon: '\ud83d\udc19', depth: 150, name: '\u7ae0\u9c7c', desc: '\u62e5\u67093\u9897\u5fc3\u810f\u548c\u84dd\u8272\u8840\u6db2' },
      { icon: '\ud83d\udc21', depth: 180, name: '\u6cb3\u8c5a', desc: '\u4f53\u5185\u6709\u8db3\u4ee5\u6740\u6b7b30\u4eba\u7684\u6bd2\u7d20' }
    ],
    landmarks: [
      { depth: 40, text: '\u5965\u8fd0\u4f1a\u6e38\u6cf3\u6c60\u6df1\u5ea6' },
      { depth: 130, text: '\u4f11\u95f2\u6f5c\u6c34\u6781\u9650' }
    ]
  },
  { name: '\u4e2d\u5c42\u5e26', from: 200, to: 1000, color1: '#005a8e', color2: '#002244',
    creatures: [
      { icon: '\ud83e\udd91', depth: 300, name: '\u5de8\u578b\u9c7f\u9c7c', desc: '\u773c\u775b\u6709\u7bee\u7403\u90a3\u4e48\u5927' },
      { icon: '\ud83e\udd9e', depth: 400, name: '\u6df1\u6d77\u9f99\u867e', desc: '\u7528\u89e6\u89d2\u5728\u9ed1\u6697\u4e2d\u611f\u77e5\u5468\u56f4' },
      { icon: '\ud83d\udc0b', depth: 500, name: '\u62b9\u9999\u9cb8', desc: '\u80fd\u4e0b\u6f5c\u52302000\u7c73\u6df1\u5904' },
      { icon: '\ud83d\udca1', depth: 700, name: '\u706f\u7b3c\u9c7c', desc: '\u7528\u751f\u7269\u53d1\u5149\u5438\u5f15\u730e\u7269' },
      { icon: '\ud83d\udc1a', depth: 800, name: '\u9e66\u9e49\u8782', desc: '\u6d3b\u5316\u77f3\uff0c\u57285\u4ebf\u5e74\u524d\u5c31\u5b58\u5728' },
      { icon: '\ud83e\udee7', depth: 900, name: '\u7ba1\u6c34\u6bcd', desc: '\u6700\u957f\u53ef\u8fbe40\u7c73\uff0c\u6bd4\u84dd\u9cb8\u8fd8\u957f' }
    ],
    landmarks: [
      { depth: 332, text: '\u4eba\u7c7b\u81ea\u7531\u6f5c\u6c34\u4e16\u754c\u7eaa\u5f55' },
      { depth: 500, text: '\u5e1d\u56fd\u5927\u53a6\u7684\u9ad8\u5ea6' },
      { depth: 828, text: '\u8fea\u62dc\u5854\u7684\u9ad8\u5ea6' }
    ]
  },
  { name: '\u6df1\u6d77\u5e26', from: 1000, to: 4000, color1: '#002244', color2: '#0a0a14',
    creatures: [
      { icon: '\ud83d\udc21', depth: 1500, name: '\u7435\u7436\u9c7c', desc: '\u96cc\u6027\u5934\u9876\u53d1\u5149\u8bf1\u9975\u5438\u5f15\u730e\u7269' },
      { icon: '\ud83e\uddb7', depth: 1800, name: '\u5c16\u7259\u9c7c', desc: '\u62e5\u6709\u4e0e\u8eab\u4f53\u6bd4\u4f8b\u6700\u5927\u7684\u7259\u9f7f' },
      { icon: '\ud83d\udc0d', depth: 2000, name: '\u541e\u566c\u9cb3', desc: '\u80fd\u541e\u4e0b\u6bd4\u81ea\u5df1\u5927\u7684\u730e\u7269' },
      { icon: '\ud83e\udeb1', depth: 2500, name: '\u7ba1\u866b', desc: '\u4e0d\u9700\u8981\u9633\u5149\uff0c\u9760\u5316\u5b66\u80fd\u751f\u5b58' },
      { icon: '\ud83d\udd77\ufe0f', depth: 3000, name: '\u6d77\u8718\u86db', desc: '\u817f\u5c55\u53ef\u8fbe70\u5398\u7c73\u7684\u6df1\u6d77\u8282\u80a2\u52a8\u7269' },
      { icon: '\ud83e\udd90', depth: 3500, name: '\u5de8\u578b\u7b49\u8db3\u866b', desc: '\u6df1\u6d77\u7684\u201c\u897f\u74dc\u866b\u201d\uff0c\u53ef\u8fbe50\u5398\u7c73' },
      { icon: '\ud83d\udc1a', depth: 3800, name: '\u6df1\u6d77\u76f2\u867e', desc: '\u773c\u775b\u9000\u5316\uff0c\u9760\u80cc\u90e8\u611f\u5149\u5668\u5b98\u63a2\u6d4b\u70ed\u6cc9' }
    ],
    landmarks: [
      { depth: 1000, text: '\u6c38\u6052\u9ed1\u6697\u4ece\u8fd9\u91cc\u5f00\u59cb' },
      { depth: 2250, text: '\u5927\u897f\u6d0b\u4e2d\u810a\u6df1\u5ea6' },
      { depth: 3800, text: '\u6cf0\u5766\u5c3c\u514b\u53f7\u6c89\u6ca1\u6df1\u5ea6' }
    ]
  },
  { name: '\u8d85\u6df1\u6e0a\u5e26', from: 4000, to: 11000, color1: '#0a0a14', color2: '#020204',
    creatures: [
      { icon: '\ud83d\udc0c', depth: 5000, name: '\u94c1\u7532\u8717\u725b', desc: '\u58f3\u4e0a\u8986\u76d6\u786b\u5316\u94c1\uff0c\u5929\u7136\u88c5\u7532' },
      { icon: '\ud83d\udc1b', depth: 6000, name: '\u50f5\u5c38\u8820\u866b', desc: '\u4ee5\u9cb8\u9c7c\u9aa8\u9abc\u4e3a\u98df\uff0c\u6ca1\u6709\u5634\u4e5f\u6ca1\u6709\u80c3' },
      { icon: '\ud83e\udd91', depth: 7000, name: '\u5c0f\u98de\u8c61\u7ae0\u9c7c', desc: '\u8033\u72b6\u9ccd\u50cf\u5927\u8c61\u8033\u6735\uff0c\u6700\u6df1\u7684\u7ae0\u9c7c' },
      { icon: '\ud83e\udddc', depth: 8200, name: '\u6df1\u6d77\u6c34\u6bcd', desc: '\u57288000\u7c73\u6df1\u5904\u7684\u5e7d\u7075\u6c34\u6bcd' },
      { icon: '\ud83d\udc1f', depth: 8178, name: '\u9a6c\u91cc\u4e9a\u7eb3\u72ee\u5b50\u9c7c', desc: '\u5df2\u77e5\u6700\u6df1\u5904\u7684\u9c7c\u7c7b' },
      { icon: '\ud83e\udd90', depth: 9800, name: '\u6df1\u6e0a\u94a9\u867e', desc: '\u5728\u8fd1\u4e07\u7c73\u6df1\u5904\u4ecd\u6d3b\u8dc3\u7684\u7532\u58f3\u52a8\u7269' },
      { icon: '\ud83e\udda0', depth: 10900, name: '\u6781\u7aef\u5fae\u751f\u7269', desc: '\u5728\u6781\u7aef\u9ad8\u538b\u4e0b\u4ecd\u5b58\u6d3b\u7684\u751f\u547d' }
    ],
    landmarks: [
      { depth: 4267, text: '\u5e73\u5747\u6d77\u6d0b\u6df1\u5ea6' },
      { depth: 8848, text: '\u73e0\u7a46\u6717\u739b\u5cf0\u5012\u8fc7\u6765\u653e\uff0c\u5cf0\u9876\u5728\u8fd9\u91cc' },
      { depth: 10935, text: '\u6311\u6218\u8005\u6df1\u6e0a \u2014 \u5730\u7403\u6700\u6df1\u70b9' }
    ]
  }
]

var MAX_DEPTH = 11000
var RPX_PER_METER = 8

Page({
  data: {
    zones: [],
    currentDepth: 0,
    scrollTop: 0
  },

  totalHeight: 0,

  onLoad: function () {
    var zones = ZONES.map(function (z) {
      var range = z.to - z.from
      var height = range * RPX_PER_METER
      return {
        name: z.name,
        from: z.from,
        to: z.to,
        color1: z.color1,
        color2: z.color2,
        height: height,
        creatures: z.creatures.map(function (c) {
          return {
            icon: c.icon,
            name: c.name,
            desc: c.desc,
            depth: c.depth,
            offset: Math.floor(((c.depth - z.from) / range) * 100)
          }
        }),
        landmarks: z.landmarks.map(function (lm) {
          return {
            depth: lm.depth,
            text: lm.text,
            offset: Math.floor(((lm.depth - z.from) / range) * 100)
          }
        })
      }
    })
    this.totalHeight = MAX_DEPTH * RPX_PER_METER
    this.setData({ zones: zones })
  },

  onScroll: function (e) {
    var scrollTop = e.detail.scrollTop
    var ratio = scrollTop / (this.totalHeight * 0.5) // approximate rpx to px
    var depth = Math.min(Math.floor(ratio * MAX_DEPTH), MAX_DEPTH)
    if (Math.abs(depth - this.data.currentDepth) > 5) {
      this.setData({ currentDepth: depth })
    }
  },

  onShareAppMessage: function () {
    return {
      title: '\u6211\u5df2\u4e0b\u6f5c\u5230' + this.data.currentDepth + '\u7c73\u6df1\u6d77\uff0c\u6765\u63a2\u7d22\u6df1\u6d77\u4e16\u754c\uff01',
      path: '/pages/deep-sea/deep-sea'
    }
  },

  onShareTimeline: function () {
    return {
      title: '\u6df1\u6d77\u63a2\u7d22 - \u4ece\u6d77\u9762\u4e00\u76f4\u4e0b\u6f5c\u523011000\u7c73'
    }
  }
})
