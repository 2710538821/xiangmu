xs
<template>
  <div class="container">
    <el-card class="box-card">
      <el-form
        :inline="true"
        style="position: relative"
        class="demo-form-inline"
      >
        <el-form-item label="关键字" class="item">
          <el-input
            v-model.trim="keyword"
            placeholder="根据文章标题搜索"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="state" placeholder="请选择">
            <!-- <el-option :value="1" label="已启用"></el-option>
            <el-option :value="0" label="已禁用"></el-option> -->
            <el-option
              v-for="item in status"
              :key="item"
              :label="item"
              :value="item==='已启用' ? 1 :0"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="delbut">清除</el-button>
          <el-button type="primary" @click="searchInfo">搜索</el-button>
        </el-form-item>
        <el-form-item style="position: absolute; right: 0px">
          <el-button type="success" icon="el-icon-edit" @click="addbut"
            >新增技巧</el-button
          >
        </el-form-item>
      </el-form>
      <el-alert
        class="el-icon-info"
        :closable="false"
        :title="`一共有${page.total}条`"
        type="info"
      >
      </el-alert>
      <!-- 表单 -->
      <el-table :data="formList" class="el-form" style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column
          align="center"
          prop="title"
          label="文章标题"
          width="400"
        >
          <template v-slot="{ row }">
            <span>{{ row.title }}</span>
            <span
              class="el-icon-film"
              v-if="row.videoURL"
              @click="videoplay"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="visits"
          label="阅读数"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="录入人"
          width="120"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="录入时间"
          width="150"
        >
          <template v-slot="{ row }">
            {{ row.createTime | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="state" label="状态" width="100">
          <template v-slot="{ row }">
            {{ row.state ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="seebut(row)">预览</el-button>
            <el-button
              type="text"
              @click="disabledbtn(row)"
              v-if="row.state === 0"
              >启用</el-button
            >
            <el-button type="text" @click="disabledbtn(row)" v-else
              >禁用</el-button
            >
            <el-button
              type="text"
              @click="editbtn(row)"
              :disabled="row.state === 0"
              >修改</el-button
            >
            <el-button
              type="text"
              @click="deletbut(row.id)"
              :disabled="row.state === 0"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-row type="flex" justify="center" align="middle" class="block">
        <el-pagination
          @size-change="sizechange"
          @current-change="changePage"
          :current-page="page.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="page.pagesize"
          background
          layout="prev, pager, next, sizes, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-row>
      <!-- 新增弹窗 -->
      <articlesAdd
        ref="diagRef"
        :dialogFormVisible.sync="dialogFormVisible"
        @update-date="getList"
      ></articlesAdd>
      <!-- 预览弹窗 -->
      <articlesPreview
        :preiVisible.sync="preiVisible"
        :seebutForm="rowobj"
      ></articlesPreview>
    </el-card>
    <!-- 视频 -->
    <div class="video-body" v-show="showVideo">
      <div class="el-icon-error" @click="closeIcon"></div>
      <div class="video-box">
        <video
          src="https://haokan.baidu.com/v?vid=14392644018648491043&pd=pcshare"
        >
          您的浏览器暂不支持
        </video>
      </div>
    </div>
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
      state: '',
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
      preiVisible: false,
      showVideo: false
    }
  },
  created () {
    // 获取文章列表
    this.getList()
  },
  methods: {
    async getList (data) {
      const {
        data: { counts, items }
      } = await getList(data)
      // console.log(data)
      this.formList = items
      this.page.total = counts
    },
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
      this.state = ''
      this.getList()
    },
    // 搜索
    async searchInfo () {
      // if (this.keyword !== '') {
      //   this.formList = this.formList.filter((item) => {
      //     if (item.title.includes(this.keyword)) {
      //       return item
      //     }
      //   })
      // }
      console.log(this.state)
      if (this.keyword && (this.state === 0 || this.state === 1)) {
        const { data: { counts, items } } = await getList({ ...this.page, keyword: this.keyword, state: this.state })
        this.formList = items
        this.page.total = counts
      } else if (this.keyword && !(this.state === 0 || this.state === 1)) {
        const { data: { counts, items } } = await getList({ ...this.page, keyword: this.keyword })
        this.formList = items
        this.page.total = counts
      } else if (!this.keyword && (this.state === 0 || this.state === 1)) {
        const { data: { counts, items } } = await getList({ ...this.page, state: this.state })
        this.formList = items
        this.page.total = counts
      } else {
        this.getList()
      }
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
    async editbtn (row) {
      // 回显
      this.$refs.diagRef.detail(row.id)
      this.dialogFormVisible = true
    },
    // 删除
    async deletbut (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await remove(id)
        await this.getList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
        this.$message.info('删除取消')
      }
    },
    // 状态
    async disabledbtn (row) {
      row.state = row.state ? 0 : 1
      await changeState(row)
      this.getList()
      this.$message.success('状态修改成功')
    },
    videoplay () {
      this.showVideo = true
    },
    closeIcon () {
      this.showVideo = false
    }
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
</script>

<style scoped lang="less">
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
/deep/.el-icon-film {
    color: #00f;
    font-size: 18px;

}
/deep/.video-body {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0,0,0,.3);
 z-index: 99999;
 .video-box {
  width: 800px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
 }
 .el-icon-error {
  position: absolute;
  left: 50%;
  top: 80px;
  font-size: 60px;
  color: rgba(0,0,0,.6);
  z-index: 999999;
 }
 video {
  width: 800px;
  height: 600px;
 z-index: 10000;
 }
}
</style>
