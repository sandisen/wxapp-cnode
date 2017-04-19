//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    islogin: false,
    userInfo: {},
    //avatarUrl:null,
    cache: [
      { iconurl: '/images/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache' }
    ],
    device: [
      { iconurl: '/images/icon/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo' },
      { iconurl: '/images/icon/wx_app_network.png', title: '网络状态', tap: 'showNetWork' },
      { iconurl: '/images/icon/wx_app_location.png', title: '地图显示', tap: 'showMap' },
      { iconurl: '/images/icon/wx_app_compass.png', title: '指南针', tap: 'showCompass' },
      { iconurl: '/images/icon/wx_app_lonlat.png', title: '当前位置、速度', tap: 'showLonLat' },
      { iconurl: '/images/icon/wx_app_shake.png', title: '摇一摇', tap: 'shake' },
      { iconurl: '/images/icon/wx_app_scan_code.png', title: '二维码', tap: 'scanQRCode' }
    ],
    api: [
      { iconurl: '/images/icon/wx_app_list.png', title: '下载pdf、word文档', tap: 'downloadDocumentList' },
       //{ iconurl: '', title: '用户登录', tap: 'login' },
      // { iconurl: '', title: '校验用户信息', tap: 'check' },
      // { iconurl: '', title: '获取用户加密信息', tap: 'decrypted' },
      //{ iconurl: '', title: 'websocket', tap: 'websocket' },s
      //{ iconurl: '', title: '客服会话', tap: 'contact' },
      //{ iconurl: '', title: '模板消息', tap: 'tplMessage' },
      //{ iconurl: '', title: '微信支付', tap: 'wxPay' }
      { iconurl: '', title: '设置', tap: 'setting' },
      { iconurl: '', title: '收货地址', tap: 'chooseAddress' }
    ],
    others: [
      { iconurl: '', title: '项目信息', tap: 'showProject' }
    ],
    compassVal: 0,
    compassHidden: true,
    shakeInfo: {
      gravityModalHidden: true,
      num: 0,
      enabled: false
    },
    shakeData: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //选择图片
  /*
  chooseImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        that.setData({
          avatarUrl:tempFilePaths[0]
        });
      }
    })
  },*/
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    var CuserInfo = wx.getStorageSync('CuserInfo');
    if (CuserInfo.accesstoken){
      that.setData({ islogin:true });
    }
    console.log(CuserInfo);
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  //显示模态窗口
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },

  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
  },

  //显示系统信息
  showSystemInfo: function () {
    wx.navigateTo({
      url: '../setting/device/device'
    });
  },

  //网络状态
  showNetWork: function () {
    var that = this;
    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType
        that.showModal('网络状态', '您当前的网络：' + networkType);
      }
    })
  },

  //获取当前位置经纬度与当前速度
  getLonLat: function (callback) {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res)
        callback(res.longitude, res.latitude, res.speed);
      }
    });
  },

  //显示当前位置坐标与当前速度
  showLonLat: function () {
    var that = this;
    this.getLonLat(function (lon, lat, speed) {
      var lonStr = lon >= 0 ? '东经' : '西经',
        latStr = lat >= 0 ? '北纬' : '南纬';
      lon = lon.toFixed(2);
      lat = lat.toFixed(2);
      lonStr += lon;
      latStr += lat;
      speed = (speed || 0).toFixed(2);
      that.showModal('当前位置和速度', '当前位置：' + lonStr + ',' + latStr + '。速度:' + speed + 'm/s');
    });
  },

  //在地图上显示当前位置
  showMap: function () {
    this.getLonLat(function (lon, lat) {
      wx.openLocation({
        latitude: lat,
        longitude: lon,
        scale: 15,
        name: "北大科技园",
        address: "中关村北大街127-1号",
        fail: function () {
          wx.showToast({
            title: "地图打开失败",
            duration: 1000,
            icon: "cancel"
          });
        }
      });
    });
  },

  //显示罗盘
  showCompass: function () {
    var that = this;
    this.setData({
      compassHidden: false
    })
    wx.onCompassChange(function (res) {
      console.log(res)
      if (!that.data.compassHidden) {
        that.setData({ compassVal: res.direction.toFixed(2) });
      }
    });
  },

  //隐藏罗盘
  hideCompass: function () {
    this.setData({
      compassHidden: true
    })
  },

  //摇一摇
  shake: function () {
    var that = this;
    //启用摇一摇
    this.gravityModalConfirm(true);

    wx.onAccelerometerChange(function (res) {
      //摇一摇核心代码，判断手机晃动幅度
      that.data.shakeData = {
        x: res.x.toFixed(4),
        y: res.y.toFixed(4),
        z: res.z.toFixed(4)
      };
      var x = res.x.toFixed(4),
        y = res.y.toFixed(4),
        z = res.z.toFixed(4);
      var flagX = that.getDelFlag(x, that.data.shakeData.x),
        flagY = that.getDelFlag(y, that.data.shakeData.y),
        flagZ = that.getDelFlag(z, that.data.shakeData.z);

      if (flagX && flagY || flagX && flagZ || flagY && flagZ) {
        // 如果摇一摇幅度足够大，则认为摇一摇成功
        if (that.data.shakeInfo.enabled) {
          that.data.shakeInfo.enabled = false;
          that.playShakeAudio();
        }
      }
    });
  },


  //启用或者停用摇一摇功能
  gravityModalConfirm: function (flag) {
    if (flag !== true) {
      flag = false;
    }
    var that = this;
    this.setData({
      shakeInfo: {
        gravityModalHidden: !that.data.shakeInfo.gravityModalHidden,
        num: 0,
        enabled: flag
      }
    })
  },

  //计算摇一摇的偏移量
  getDelFlag: function (val1, val2) {
    return (Math.abs(val1 - val2) >= 1);
  },

  // 摇一摇成功后播放声音并累加摇一摇次数
  playShakeAudio: function () {
    var that = this;
    wx.playBackgroundAudio({
      dataUrl: 'http://7xqnxu.com1.z0.glb.clouddn.com/wx_app_shake.mp3',
      title: '',
      coverImgUrl: ''
    });
    wx.onBackgroundAudioStop(function () {
      that.data.shakeInfo.num++;
      that.setData({
        shakeInfo: {
          num: that.data.shakeInfo.num,
          enabled: true,
          gravityModalHidden: false
        }
      });
    });
  },

  //扫描二维码
  scanQRCode: function () {
    var that = this;
    wx.scanCode({
      success: function (res) {
        console.log(res)
        that.showModal('扫描二维码', res.result, false);
      },
      fail: function (res) {
        that.showModal('扫描二维码', "扫描失败，请重试", false);
      }
    })
  },

  //下载并预览文档
  downloadDocumentList: function () {
    wx.navigateTo({
      url: '/pages/setting/document/download/download'
    });
  },
  //设置界面
  setting:function(){
    wx.openSetting({
      success: (res) => {
        //console.log(res);
      }
    })
  },
  //选择收货地址
  chooseAddress:function(){
    wx.chooseAddress({
      success: function (res) {
        //console.log(res);
      }
    })
  },
  /*****************开放api示例代码***********************
   * 以下是开放api的示例代码，为避免本文件代码过多，首先将跳转到子页面
   */
  //用户登录
  login: function () {
    wx.navigateTo({
       url: '/pages/setting/open-api/login/login'
    });
  },

/*
  //用户验证
  check: function () {
    wx.navigateTo({
      url: '/pages/setting/open-api/check/check'
    });
  },
  //加解密
  decrypted: function () {
    wx.navigateTo({
      url: '/pages/setting/open-api/decrypted/decrypted'
    });
  },
*/
  //客服会话
  contact:function(){
    wx.navigateTo({
      url: '/pages/setting/open-api/contact/contact'
    });
  },
  //模板消息
  tplMessage: function () {
    wx.navigateTo({
      url: '/pages/setting/open-api/tpl-message/tpl-message'
    });
  },
  //微信支付
  wxPay: function () {
    wx.navigateTo({
      url: '/pages/setting/open-api/wx-pay/wx-pay'
    });
  },
  //项目信息
  showProject: function () {
    wx.navigateTo({
      url: '/pages/setting/others/wx-project/wx-project'
    });
  }
})
