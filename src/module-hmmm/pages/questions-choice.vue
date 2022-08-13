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
                v-model="questionsChoiceList.subject"
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
                v-model="questionsChoiceList.questionType"
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
              <el-input v-model="questionsChoiceList.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第二行选项 -->
        <el-col class="itemCol">
          <el-form label-width="70px" id="dierhang">
            <el-form-item label="二级目录">
              <el-select placeholder="请选择" v-model="questionsChoiceList.catalog">
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
                v-model="questionsChoiceList.difficulty"
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
              <el-input v-model="questionsChoiceList.enterprise"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第三行选项 -->
        <el-col class="itemCol">
          <el-form label-width="70px">
            <el-form-item label="标签">
              <el-select placeholder="请选择" v-model="questionsChoiceList.tags">
                <el-option
                  v-for="item in tagsData"
                  :key="item.id"
                  :label="item.tagName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="方向">
              <el-select placeholder="请选择" v-model="questionsChoiceList.direction">
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
                v-model="questionsChoiceList.question"
              ></el-input>
            </el-form-item>
            <el-form-item label="录入人">
              <el-select placeholder="请选择" v-model="questionsChoiceList.creator">
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
              <el-button type="primary" size="small">搜索</el-button>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <!-- tags标签页 -->
       <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="待审核" name="second"></el-tab-pane>
          <el-tab-pane label="已审核" name="third"></el-tab-pane>
          <el-tab-pane label="已拒绝" name="fourth"></el-tab-pane>
       </el-tabs>
      <!-- alert警告 -->
      <el-alert
        :title="`数据一共 ${page.total} 条`"
        type="info"
        show-icon
        :closable="false"
      ></el-alert>
      <!-- 表格 -->
      <el-table :data="questionsChoiceList" style="width: 100%" :key="toggleIndex">
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
        <el-table-column
          prop="chkState"
          label="审核状态"
          width="100"
          :formatter="formatChkState"
        ></el-table-column>
        <el-table-column
          prop="chkRemarks"
          label="审核意见"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="chkUser"
          label="审核人"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="publishState"
          label="发布状态"
          width="100"
          :formatter="formatPublishState"
        ></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template v-slot="{ row }">
            <!-- 按钮 -->
            <el-row>
              <el-button class="oneBtn" size="small" type="text" @click="previewBtn(row.id)">预览</el-button>
              <el-button size="small" type="text" :disabled="row.chkState === 0 ? false : true" @click="checkBtn(row.id)">审核</el-button>
              <el-button size="small" type="text" @click="editBtn" :disabled="showDisabled2">修改</el-button>
              <el-button size="small" type="text" @click="switchBtn(row.id,row.publishState)">{{row.publishState == 1 ? "上架" : "下架"}}</el-button>
              <el-button size="small" type="text" @click="delBtn(row.id)" :disabled="showDisabled2">删除</el-button>
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.page"
          :page-sizes="[1, 2, 3, 5]"
          :page-size="page.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination> -->
      </el-row>
    </el-card>
    <!-- 预览弹出框 -->
    <questions-preview
      :showDialog.sync="showDialog"
      ref="previewRef"
    ></questions-preview>
    <!-- 题目审核弹出框 -->
    <QuestionsCheck :showCheck.sync="showCheck" :checkDataid="checkDataid" :checkData="checkData" @updataData="getQuestionsList"></QuestionsCheck>
  </div>
</template>

