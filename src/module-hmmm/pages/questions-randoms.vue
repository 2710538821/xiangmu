<template>
  <div class="container">
    <el-card class="card">
      <!-- 头部输入框按钮 -->
      <el-form>
        <el-row class="rowbox">
          <el-col class="left">
            <el-form-item label="关键字">
              <el-input class="codeipt" size="small" v-model="keyword" placeholder="根据编号搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="right">
            <el-form-item>
              <el-button size="small" @click="delKeyword">清除</el-button>
              <el-button type="primary" size="small" @click="searchTopic">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 提示文案 -->
        <el-alert class="alert" :title="title" type="info" show-icon :closable="false">
        </el-alert>
        <!-- 列表 -->
        <el-table :data="topicList" style="width: 100%">
          <el-table-column prop="id" label="编号" width="220">
          </el-table-column>
          <el-table-column prop="questionType" :formatter="formatQuestionType" label="题型" width="80">
          </el-table-column>
          <el-table-column prop="date" label="题目编号" width="220">
          </el-table-column>
          <el-table-column prop="addTime" label="录入时间" width="180">
          </el-table-column>
          <el-table-column prop="totalSeconds" label="答题时间(s)">
          </el-table-column>
          <el-table-column prop="accuracyRate" label="正确率(%)">
          </el-table-column>
          <el-table-column prop="userName" label="录入人"> </el-table-column>
          <el-table-column prop="date" label="操作" >
            <template slot-scope="{row}">
              <el-button @click="delTopic(row.id)" type="danger" icon="el-icon-delete" plain circle>
              </el-button>
            </template>

          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination class="page" background @size-change="sizeChange" @current-change="changePage"
          :page-sizes="[20, 30, 50, 100]" :page-size="page.pagesize" layout="total, prev, pager, next, sizes, jumper"
          :total="page.total">
        </el-pagination>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getTopicList, delTopicList } from '@/api/hmmm/questions'
import constants from '@/api/constants/constants'
export default {
  name: 'QuestionsRandoms',
  data () {
    return {
      keyword: '',
      title: '',
      page: {
        page: 1,
        pagesize: 20
      },
      topicList: []
    }
  },

  created () {
    this.getTopicList()
  },
  mounted () {
    // console.log(delTopicList())
  },
  methods: {
    sizeChange (value) {
      this.page.pagesize = value
      this.getTopicList()
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getTopicList()
    },
    delKeyword () {
      this.keyword = ''
      this.getTopicList()
    },
    searchTopic () {
      this.topicList = this.topicList.filter((item) => {
        return item.id.includes(this.keyword)
      })
      this.page.total = this.page.page
    },
    async getTopicList () {
      const res = await getTopicList(this.page)
      // console.log(res.data.items)
      this.topicList = res.data.items
      this.page.total = res.data.counts
      this.title = '数据一共有' + res.data.counts + '条'
    },
    async delTopic (id) {
      try {
        await this.$confirm('此操作将永久删除该题组，是否继续？')
        await delTopicList(id)
        this.getTopicList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
      // this.$message.success('删除成功')
      // this.getTopicList()
    },
    formatQuestionType (row, column, cellValue, index) {
      const res = constants.questionType.find(
        (item) => item.id === Number(cellValue)
      )
      return res ? res.value : ''
    }
  }
}
</script>

<style scoped lang="less">
.card {
  margin: 11px;

  .rowbox {
    display: flex;
    justify-content: space-between;

    .right {
      display: flex;
      justify-content: end;
    }
  }

  .left {
    margin-left: 20px;

    .codeipt {
      width: 245px;
    }
  }

  .alert {
    margin-bottom: 20px;
  }

  .page {
    display: flex;
    justify-content: end;
  }
}
</style>
