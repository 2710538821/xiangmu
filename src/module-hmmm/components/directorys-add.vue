<template>
  <div class='container'>
    <el-dialog
  :title="`${showTitle}目录`"
  :visible="showDialog"
  width="25%"
  @close="Close"
>
  <el-form  ref="formDataRef" :model="formData" :rules="formDataRules" label-width="80px">
  <el-form-item label="所属学科" v-if="!$route.query.id">
     <el-select v-model="formData.subjectID" placeholder="请选择" class="W80">
        <el-option
        v-for="item in subjectList "
         :key="item.value"
         :label="item.label"
          :value="item.value"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="目录名称" prop="directoryName">
    <el-input v-model="formData.directoryName"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button @click="Close">取 消</el-button>
    <el-button type="primary" @click="btnOk">确 定</el-button>
  </el-form-item>
  </el-form>

</el-dialog>
  </div>
</template>

<script>
import { getSimpleList } from '@/api/hmmm/subjects.js'
import { add, detail, update } from '@/api/hmmm/directorys.js'
export default {
  name: 'directoryAdd',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    subjectName: {
      type: String
    }
  },
  data () {
    return {
      formData: {
        subjectID: '',
        directoryName: ''
      },
      formDataRules: {
        directoryName: [{ required: true, message: '目录名称必填', trigger: 'blur' }]
      },
      subjectList: []
    }
  },
  computed: {
    showTitle () {
      return this.formData.id ? '修改' : '新增'
    }
  },
  async mounted () {
    const { data } = await getSimpleList(this.formData.subjectName)
    this.subjectList = data
  },
  methods: {
    // 获取目录详情
    async  getDetail (id) {
      const { data } = await detail(id)
      this.formData = data
      // console.log(data)
    },
    async btnOk () {
      try {
        await this.$refs.formDataRef.validate()
        // 判断是编辑还是新增
        if (this.formData.id) {
          // 编辑
          await update(this.formData)
        } else {
          // 判断是学科过来的还是侧边栏过来的
          if (this.subjectName) {
            // 把subjectName转换成subjectID
            const { data } = await getSimpleList(this.subjectName) // 枚举
            const index = data.findIndex(item => item.label === this.subjectName)
            await add({ ...this.formData, subjectID: data[index].value })
          } else {
            await add(this.formData)
          }
        }
        this.$message.success(`${this.showTitle}目录成功`)
        // 通知父组件更新
        this.$emit('update-directory')
        this.$emit('update:showDialog', false)
      } catch (error) {
        console.log(error)
      }
    },
    Close () {
      this.$refs.formDataRef.resetFields()
      this.formData = {
        subjectID: '',
        directoryName: ''
      }
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style scoped lang='less'>
.W80 {
  width: 100%;
}
/deep/.el-dialog{
  z-index: 1000;
}
</style>
