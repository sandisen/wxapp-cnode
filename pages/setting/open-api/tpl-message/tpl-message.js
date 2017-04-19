
var app = getApp();
Page({
  data: {
    date: ""
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e);
    var openid = app.openid;
    var formId = e.detail.formId;
    var place = e.detail.place;
    var date = e.detail.date;
    var name = e.detail.name;
    var id = e.detail.id;
    var price = e.detail.price;
    wx.request({
      url: 'https://weixinxcx.applinzi.com/moban.php', //仅为示例，并非真实的接口地址
      data: {
       openid:openid,
       formId:formId,
       place:place,
       date:date,
       name:name,
       id:id,
       price:price
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)
      }
    })
  }
})