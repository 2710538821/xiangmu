<template>
  <div class='container'>
    <el-card class="card-box">
      <!-- 面包屑 -->
 <div class="head-breadcrumb"  v-if="$route.query.id">
       <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/subjects/subjects' }">学科管理</el-breadcrumb-item>
  <el-breadcrumb-item >{{subjectName}}</el-breadcrumb-item>
  <el-breadcrumb-item>标签管理</el-breadcrumb-item>
</el-breadcrumb>
 </div>
       <!-- 搜索 -->
<el-row type="flex">
 <el-col>
  <el-form :inline="true" ref="formDataRef" :model="formData">
     <el-form-item label="标签名称">
    <el-input v-model="formData.tagName"
     ></el-input>
  </el-form-item>
    <el-form-item label="状态">
      <el-select  placeholder="请选择" v-model="formData.state">
      <el-option label="已禁用" value="0"></el-option>
      <el-option label="已启用" value="1"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button @click="resetBtn('formDataRef')">清除</el-button>
    <el-button type="primary" @click="searchBtn">搜索</el-button>
  </el-form-item>
</el-form>
</el-col>
 <el-col>
  <el-row type="flex" justify="end">
    <el-button type="text"
     icon="el-icon-back"
    v-if="$route.query.id"
    @click="$router.push('/subjects/subjects')">返回学科</el-button>
    <el-button type="success" icon="el-icon-edit" @click="addDirectory">新增目录</el-button>
  </el-row>
 </el-col>
</el-row>
<!-- 信息 -->
  <el-alert
    :title="`数据一共${total}条`"
    type="info"
    show-icon>
  </el-alert>
  <!-- 表格 -->
    <el-table
    class="table-box"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="80">
      </el-table-column>
      <el-table-column
        prop="subjectName"
        label="所属学科"
      >
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="标签名称"
        width="200">
      </el-table-column>
        <el-table-column
        prop="username"
        label="创建者"
        >
      </el-table-column>
        <el-table-column
        prop="addDate"
        label="创建日期"
        >
        <template v-slot="{row}">
          {{formatTime(row.addDate)}}
        </template>
      </el-table-column>
        <el-table-column
        prop="state"
        label="状态"
        width="180">
        <template v-slot="{row}">
          {{row.state?'已启用' : '已禁用'}}
        </template>
      </el-table-column>
        <el-table-column
        label="操作"
        width="180">
        <template v-slot="{row}">
          <el-button type="text" @click="onChangeState(row)">{{row.state?'禁用':'启用'}}</el-button>
        <el-button type="text" :disabled="row.state===1" @click="editBtn(row)">修改</el-button>
        <el-button type="text" :disabled="row.state===1" @click="delBtn(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
 <!-- 页码 -->
      <PageTool :page='page' :total="total"/>
    </el-card>
    <TagsAdd ref="TagsAddRef"
    :showDialog.sync="showDialog"
    :subjectName="subjectName"
     @update-directory='getList'/>
  </div>
</template>

<script>
import PageTool from '../components/page-tool.vue'
import { getTagsList, getTagsState, removeTag } from '@/api/hmmm/tags.js'
import { parseTime } from '@/filters'
import TagsAdd from '../components/tags-add.vue'
export default {
  name: 'tags',
  components: {
    PageTool,
    TagsAdd
  },
  data () {
    return {
      formData: {
        tagName: '',
        state: ''
      },
      tableData: [],
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      showDialog: false,
      subjectName: ''
    }
  },
  created () {
    this.subjectName = this.$route.query.name
    this.getList()
  },
  methods: {
    // 格式化时间
    formatTime (time) {
      return parseTime(time)
    },
    // 数据列表
    async getList () {
      const { data: { counts, items } } = await getTagsList(this.page)
      if (this.$route.query.id) {
        // 从别的地方跳转过来的
        this.tableData = items.filter(item => item.subjectName === this.subjectName)
        this.total = this.tableData.length
      } else {
        this.tableData = items
        this.total = counts
      }
    },
    // 改变状态
    async onChangeState (row) {
      row.state = row.state === 1 ? 0 : 1
      await getTagsState(row)
      this.$message.success('状态更改成功')
    },
    addDirectory () {
      this.showDialog = true
    },
    async searchBtn () {
      // 模糊查询
      // 如果如果前面输入框有值，后面没值
      // 如果前后都有值
      // 如果前面没值，后面有值
      // 如果都没值
      let obj = null
      const name = this.formData.tagName
      const state = this.formData.state
      if (name && !state) {
        obj = { tagName: this.formData.tagName }
      } else if (name && state) {
        obj = this.formData
      } else if (!name && state) {
        obj = { state: this.formData.state }
      } else {
        alert('请先输入再查询')
      }
      const { data: { counts, items } } = await getTagsList({ ...this.page, ...obj })
      this.tableData = items
      this.total = counts
    },
    resetBtn (FormRef) {
      this.formData = {
        tagName: '',
        state: ''
      }
      this.$refs[FormRef].resetFields()
      this.getList()
    },
    async editBtn (row) {
      await this.$refs.TagsAddRef.getTagesDetail(row.id)
      this.showDialog = true
    },
    async delBtn (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeTag(id)
        await this.getList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    page: {
      handler (newVal) {
        this.getList()
      },
      deep: true
    }
  }
}
</script>

<style scoped lang='less'>
.card-box {
  margin:12px;
    /deep/ .head-breadcrumb {
    height: 40x;
   padding-bottom: 15px;
   margin-bottom: 15px;
    border-bottom: 2px solid #EBEEF5;
 .el-breadcrumb__inner a ,
   .el-breadcrumb__inner.is-link{
      color: #606266;
    }
  }
  .table-box {
    margin: 10px 0 20px;
  }
}
</style>
