//app.js
App({
  openid:null,
  onLaunch: function () {
    // wx.login({
    //   success: function (res) {
    //     console.log('code:'+res.code);
    //     var that = this;
    //     wx.request({
    //       url: "https://weixinxcx.applinzi.com/code.php",
    //       data: {
    //         code: res.code
    //       },
    //       success: function (res) {
    //         console.log(res.data);
    //         var data = res.data;
    //         var openid = data.openid;
    //         that.openid = openid;
    //         console.log(openid);
    //       }
    //     })
    //   }
    // })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})