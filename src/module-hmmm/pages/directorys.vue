<template>
  <div class='container'>
    <el-card class="card-box">
       <!-- 搜索 -->
<el-row type="flex">
 <el-col>
  <el-form :inline="true" ref="formDataRef" :model="formData">
     <el-form-item label="目录名称">
    <el-input v-model="formData.directoryName"
     ></el-input>
  </el-form-item>
    <el-form-item label="状态">
      <el-select  placeholder="请选择" v-model="formData.state">
      <el-option label="已禁用" :value="0"></el-option>
      <el-option label="已启用" :value="1"></el-option>
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
    :title="`数据一共${page.total}条`"
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
        prop="directoryName"
        label="目录名称"
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
        prop="totals"
        label="面试题数量"
        width="180">
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
      <PageTool :page.sync='page'/>
    </el-card>
    <DirectorysAdd ref="DirectorysAddRef" :showDialog.sync="showDialog" @update-directory='getList'/>
  </div>
</template>

<script>
import PageTool from '../components/page-tool.vue'
import { list, changeState, remove } from '@/api/hmmm/directorys.js'
import { parseTime } from '@/filters'
import DirectorysAdd from '../components/directorys-add.vue'
export default {
  name: 'directorys',
  components: {
    PageTool,
    DirectorysAdd
  },
  data () {
    return {
      formData: {
        directoryName: '',
        state: ''
      },
      tableData: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      showDialog: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 格式化时间
    formatTime (time) {
      return parseTime(time)
    },
    // 数据列表
    async getList () {
      const { data: { counts, items } } = await list(this.page)
      this.tableData = items
      this.page.total = counts
    },
    // 改变状态
    async onChangeState (row) {
      row.state = row.state === 1 ? 0 : 1
      await changeState(row)
      this.getList()
    },
    addDirectory () {
      this.showDialog = true
    },
    searchBtn () {
      this.getList()
    },
    resetBtn (formRef) {
      this.formData = {
        directoryName: '',
        state: ''
      }
    },
    async editBtn (row) {
      await this.$refs.DirectorysAddRef.getDetail(row.id)
      this.showDialog = true
    },
    async delBtn (id) {
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
  .table-box {
    margin: 10px 0 20px;
  }
}
</style>
