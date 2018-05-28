// pages/comingsoon/comingsoon.js
var count = 6;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieTop: [],
    loading: true
  },
  // 查看详情
  movieDetile: function (event) {
    console.log(event)
    let currentId = event.currentTarget.id;
    console.log(currentId)
    wx.navigateTo({
      url: '../movieDetile/movieDe?id=' + currentId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon?count=6',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          movieTop: res.data.subjects, loading: false
        })
      }
    })
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("下拉到底了")
    const that = this;
    // 每次多请求1条数据
    count = count + 1;
    // 数据加载的时候显示小菊花加载动画
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon?count=' + count,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          movieTop: res.data.subjects,
        })
        if (res.data.count >= 250) {
          wx.showLoading({
            title: '没有数据了'
          })
        }

      },
    }),

      setTimeout(function () {
        wx.hideLoading()
      }, 1000)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})