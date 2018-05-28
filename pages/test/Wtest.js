// pages/test/Wtest.js
// 全局变量用于加载更多
var count = 6;
Page({
  movieList: [],
  movieTop:[],
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['今日Top', '热门电影', '豆瓣热评'],
    currentTab: 0 ,
    loading:true
    // swiperArry:[
    //   '../test/images/1.jpg',
    //   '../test/images/2.jpg',
    //   '../test/images/3.jpg',
    //   '../test/images/4.jpg',
    //   '../test/images/5.jpg',
    //   '../test/images/6.jpg',
    // ]
  },
  // tab栏切换
  navbarTap: function (event) {
    // 微信小程序event对象
    // console.log(event)
    this.setData({
      currentTab: event.currentTarget.dataset.idx
    })
  },
  // 查看详情
  movieDetile:function(event){
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
    const that=this;
    // 向豆瓣发起请求轮播数据
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters', 
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          movieList: res.data.subjects, loading: false
        })
      }
    }),
    // 向豆瓣请求top250默认页面加载时时6条数据
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250?count=6',
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
    wx.showLoading({
      title: '刷新',
    }),
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("下拉到底了")
    const that = this;
    // 每次多请求1条数据
    count = count+1;
    // 数据加载的时候显示小菊花加载动画
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250?count=' + count,
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          movieTop: res.data.subjects, 
        })
        if (res.data.count>=250){
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