export default {
  // 题型
  questionType: [
    {
      id: 1,
      value: '单选'
    },
    {
      id: 2,
      value: '多选'
    },
    {
      id: 3,
      value: '简答'
    }
  ],
  // 难度
  difficultType: [
    {
      id: 1,
      value: '简单'
    },
    {
      id: 2,
      value: '一般'
    },
    {
      id: 3,
      value: '困难'
    }
  ],
  // 精品审核
  chkType: [
    {
      value: 0,
      label: '待审核'
    },
    {
      value: 1,
      label: '通过'
    },
    {
      value: 2,
      label: '拒绝'
    }
  ],
  // 发布状态
  publishType: [
    {
      value: 0,
      label: '待发布'
    },
    {
      value: 1,
      label: '已发布'
    },
    {
      value: 2,
      label: '已下架'
    }
  ]
}
