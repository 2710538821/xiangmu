<template>
  <div class='container'>
 <el-card class="card-box">
  <!-- 搜索 -->
<el-row type="flex">
 <el-col>
  <el-form :inline="true" ref="formDataRef" :model="formData">
     <el-form-item label="学科名称">
    <el-input v-model.trim="formData.subjectName"
     @keyup.enter.native="loadSubjectsList"
     @blur="loadSubjectsList"
     ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="resetBtn">清除</el-button>
    <el-button type="primary" @click="searchBtn">搜索</el-button>
  </el-form-item>
</el-form>
</el-col>
 <el-col>
  <el-row type="flex" justify="end">
    <el-button type="success" icon="el-icon-edit" @click="showDialog=true">新增学科</el-button>
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
        label="学科名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="创建者"
         width="200">
      </el-table-column>
          <el-table-column
        prop="addDate"
        label="创建日期"
        width="250">
        <template v-slot="{row}">
         {{formatTime(row.addDate)}}
        </template>
      </el-table-column>
          <el-table-column
        prop="isFrontDisplay"
        label="前台是否显示"
        width="150">
      <template v-slot="{row}">
         {{row.isFrontDisplay?'是' : '否'}}
        </template>
      </el-table-column>
          <el-table-column
        prop="twoLevelDirectory"
        label="二级目录"
        >
      </el-table-column>
          <el-table-column
        prop="tags"
        label="标签"
       >
      </el-table-column>
          <el-table-column
        prop="totals"
        label="题目数量"
        >
      </el-table-column>
       <el-table-column
        prop="name"
        label="操作"
        width="280"
        >
        <template v-slot="{row}">
          <el-button type="text" @click="toDirectorys(row)">学科分类</el-button>
        <el-button type="text" @click="toTags(row)">学科标签</el-button>
        <el-button type="text" @click="modifyBtn(row.id)">修改</el-button>
        <el-button type="text" @click="delBtn(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
      <PageTool :page='page' :total="total"/>
 </el-card>
<!-- 新增学科弹框 -->
<SubjectsAdd ref="SubjectsAddRef" :show-dialog.sync="showDialog" @updateSubject='loadSubjectsList'/>
  </div>
</template>

<script>
import { getSubjectsList, removeSubjectById } from '@/api/hmmm/subjects.js'
import PageTool from '../components/page-tool.vue'
import SubjectsAdd from '../components/subjects-add.vue'
import { parseTime } from '@/filters'
export default {
  name: 'Subgects',
  components: {
    PageTool,
    SubjectsAdd
  },
  data () {
    return {
      formData: {
        subjectName: ''
      },
      tableData: [],
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      showDialog: false
    }
  },
  created () {
    this.loadSubjectsList()
  },
  methods: {
    async loadSubjectsList () {
      const { data: { counts, items } } = await getSubjectsList({ ...this.page, ...this.formData })
      this.total = counts
      this.tableData = items
    },
    // 格式化时间
    formatTime (time) {
      return parseTime(time)
    },
    // 搜索
    searchBtn () {
      // if (!this.formData.subjectName) return alert('请先输入搜索关键字')
      this.loadSubjectsList()
    },
    // 重置
    resetBtn () {
      this.formData = {
        subjectName: ''
      }
      this.searchBtn()
    },
    // 修改学科
    async modifyBtn (id) {
      // 调用子组件的方法，回显数据
      await this.$refs.SubjectsAddRef.getSubjectById(id)
      this.showDialog = true
    },
    // 删除学科
    async delBtn (id) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await removeSubjectById(id)
        await this.loadSubjectsList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    toDirectorys (row) {
      this.$router.push({
        path: '/subjects/directorys',
        query: {
          id: row.id,
          name: row.subjectName
        }
      })
    },
    toTags (row) {
      this.$router.push({
        path: '/subjects/tags',
        query: {
          id: row.id,
          name: row.subjectName
        }
      })
    }

  },
  watch: {
    page: {
      handler (newVal) {
        // console.log(newVal)
        this.loadSubjectsList()
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
