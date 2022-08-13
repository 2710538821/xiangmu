xs<template>
  <div class='container'>
    <el-card class="box-card">
      <el-form :inline="true" style="position: relative;" class="demo-form-inline" >
        <el-form-item label="关键字" class="item">
          <el-input v-model="keyword" placeholder="根据文章标题搜索"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formList.state" placeholder="请选择">
            <!-- <el-option value="已启用"></el-option>
            <el-option value="已禁用"></el-option> -->
            <el-option v-for="item in status" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="delbut">清除</el-button>
          <el-button type="primary" @click="searchInfo">搜索</el-button>
        </el-form-item>
        <el-form-item style="position: absolute; right: 0px;">
          <el-button type="success" icon="el-icon-edit" @click="addbut">新增技巧</el-button>
        </el-form-item>
      </el-form>
      <el-alert class="el-icon-info" :closable="false" :title='`一共有${page.total}条`' type="info">
      </el-alert>
      <!-- 表单 -->
      <el-table :data="formList" class="el-form" style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column align="center" prop="title" label="文章标题" width="400">
        </el-table-column>
        <el-table-column align="center" prop="visits" label="阅读数" width="120">
        </el-table-column>
        <el-table-column align="center" prop="username" label="录入人" width="120">
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="录入时间" width="150">
          <template v-slot="{ row }">
            {{row.createTime | parseTimeByString}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="state" label="状态" width="100">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot='{row}'>
            <el-button type="text" @click="seebut(row)">预览</el-button>
            <el-button type="text" @click="disabledbtn(row)" v-if="row.state===0">启用</el-button>
            <el-button type="text" @click="disabledbtn(row)" v-else>禁用</el-button>
            <el-button type="text" @click="editbtn(row)" :disabled='row.state === 0'>修改</el-button>
            <el-button type="text" @click="deletbut(row)" :disabled='row.state === 0'>删除</el-button>
            </template>
        </el-table-column>
      </el-table>

        <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" class="block">
        <el-pagination
          @size-change="sizechange"
          @current-change="changePage"
          :current-page="page.page"
          :page-sizes="[5,10,15,20]"
          :page-size="page.pagesize"
          background
          layout="prev, pager, next, sizes, jumper"
          :total="page.total"
          >
        </el-pagination>
      </el-row>
      <!-- 新增弹窗 -->
      <articlesAdd :dialogFormVisible.sync = 'dialogFormVisible'></articlesAdd>
      <!-- 预览弹窗 -->
      <articlesPreview :preiVisible.sync = 'preiVisible' :seebutForm='rowobj'></articlesPreview>
    </el-card>
  </div>
</template>

<script>
// 获取文章列表
import { getList, changeState, remove } from '@/api/hmmm/articles'
// 时间格式
import { parseTimeByString } from '@/filters/index'
// 文章状态
// import { status } from '@/api/hmmm/constants'
import statusNow from '@/api/base/status'
import articlesAdd from '@/module-hmmm/components/articles-add.vue'
import articlesPreview from '@/module-hmmm/components/articles-preview.vue'
export default {
  components: {
    articlesAdd,
    articlesPreview
  },
  data () {
    return {
      keyword: '',
      status: ['已禁用', '已启用'],
      formList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      rowobj: {},
      parseTimeByString,
      statusNow,
      dialogFormVisible: false,
      preiVisible: false
    }
  },
  created () {
    // 获取文章列表
    this.getList()
  },
  methods: {
    async getList (data) {
      const { data: { counts, items } } = await getList(data)
      // console.log(data)
      this.formList = items
      this.page.total = counts
    },
    // formatState (row, column, cellValue, index) {
    //   // call表示当前单元格的数据
    //   const res = status.find(
    //     (item) => item.value === Number(cellValue)
    //   )
    //   return res ? res.label : ''
    // },

    // 分页事件
    sizechange (val) {
      this.page.pagesize = val
      this.getList(this.page)
    },
    changePage (item) {
      this.page.page = item
      this.getList(this.page)
    },
    // 清空关键字
    delbut () {
      this.keyword = ''
      this.status = ''
      this.getList()
    },
    // 搜索
    searchInfo () {
      if (this.keyword !== '') {
        this.formList = this.formList.filter(item => {
          if (item.title.includes(this.keyword)) {
            return item
          }
        })
      } else {
        return this.getList()
      }
      // this.formList = this.formList.filter(item => {
      //   if (item.title.includes(this.keyword)) {
      //     return item
      //   }
      // })
    },
    // 添加
    addbut () {
      this.dialogFormVisible = true
    },
    // 预览
    seebut (row) {
      this.rowobj = row
      this.preiVisible = true
    },
    // 修改
    async editbtn (id) {
      this.dialogFormVisible = true
      // 回显
      this.$ref.diagRef.detail(id)
    },
    // 删除
    async deletbut (id) {
      // console.log(id)
      await remove(id)
      this.getList()
    },
    // 状态
    async disabledbtn (row) {
      // console.log(row)

      // await changeState(row)
      // row.state = row.state ? 1 : 0
      // this.$message.success('跟新状态成功')
      // if (row.state === 1) {
      row.state = row.state ? 0 : 1
      await changeState(row)
      this.getList()
      this.$message.success('状态修改成功')
      // } else {
      //   row.state = row.state ? 1 : 0
      //   this.getList()
      //   changeState(row)
      //   this.$message.success('启用成功')
      // }
    }
  }
  // mounted () {
  //   this.getList()
  // }
  // watch: {
  //   formList (newValue) {
  //     statusNow.forEach((item) => {
  //       newValue.forEach(obj => {
  //         if (item.id === obj.state) {
  //           obj.state = item.value
  //           console.log(obj.state)
  //         }
  //       })
  //     })
  //   }
  // }
}
</script>

<style scoped lang='less'>
.container {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.el-form {
  margin-top: 16px
}

.block {
  text-align: right;
  margin-top: 20px
}

.item {
  margin-left: 20px;
  margin-right: 50px;
}
</style>