<script>
import manyType from '@/api/constant/manyType.js'
import { questionsChoice, delQuestionslist, questionsShangXia } from '@/api/hmmm/questions'
import { parseTimeByString } from '@/filters/index.js'
import { citys, provinces } from '@/api/hmmm/citys'
import { direction } from '@/api/hmmm/constants'
import { subjectsList } from '@/api/hmmm/subjects'
import { directorysList } from '@/api/hmmm/directorys'
import { tagsList } from '@/api/hmmm/tags'
import QuestionsPreview from '../components/questions-preview.vue'
import { usersList } from '@/api/hmmm/user'
import PageTool from '@/module-dashboard/components/pageTool.vue'
import QuestionsCheck from '../components/questions-check.vue'
export default {
  name: 'QuestionChoice',
  components: { QuestionsPreview, QuestionsCheck, PageTool },
  data () {
    return {
      showDisabled: false, // 上架和下架状态
      showDisabled2: null, // 上架和下架状态
      showCheck: false, // 审查状态
      manyType, // 枚举数据
      page: {
        // 分页
        page: 1,
        pagesize: 5,
        total: 0 // 数据总数
      },
      questionsChoiceList: [], // table列表信息
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
      showDialog: false, // 显示隐藏弹出层
      activeName: 'first', // tags标签页默认
      toggleIndex: 0, // 设置索引默认值 // 解决切换闪屏问题
      checkDataid: null, // 审查id
      checkData: {
        chkRemarks: '', // 审核意见
        chkState: null // 审核状态
      }
    }
  },
  methods: {
    // 获取数据
    async getQuestionsList () {
      this.loading = true
      const {
        data: { items }
      } = await questionsChoice(this.page)
      this.loading = false
      this.questionsChoiceList = items
      this.page.total = items.length
      // console.log(this.questionsChoiceList)
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
    // 审核状态区分
    formatChkState (row, column, cellValue, index) {
      const res = manyType.chkType.find(
        (item) => item.value === Number(cellValue)
      )
      return res ? res.label : ''
    },
    // 发布状态区分
    formatPublishState (row, column, cellValue, index) {
      const res = manyType.publishType.find(
        (item) => item.value === Number(cellValue)
      )
      return res ? res.label : ''
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
      this.questionsChoiceList = []
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
      const { data: { items } } = await directorysList({ subjectID: value })
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
      this.$confirm('您确定要删除吗').then(async () => {
        try {
          await delQuestionslist(id)
          this.getQuestionsList()
          this.$message.success('删除成功')
        } catch (error) {
          console.log(error)
        }
      }, error => {
        error === 'cancel' ? this.$message.warning('已取消') : this.$message.warning('未知的错误')
      })
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
      const { data: { list } } = await usersList(this.page)
      // console.log(list)
      this.userData = list
    },
    // 切换tbale页面
    async handleClick (tab, event) {
      // console.log(tab, event)
      // console.log(tab.index)

      // 全部
      if (tab.index === '0') {
        this.toggleIndex = 10 // 解决切换闪屏问题
        await this.getQuestionsList()
        // 待审核
      } else if (tab.index === '1') {
        this.toggleIndex = 11 // 解决切换闪屏问题
        await this.getQuestionsList()
        this.questionsChoiceList = this.questionsChoiceList.filter(item => {
          if (item.chkState === 0) {
            return item
          }
        })
        // 已审核
      } else if (tab.index === '2') {
        this.toggleIndex = 12 // 解决切换闪屏问题
        await this.getQuestionsList()
        this.questionsChoiceList = this.questionsChoiceList.filter(item => {
          if (item.chkState === 1) {
            return item
          }
        })
        // 已拒绝
      } else if (tab.index === '3') {
        this.toggleIndex = 13 // 解决切换闪屏问题
        await this.getQuestionsList()
        this.questionsChoiceList = this.questionsChoiceList.filter(item => {
          if (item.chkState === 2) {
            return item
          }
        })
      }
    },
    // 切换上架和下架状态
    switchBtn (id, value) {
      // console.log(id)
      this.showDisabled = !this.showDisabled
      if (this.showDisabled === true) {
        this.$confirm('您确认上架这道题目吗').then(
          async () => {
            try {
              console.log(id)
              await questionsShangXia({ id: id, publishState: 1 })
              this.getQuestionsList()
              this.showDisabled2 = true
              this.$message.success('上架成功')
            } catch (error) {
              console.log(error)
            }
          },
          (error) => {
            this.showDisabled2 = false
            error === 'cancel'
              ? this.$message.warning('已取消')
              : this.$message.warning('未知的错误')
          }
        )
      } else if (this.showDisabled === false) {
        this.$confirm('您确认下架这道题目吗').then(
          async () => {
            try {
              // console.log(id)
              await questionsShangXia({ id: id, publishState: 0 })
              this.getQuestionsList()
              this.showDisabled2 = false
              this.$message.success('下架成功')
            } catch (error) {
              console.log(error)
            }
          },
          (error) => {
            this.showDisabled = true
            error === 'cancel'
              ? this.$message.warning('已取消')
              : this.$message.warning('未知的错误')
          }
        )
      }
    },
    // 审查状态(接口错误)
    checkBtn (id) {
      // console.log(id)
      this.checkDataid = id
      this.showCheck = true
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
  .el-pagination {
    margin-top: 20px;
  }
  .el-table {
    margin-top: 20px;
    .el-button+.el-button{
      margin: 0;
      margin-right: 5px;
    }
    :deep(.oneBtn){
      margin-right: 5px;
    }
  }
  :deep(.el-pagination){
    margin-top: 20px;
  }
}
</style>
