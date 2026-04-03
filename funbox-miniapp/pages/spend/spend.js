var TOTAL = 100000000000 // $100 billion

var ALL_ITEMS = [
  { icon: '\ud83c\udf54', key: 'burger', name: '\u5927\u6c49\u5821', price: 2 },
  { icon: '\u2615', key: 'coffee', name: '\u5496\u5561', price: 5 },
  { icon: '\ud83c\udf55', key: 'pizza', name: '\u62ab\u8428', price: 12 },
  { icon: '\ud83d\udcd6', key: 'book', name: '\u4e00\u672c\u4e66', price: 15 },
  { icon: '\ud83c\udfac', key: 'movie', name: '\u7535\u5f71\u7968', price: 20 },
  { icon: '\ud83d\udc55', key: 'tshirt', name: 'T\u6064\u886b', price: 30 },
  { icon: '\ud83c\udfa7', key: 'airpods', name: 'AirPods Pro', price: 250 },
  { icon: '\ud83d\udc5f', key: 'shoes', name: '\u540d\u724c\u7403\u978b', price: 250 },
  { icon: '\ud83c\udfae', key: 'console', name: '\u6e38\u620f\u673a', price: 500 },
  { icon: '\ud83d\udeb2', key: 'bike', name: '\u81ea\u884c\u8f66', price: 800 },
  { icon: '\ud83d\udcf1', key: 'phone', name: 'iPhone', price: 1200 },
  { icon: '\ud83d\udcbb', key: 'laptop', name: 'MacBook Pro', price: 2500 },
  { icon: '\ud83d\udc36', key: 'puppy', name: '\u7eaf\u79cd\u72d7', price: 3000 },
  { icon: '\ud83d\udc8e', key: 'diamond', name: '\u94bb\u77f3\u9879\u94fe', price: 5000 },
  { icon: '\ud83c\udfcd\ufe0f', key: 'motorcycle', name: '\u54c8\u96f7\u6469\u6258', price: 15000 },
  { icon: '\u231a', key: 'watch', name: '\u52b3\u529b\u58eb\u624b\u8868', price: 25000 },
  { icon: '\ud83c\udf93', key: 'tuition', name: '\u5927\u5b66\u56db\u5e74\u5b66\u8d39', price: 50000 },
  { icon: '\ud83c\udfd6\ufe0f', key: 'wedding', name: '\u8c6a\u534e\u5a5a\u793c', price: 80000 },
  { icon: '\ud83c\udfce\ufe0f', key: 'sportscar', name: '\u5170\u535a\u57fa\u5c3c', price: 250000 },
  { icon: '\ud83c\udfe0', key: 'house', name: '\u4e00\u5957\u623f\u5b50', price: 500000 },
  { icon: '\ud83d\ude81', key: 'helicopter', name: '\u76f4\u5347\u673a', price: 1500000 },
  { icon: '\ud83c\udfe5', key: 'hospital', name: '\u5efa\u4e00\u6240\u533b\u9662', price: 5000000 },
  { icon: '\u2708\ufe0f', key: 'jet', name: '\u79c1\u4eba\u98de\u673a', price: 20000000 },
  { icon: '\ud83c\udfe2', key: 'building', name: '\u6469\u5929\u5927\u697c', price: 30000000 },
  { icon: '\ud83c\udfa8', key: 'painting', name: '\u8499\u5a1c\u4e3d\u838e\u7ea7\u540d\u753b', price: 100000000 },
  { icon: '\ud83d\ude80', key: 'rocket', name: '\u706b\u7bad\u53d1\u5c04', price: 200000000 },
  { icon: '\ud83c\udfdf\ufe0f', key: 'stadium', name: '\u4f53\u80b2\u573a', price: 500000000 },
  { icon: '\ud83d\udea2', key: 'cruise', name: '\u8d85\u7ea7\u6e38\u8f6e', price: 1000000000 },
  { icon: '\u26bd', key: 'team', name: '\u8db3\u7403\u4ff1\u4e50\u90e8', price: 2000000000 },
  { icon: '\ud83c\udfdd\ufe0f', key: 'island', name: '\u79c1\u4eba\u5c9b\u5c7f', price: 5000000000 },
  { icon: '\ud83c\udf0d', key: 'charity', name: '\u6d88\u9664\u4e00\u79cd\u75be\u75c5', price: 10000000000 }
]

function fmtMoney(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(n % 1e9 === 0 ? 0 : 1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(n % 1e6 === 0 ? 0 : 1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(n % 1e3 === 0 ? 0 : 1) + 'K'
  return n.toLocaleString()
}

Page({
  data: {
    balance: TOTAL,
    balanceStr: fmtMoney(TOTAL),
    totalSpent: 0,
    spentStr: '0',
    items: [],
    receipt: []
  },

  cart: {},

  onLoad: function () {
    var items = ALL_ITEMS.map(function (it) {
      return {
        icon: it.icon,
        key: it.key,
        name: it.name,
        price: it.price,
        priceStr: fmtMoney(it.price),
        qty: 0
      }
    })
    var cart = {}
    ALL_ITEMS.forEach(function (it) { cart[it.key] = 0 })
    this.cart = cart
    this.setData({ items: items })
  },

  buy: function (e) {
    var key = e.currentTarget.dataset.key
    var item = ALL_ITEMS.find(function (it) { return it.key === key })
    if (this.data.balance < item.price) return

    this.cart[key]++
    this.updateState()
  },

  sell: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.cart[key] <= 0) return

    this.cart[key]--
    this.updateState()
  },

  updateState: function () {
    var spent = 0
    var cart = this.cart
    var receipt = []

    var items = this.data.items.map(function (it) {
      var qty = cart[it.key]
      var item = ALL_ITEMS.find(function (a) { return a.key === it.key })
      spent += qty * item.price
      if (qty > 0) {
        receipt.push({
          key: it.key,
          icon: it.icon,
          name: it.name,
          qty: qty,
          totalStr: fmtMoney(qty * item.price)
        })
      }
      return {
        icon: it.icon,
        key: it.key,
        name: it.name,
        price: item.price,
        priceStr: it.priceStr,
        qty: qty
      }
    })

    var balance = TOTAL - spent
    this.setData({
      balance: balance,
      balanceStr: fmtMoney(balance),
      totalSpent: spent,
      spentStr: fmtMoney(spent),
      items: items,
      receipt: receipt
    })
  },

  onShareAppMessage: function () {
    var pct = ((this.data.totalSpent / TOTAL) * 100).toFixed(1)
    return {
      title: '\u6211\u82b1\u6389\u4e86\u6bd4\u5c14\u76d6\u8328 ' + pct + '% \u7684\u94b1\uff0c\u4f60\u80fd\u82b1\u5b8c\u5417\uff1f',
      path: '/pages/spend/spend'
    }
  },

  onShareTimeline: function () {
    return {
      title: '\u82b1\u5149\u6bd4\u5c14\u76d6\u8328\u76841000\u4ebf\uff0c\u4f60\u8bd5\u8bd5\uff1f'
    }
  }
})
