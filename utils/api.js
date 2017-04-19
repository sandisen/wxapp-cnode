'use strict';
/*******cnode中文社区 api 路径********/

// api 路径
var HOST = 'https://cnodejs.org/api/v1';
// get /topics 主题首页
var topics = HOST + '/topics';
//get /topic/:id 主题详情
var topic = HOST + '/topic';
// post /accesstoken 验证 accessToken 的正确性
var accesstoken = HOST + '/accesstoken';
// post /topic_collect/collect 收藏主题
var collect = HOST + '/topic_collect/collect';
// post /topic_collect/de_collect 取消主题
var de_collect = HOST + '/topic_collect/de_collect';
// post /reply/:reply_id/ups 为评论点赞
function reply (id) {
  return HOST + "/reply/"+ id +"/ups"
}

/************* 
// get /topics 主题首页
function getTopics(options,callback){
  var apiUrl = topics+'?';
  if(typeof options === 'function'){
      callback = options;
      options = {};
  }
  var params = {
      page: options.page || 1,
      limit: options.limit || 10,
      tab: options.tab || 'all',
      mdrender: true
  };
  apiUrl += serialize(params);
  fetchGet(apiUrl, callback);
}

//get /topic/:id 主题详情
function getTopic(topicId, callback) {
  var params = {
      mdrender: false,
      accesstoken: ''
  };
  var apiUrl = topic + topicId + '?';
  apiUrl += serialize(params);
  fetchGet(apiUrl, callback);
}
**********************/
// get请求方法
function fetchGet(url,callback){
  wx.request({
    url: url,
    data: {},
    header: { 'Content-Type': 'json' },
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.log(e);
      //callback(e);
    }
  })
}

// post请求方法
function fetchPost(url, data, callback) {
  wx.request({
    method: 'POST',
    url: url,
    data: data,
    success (res) {
      callback(null, res.data)
    },
    fail (e) {
      console.log(e);
      //callback(e);
    }
  })
}

function serialize(object) {
    return Object.keys(object).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
    }).join('&');
}

module.exports = {
  //api
  topics:topics,
  topic: topic,
  accesstoken: accesstoken,
  collect: collect,
  de_collect: de_collect,
  reply: reply,
  // METHOD
  fetchGet: fetchGet,
  fetchPost: fetchPost,
  //getTopics:getTopics,
  //getTopic:getTopic,
  //serialize: serialize
}