// pages/movieDetile/movieDe.js
Page({
  movieDetile: [],

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 传过来的id在option里
    console.log(options)
    var id = options.id
    const that = this;
    // 这里由于豆瓣接口的原因top250接口没有影片详情数据，所以写了2条个请求，但是还是不能拿到据，
    // 但是轮播内容的接口有影片详情这项数据，所以跳转影片详情就会有描述。而跳转top250就没有影片情
    // top250请求
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.subjects.length; i++){
          if (res.data.subjects[i].id == id){
            that.setData({
              movieDetile: res.data.subjects[i]
            })

          }
        }
       
      }
    }),
    // 轮播详情请求
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          for (var i = 0; i < res.data.subjects.length; i++) {
            if (res.data.subjects[i].id == id) {
              that.setData({
                movieDetile: res.data.subjects[i]
              })

            }
          }

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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})