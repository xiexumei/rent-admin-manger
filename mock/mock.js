const Mock = require('mockjs')
 
//使用mockjs模拟数据
const listData = Mock.mock({
  'reCode': 0,
  'message': '成功',
  'data': {
    'total': 7104803,
    'monthAdd': 104803
  }
})
 
Mock.mock('/getListData', 'post', listData)