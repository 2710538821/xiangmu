<template>
  <div class='container'>
<el-dialog
  :title="`${showTitle}学科`"
  :visible="showDialog"
  width="25%"
  @close="Close"
>
  <el-form  ref="formDataRef" :model="formData" :rules="formDataRules" label-width="80px">
  <el-form-item label="学科名称" prop="subjectName">
    <el-input v-model="formData.subjectName" placeholder="请输入学科名称"></el-input>
  </el-form-item>
    <el-form-item label="是否显示" prop="isFrontDisplay">
    <el-switch
    v-model="isShow"
     active-color="#13ce66"
  inactive-color="#ccc"></el-switch>
  </el-form-item>
  <el-form-item>
    <el-button @click="Close">取 消</el-button>
    <el-button type="primary" @click="SubjectBtn">确 定</el-button>
  </el-form-item>
  </el-form>

</el-dialog>
  </div>
</template>

<script>
import { addSubject, getSubjectById, editSubjectById } from '@/api/hmmm/subjects.js'
export default {
  name: 'subjectDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        subjectName: '',
        isFrontDisplay: 0
      },
      formDataRules: {
        subjectName: [{ required: true, message: '请输入学科名称', trigger: 'blur' }],
        isFrontDisplay: [{ required: true, message: '是否显示必须选', trigger: 'blur' }]
      }

    }
  },
  computed: {
    showTitle () {
      return this.formData.id ? '修改' : '新增'
    },
    isShow: {
      get () {
        return this.formData.isFrontDisplay === 1
      },
      set (val) {
        this.formData.isFrontDisplay = val ? 1 : 0
      }
    }
  },
  methods: {
    // 根据id获取学科详情
    async getSubjectById (id) {
      const { data } = await getSubjectById(id)
      this.formData = data
    },
    // 新增编辑学科
    async SubjectBtn () {
      try {
        // 验证表单
        await this.$refs.formDataRef.validate()
        // 判断是新增还是编辑
        if (this.formData.id) {
        // 编辑
          await editSubjectById(this.formData)
        } else {
          await addSubject(this.formData)
        }
        //  通知父组件更新列表
        this.$emit('updateSubject')
        this.$message.success(this.showTitle + '学科成功')
        this.$emit('update:show-dialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    Close () {
      this.$refs.formDataRef.resetFields()
      this.formData = {
        subjectName: '',
        isFrontDisplay: 0
      }
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped lang='less'></style>
