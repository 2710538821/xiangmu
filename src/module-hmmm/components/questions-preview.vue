<template>
  <div class="container">
    <el-dialog title="题目预览" :visible="showDialog" @close="closeBtn">
      <el-row>
        <!-- 第一列 -->
        <el-col :span="6">
          <el-form label-width="100px">
            <el-form-item label="【题型】:">
              <el-input v-model="formData.questionType" style="width: 50%" />
            </el-form-item>
            <el-form-item label="【学科】:">
              <el-input v-model="formData.subjectID" style="width: 50%" />
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第二列 -->
        <el-col :span="6">
          <el-form label-width="100px">
            <el-form-item label="【编号】:">
              <el-input v-model="formData.id" style="width: 50%" />
            </el-form-item>
            <el-form-item label="【目录】:">
              <el-input v-model="formData.catalogID" style="width: 50%" />
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第三列 -->
        <el-col :span="6">
          <el-form label-width="100px">
            <el-form-item label="【难度】:">
              <el-input v-model="formData.difficulty" style="width: 50%" />
            </el-form-item>
            <el-form-item label="【方向】:">
              <el-input v-model="formData.direction" style="width: 50%" />
            </el-form-item>
          </el-form>
        </el-col>
        <!-- 第四列 -->
        <el-col :span="6">
          <!-- :model="formData" -->
          <el-form label-width="100px">
            <el-form-item label="【标签】:">
              <el-input v-model="formData.tags" style="width: 50%" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <hr />
      <p class="divClass">
          【题干】：<br />
          <div>{{ formData.question | quBiaoqian }}</div>
          <br>
          {{ formData.questionType }}题 选项：（以下选中的选项为正确答案）
      </p>
      <hr />
      <p>
      【参考答案】：<el-button @click="showVideo = true" type="primary" size="small"
        ><span>视频答案预览</span></el-button><el-button @click="showVideo = false" type="danger" size="small">关闭视频</el-button> <br>
        <video
          v-show="showVideo"
          :src="formData.videoURL"
          controls
          autoplay
          muted
          loop
          style="width:340px;height:240px"
        />
      </p>
      <hr />
      <p>
      【答案解析】：{{ formData.answer | quBiaoqian }}
      </p>
      <hr />
      <p>
      【题目备注】：{{ formData.remarks }}
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { questionsDetails } from '@/api/hmmm/questions'
import manyType from '@/api/constant/manyType.js'
import { subjectsSimpleList } from '@/api/hmmm/subjects'
import { direcotrysSimpleList } from '@/api/hmmm/directorys'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        id: '', // 编号
        subjectID: '', // 学科 // 要枚举转一下
        catalogID: '', // 目录 // 要枚举转一下
        questionType: '', // 题型 // 要枚举转一下
        direction: '', // 方向
        difficulty: '', // 难度 // 要枚举转一下
        question: '', // 题干
        tags: '', // 标签
        videoURL: '', // 参考答案，视频解析
        answer: '', // 答案解析
        remarks: '' // 题目备注
      },
      showVideo: false,
      manyType, // 枚举数据
      subjectEnum: [], // 学科枚举数据
      direcotrysEnum: [] // 目录枚举数据
    }
  },
  methods: {
    // 获取详情数据
    async getQuestionsDetails (id) {
      const { data } = await questionsDetails(id)
      this.formData = data
      console.log(this.formData)
    },
    // 关闭弹出框
    closeBtn () {
      this.formData = {
        id: '', // 编号
        subjectID: '', // 学科 // 要枚举转一下
        catalogID: '', // 目录 // 要枚举转一下
        questionType: '', // 题型 // 要枚举转一下
        direction: '', // 方向
        difficulty: '', // 难度 // 要枚举转一下
        question: '', // 题干
        tags: '', // 标签
        videoURL: '', // 参考答案，视频解析
        answer: '', // 答案解析
        remarks: '' // 题目备注
      }
      this.$emit('update:showDialog', false)
      this.showVideo = false
    },
    async getSubjectsSimpleList () {
      const { data } = await subjectsSimpleList()
      // console.log(data)
      this.subjectEnum = data
    },
    async getDirecotrysSimpleList () {
      const { data } = await direcotrysSimpleList()
      // console.log(data)
      this.direcotrysEnum = data
    }
  },
  mounted () {
    // console.log(manyType)
    this.getSubjectsSimpleList()
    this.getDirecotrysSimpleList()
  },
  watch: {
    formData (newValue) {
      // console.log(newValue.questionType)
      // 题型枚举转换
      manyType.questionType.forEach((item) => {
        if (item.id === Number(newValue.questionType)) {
          this.formData.questionType = item.value
        }
      })
      // 难度枚举转换
      manyType.difficultType.forEach((item) => {
        if (item.id === Number(newValue.difficulty)) {
          this.formData.difficulty = item.value
        }
      })
      // 学科枚举转换
      this.subjectEnum.forEach((item) => {
        if (item.value === Number(newValue.subjectID)) {
          this.formData.subjectID = item.label
        }
      })
      // 目录枚举转换
      this.direcotrysEnum.forEach((item) => {
        if (item.value === Number(newValue.catalogID)) {
          this.formData.catalogID = item.label
        }
      })
    }
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
  }
}
</script>

<style scoped lang="less">
.el-form :deep(.el-input__inner) {
  width: 70px;
  padding: 0;
  border: 0;
}
div{
  color:#1011fe;
}
p{
  padding: 10px 0;
}
video{
  padding-top: 10px;
}
</style>
