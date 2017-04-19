/************
 * 开放api的代码结果都以console.log的方式输出到控制台
 * 没有UI上的结果展示
 * 请开发者自行查看Console面板的输出结果
 */
Page({
  data: {},
  onTap: function () {
    wx.login({
      success: function (res) {
        console.log('code:'+res.code);
        wx.request({
          url: "https://weixinxcx.applinzi.com/code.php",
          data: {
            code: res.code
          },
          success: function (res) {
            console.log(res.data);
            var data = res.data;
            var openid = data.openid;
            console.log(openid);
          }
        })
      }
    })
  }
})