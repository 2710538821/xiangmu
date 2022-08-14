<template>
  <div class="container">
    <el-card class="box-card">
      <!-- 头部输入框 -->
      <el-form label-width="80px" :model="formData">
        <el-row type="flex">
          <el-form-item label="标签名称:" width="180px">
            <el-input placeholder="请输入编号" v-model="tagsData" suffix-icon=“xxxx”></el-input>
          </el-form-item>
          <el-form-item label="省:">
            <el-select placeholder="请选择" v-model="formData.province" @change="changeProvinces">
              <el-option :label="item" :value="item" v-for="item in provinces()" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市:">
            <el-select placeholder="请选择" v-model="formData.city">
              <el-option :label="item" :value="item" v-for="item in citysList" :key="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业简称:" width="180px">
            <el-input placeholder="请输入" v-model="formData.shortName" suffix-icon=“xxxx”></el-input>
          </el-form-item>
        </el-row>

        <el-row type="flex">
          <el-form-item label="状态:">
            <el-select placeholder="请选择" v-model="formData.state">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作：" width="180px">
            <el-button @click="cleanBtn">清除</el-button>
            <el-button type="primary" @click="searchBtn">搜索</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!-- 新增按钮 -->
      <el-row class="add">
        <el-button type="primary" icon="el-icon-edit"  @click="addCompany">新增用户</el-button>
      </el-row>
      <!-- 提示条 -->
      <el-alert class="alert" :title="title" type="info" show-icon :closable="false"></el-alert>
      <!-- 企业列表 -->
      <el-table class="table" :data="companysList" style="width: 100%">
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="number" label="企业编号"> </el-table-column>
        <el-table-column prop="shortName" label="企业简称"> </el-table-column>
        <el-table-column prop="tags" label="标签"> </el-table-column>
        <el-table-column prop="creatorID" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期"> </el-table-column>
        <el-table-column prop="remarks" label="备注"> </el-table-column>
        <el-table-column prop="state" label="状态">
          <template v-slot="{ row }">
            {{ formatState(row.state) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="{ row }">
            <el-button @click="editBtn(row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button @click="disableBtn(row)" v-if="row.state === 1" type="warning" icon="el-icon-close" plain circle>
            </el-button>
            <el-button @click="disableBtn(row)" v-else type="success" icon="el-icon-check" plain circle></el-button>
            <el-button @click="delBtn(row.id)" type="danger" icon="el-icon-delete" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination class="page" background @size-change="sizeChange" @current-change="pageChange"
        :current-page="page.page" :page-sizes="[10, 20, 30, 50]" :page-size="page.pagesize"
        layout="sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </el-card>
    <CompanysAdd ref="comAdd" :dialogVisible.sync="dialogVisible" @update-data="getCompanysList" />
  </div>
</template>

<script>
import { getCompanysList, delCompanysList, editState } from '@/api/hmmm/companys'
import CompanysAdd from '@/module-hmmm/components/companys-add'
import constants from '@/api/constant/constant'
import { provinces, citys } from '@/api/hmmm/citys'
export default {
  name: 'MyCompanys',
  components: {
    CompanysAdd
  },
  data () {
    return {
      title: '',
      tags: '',
      shortName: '',
      dialogVisible: false,
      page: {
        page: 1,
        pagesize: 10
      },
      companysList: [],
      provinces,
      provincesList: [],
      citys,
      citysList: [],
      formData: {
        shortName: '',
        province: '',
        city: '',
        tags: '',
        state: ''
      },
      tagsData: ''
    }
  },
  created () {
    this.getCompanysList()
  },
  methods: {
    sizeChange (value) {
      this.page.pagesize = value
      this.getCompanysList()
    },
    pageChange (newPage) {
      this.page.page = newPage
      this.getCompanysList()
    },
    async getCompanysList () {
      const res = await getCompanysList(this.page)
      this.companysList = res.data.items
      this.page.total = res.data.counts
      this.title = `共有${res.data.counts}条记录`
    },
    async editBtn (id) {
      this.$refs.comAdd.getDetail(id)
      this.dialogVisible = true
    },
    async addCompany () {
      this.dialogVisible = true
    },
    async disableBtn (row) {
      try {
        if (row.state === 1) {
          await this.$confirm('已成功禁用,是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          row.state = row.state ? 0 : 1
          await editState(row)
          this.$message.success('已成功禁用！')
        } else {
          await this.$confirm('已成功启用,是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          row.state = row.state ? 0 : 1
          await editState(row)
          this.$message.success('已成功启用！')
        }
      } catch (error) {
        this.$message.info('已取消该操作！')
        console.log(error)
      }
    },
    async delBtn (id) {
      try {
        await this.$confirm('此操作将永久删除该题组，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delCompanysList(id)
        await this.getCompanysList(id)
        this.$message.success('成功删除了企业')
      } catch (error) {
        console.log(error)
      }
    },
    // 搜索
    async searchBtn () {
      console.log(this.companysList)
      // console.log(this.provincesData)
      // tags
      this.companysList = this.companysList.filter(item => {
        if (item.tags.includes(this.tagsData)) {
          return item
        }
      })
      // const res = await getCompanysList({ ...this.page, ...this.formData })
      // console.log(res)
      // this.companysList = res.data.items
      // this.page.total = res.data.counts
      // this.title = `共有${res.data.counts}条记录`
    },
    async cleanBtn () {
      this.formData = ''
      this.tagsData = ''
      this.getCompanysList()
    },
    // formatState (row, column, cellValue, index) {
    //   const res = constants.status.find(
    //     (item) => item.id === Number(cellValue)
    //   )
    //   return res ? res.value : ''
    // }
    formatState (type) {
      const obj = constants.status.find(item => item.id === +type)
      return obj ? obj.value : '未知'
    },
    changeProvinces (e) {
      provinces()
      console.log(e)
      // console.log(provinces())
      citys(e)
      this.citysList = citys(e)
      this.formData.city = citys(e)[0]
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  margin: 11px;

  .add {
    display: flex;
    justify-content: end;
  }

  .alert {
    margin-top: 10px;
  }

  .table {
    margin-top: 10px;
  }

  .page {
    display: flex;
    justify-content: end;
  }
}
</style>
