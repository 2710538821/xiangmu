<template>
  <div class="container">
    <el-card v-loading="loading">
      <!-- 新增按钮 -->
      <el-row type="flex" justify="end">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="small"
          @click="addBtn"
          >新增试题</el-button
        >
      </el-row>
      <!-- 选择项表单 -->
      <el-row type="flex" class="pailie">
        <!-- 第一行选项 -->
        <el-col class="itemCol">
          <el-form label-width="70px">
            <el-form-item label="学科">
              <!-- 此处的@change事件里面的参数value的值就是el-option的value的值 -->
              <el-select
                placeholder="请选择"
                v-model="questionsList.subject"
                @change="selectBtn"
              >
                <el-option
                  v-for="item in subjectsData"
                  :key="item.id"
                  :label="item.subjectName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试题类型">
              <el-select
                placeholder="请选择"
                v-model="questionsList.questionType"
              >
                <el-option
                  v-for="item in manyType.questionType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题目备注">
              <el-input v-model="questionsList.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第二行选项 -->
        <el-col class="itemCol">
          <el-form label-width="70px" id="dierhang">
            <el-form-item label="二级目录">
              <el-select placeholder="请选择" v-model="questionsList.catalog">
                <el-option
                  v-for="item in twoLevelDirectoryData"
                  :key="item.id"
                  :label="item.directoryName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="难度">
              <el-select
                placeholder="请选择"
                v-model="questionsList.difficulty"
              >
                <el-option
                  v-for="item in manyType.difficultType"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业简称">
              <el-input v-model="questionsList.enterprise"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第三行选项 -->
        <el-col class="itemCol">
          <el-form label-width="70px">
            <el-form-item label="标签">
              <el-select placeholder="请选择" v-model="questionsList.tags">
                <el-option
                  v-for="item in tagsData"
                  :key="item.id"
                  :label="item.tagName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="方向">
              <el-select placeholder="请选择" v-model="questionsList.direction">
                <el-option
                  v-for="item in direction"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="城市">
              <el-col :span="11">
                <el-select placeholder="请选择" v-model="provinces">
                  <el-option
                    v-for="item in provincesList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="11" class="chengshi">
                <el-select placeholder="请选择" v-model="city">
                  <el-option
                    v-for="item in cityList"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第四行选项 -->
        <el-col class="itemCol">
          <el-form label-width="70px">
            <el-form-item label="关键字">
              <el-input
                placeholder="根据题干搜索"
                v-model="questionsList.question"
              ></el-input>
            </el-form-item>
            <el-form-item label="录入人">
              <el-select placeholder="请选择" v-model="questionsList.creator">
                <el-option
                  v-for="item in userData"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-row type="flex" justify="end">
              <el-button @click="clearData" size="small">清除</el-button>
              <el-button type="primary" size="small" @click="searchData">搜索</el-button>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <!-- alert警告 -->
      <el-alert
        :title="`数据一共 ${page.total} 条`"
        type="info"
        show-icon
        :closable="false"
      ></el-alert>
      <!-- 表格 -->
      <el-table :data="questionsList" style="width: 100%">
        <el-table-column
          prop="number"
          label="试题编号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="subject"
          label="学科"
          width="80"
        ></el-table-column>
        <el-table-column prop="catalog" label="目录"></el-table-column>
        <el-table-column
          prop="questionType"
          label="题型"
          :formatter="formatQuestionType"
        >
        </el-table-column>
        <el-table-column prop="question" label="题干" width="260">
          <template v-slot="{ row }">
            {{ row.question | quBiaoqian }}
          </template>
        </el-table-column>
        <el-table-column prop="addDate" label="录入时间" width="180">
          <template v-slot="{ row }">
            {{ row.addDate | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column
          prop="difficulty"
          label="难度"
          :formatter="formatDifficult"
        ></el-table-column>
        <el-table-column
          prop="creator"
          label="录入人"
          width="100"
        ></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="{ row }">
            <!-- 按钮 -->
            <el-row>
              <!-- 预览 -->
              <el-button
                size="small"
                icon="el-icon-view"
                circle
                class="colorBtn"
                @click="previewBtn(row.id)"
              ></el-button>
              <!-- 修改 -->
              <el-button
                size="small"
                icon="el-icon-edit"
                circle
                class="colorBtn"
                @click="editBtn"
              ></el-button>
              <!-- 删除 -->
              <el-button
                size="small"
                icon="el-icon-delete"
                circle
                class="colorBtn"
                @click="delBtn(row.id)"
              ></el-button>
              <!--  -->
              <el-button
                size="small"
                icon="el-icon-check"
                circle
                class="colorBtn"
                @click="addGoodQuestion(row.id)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="end">
        <!-- 分页 -->
        <PageTool @pageChange="handleCurrentChange"
        @pageSizeChange="handleSizeChange"
        :total='page.total'
        :paginationPage="page.page"
        :paginationPagesize="page.pagesize"/>
        <!-- <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[1, 2, 3, 5]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination> -->
      </el-row>
    </el-card>
    <!-- 预览弹出框 -->
    <questions-preview
      :showDialog.sync="showDialog"
      ref="previewRef"
    ></questions-preview>
  </div>
</template>

<script>
import manyType from '@/api/constant/manyType.js'
import { questionslist, delQuestionslist, questionsAddRemove } from '@/api/hmmm/questions'
import { parseTimeByString } from '@/filters/index.js'
import { citys, provinces } from '@/api/hmmm/citys'
import { direction } from '@/api/hmmm/constants'
import { subjectsList } from '@/api/hmmm/subjects'
import { directorysList } from '@/api/hmmm/directorys'
import { tagsList } from '@/api/hmmm/tags'
import QuestionsPreview from '../components/questions-preview.vue'
import { usersList } from '@/api/hmmm/user'
import PageTool from '@/module-dashboard/components/pageTool.vue'
export default {
  components: { QuestionsPreview, PageTool },
  data () {
    return {
      manyType, // 枚举数据
      page: {
        // 分页
        page: 1,
        pagesize: 5,
        total: 0 // 数据总数
      },
      questionsList: [], // table列表信息
      provincesList: provinces(),
      cityList: [],
      city: '',
      provinces: '',
      direction, // 枚举数据
      subjectsData: [], // 学科数据
      twoLevelDirectoryData: [], // 二级目录数据
      tagsData: [], // 标签数据
      userData: [], // 用户数据
      loading: false, // 用来控制进度弹层的显示和隐藏
      showDialog: false // 显示隐藏弹出层
    }
  },
  methods: {
    // 获取数据
    async getQuestionsList () {
      this.loading = true
      const { data } = await questionslist(this.page)
      this.loading = false
      this.questionsList = data.items
      this.page.total = data.counts
      // console.log(this.questionsList)
    },
    // 题型区分
    formatQuestionType (row, column, cellValue, index) {
      // call表示当前单元格的数据
      const res = manyType.questionType.find(
        (item) => item.id === Number(cellValue)
      )
      return res ? res.value : ''
    },
    // 难度区分
    formatDifficult (row, column, cellValue, index) {
      // call表示当前单元格的数据
      const res = manyType.difficultType.find(
        (item) => item.id === Number(cellValue)
      )
      return res ? res.value : ''
    },
    // 分页操作一
    async handleCurrentChange (currentPage) {
      // page代表着当前页的意思
      this.page.page = currentPage
      await this.getQuestionsList()
    },
    // 分页操作二
    async handleSizeChange (currentSize) {
      this.page.pagesize = currentSize
      await this.getQuestionsList()
    },
    // 清除数据
    async clearData () {
      this.questionsList = []
      this.city = ''
      this.provinces = ''
      await this.getQuestionsList()
    },
    // 获取学科数据
    async getSubjectsList () {
      const {
        data: { items }
      } = await subjectsList()
      // console.log(items)
      this.subjectsData = items
      // console.log(this.subjectsData)
    },
    // 获取选择学科的id
    async selectBtn (value) {
      // console.log(value)
      // 获取目录数据
      const {
        data: { items }
      } = await directorysList({ subjectID: value })
      this.twoLevelDirectoryData = items

      // 获取标签数据
      const res = await tagsList({ subjectID: value })
      // console.log(res)
      this.tagsData = res.data.items
    },
    // 删除数据
    async delBtn (id) {
      // console.log(id);
      // 弹窗是否删除
      this.$confirm('您确定要删除吗').then(
        async () => {
          try {
            await delQuestionslist(id)
            this.getQuestionsList()
            this.$message.success('删除成功')
          } catch (error) {
            console.log(error)
          }
        },
        (error) => {
          error === 'cancel'
            ? this.$message.warning('已取消')
            : this.$message.warning('未知的错误')
        }
      )
    },
    // 跳转到修改数据的页面
    editBtn () {
      this.$router.push('/questions/new')
    },
    // 跳转到添加数据的页面
    addBtn () {
      this.$router.push('/questions/new')
    },
    // 打开弹出框进行预览
    async previewBtn (id) {
      // console.log(id)
      await this.$refs.previewRef.getQuestionsDetails(id)
      this.showDialog = true
    },
    // 获取用户数据
    async getUsersList () {
      const {
        data: { list }
      } = await usersList(this.page)
      // console.log(list)
      this.userData = list
    },
    // 加入或移除精选
    addGoodQuestion (id) {
      this.$confirm('此操作将该题目加入精选，是否继续？').then(
        async () => {
          try {
            console.log(id)
            await questionsAddRemove({ id: id, choiceState: 1 })
            this.getQuestionsList()
            this.$message.success('加入精选成功')
          } catch (error) {
            console.log(error)
          }
        },
        (error) => {
          error === 'cancel'
            ? this.$message.warning('已取消')
            : this.$message.warning('未知的错误')
        }
      )
    },
    // 搜索
    searchData () {
      // console.log(direction, // 枚举数据
      //   this.subjectsData, // 学科数据
      //   this.twoLevelDirectoryData, // 二级目录数据
      //   this.tagsData, // 标签数据
      //   this.userData // 用户数据
      // )
    }
  },
  mounted () {
    this.getQuestionsList()
    this.getSubjectsList()
    this.getUsersList()
    // console.log(datas);
  },
  // 过滤器
  filters: {
    quBiaoqian: (value) => {
      if (value.slice(0, 3) === '<p>' && value.slice(-4) === '</p>') {
        return value.slice(3, -4)
      } else {
        return value
      }
    }
  },
  watch: {
    provinces (newvalue) {
      // 先清除city的数组
      this.cityList.splice(0)
      this.city = ''
      const cityData = citys(this.provinces)
      this.cityList.push(...cityData)
    },
    subjectsData (value) {
      console.log(value)
    },
    twoLevelDirectoryData (value) {
      console.log(value)
    },
    tagsData (value) {
      console.log(value)
    },
    userData (value) {
      console.log(value)
    }
  }
}

</script>

<style scoped lang="less">
.el-card {
  margin: 0 10px;
  margin-bottom: 30px;
  .pailie {
    // border: 1px solid #000;
    margin-top: 20px;
    .itemCol {
      // border: 1px solid #000;
      :deep(.el-form-item__label) {
        width: 30px;
        // border: 1px solid #000;
      }
      .chengshi {
        margin-left: 17px;
      }
      #dierhang {
        margin-left: 15px;
      }
    }
  }
  .colorBtn {
    border: 1px solid #c5e0ff;
    background-color: #ecf5ff;
  }
  :deep(.colorBtn:hover) {
    color: white;
    background-color: #409eff;
  }
  .colorBtn:nth-child(2) {
    border: 1px solid #d4edc9;
    background-color: #f0f9eb;
  }
  :deep(.colorBtn:nth-child(2):hover) {
    color: white;
    background-color: #67c23a;
  }
  .colorBtn:nth-child(3) {
    border: 1px solid #fad7d7;
    background-color: #fef0f0;
  }
  :deep(.colorBtn:nth-child(3):hover) {
    color: white;
    background-color: #f56c6c;
  }
  .colorBtn:nth-child(4) {
    border: 1px solid #fad7d7;
    background-color: #fef0f0;
  }
  :deep(.colorBtn:nth-child(4):hover) {
    color: white;
    background-color: #e6a23c;
  }
  .el-pagination {
    margin-top: 20px;
  }
  .el-table {
    margin-top: 20px;
  }
  :deep(.el-pagination){
    margin-top: 20px;
  }
}
</style>
