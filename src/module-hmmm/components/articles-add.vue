<template>
  <div class="container">
    <el-dialog :title="title" :visible="dialogFormVisible" @close="closeBtn">
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="文章标题:" prop="title">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="文章内容:" prop="articleBody">
      <RichText
      v-model="form.articleBody"
      ></RichText>
         <!-- <RichText
      ></RichText> -->
    </el-form-item>
    <el-form-item label="视频地址:" prop="videoURL">
        <el-input v-model="form.videoURL" placeholder="请输入视频地址"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeBtn">取 消</el-button>
    <el-button type="primary" @click="addbtn">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { detail, update, add } from '@/api/hmmm/articles'
import RichText from '@/components/RicText/rich-text'
export default {
  components: {
    RichText
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 新增携带的参数
      form: {
        title: '',
        articleBody: '',
        videoURL: ''
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
        articleBody: [{ required: true, message: '请输入文本内容', trigger: 'blur' }]
      }
      // editorOption: {}
    }
  },
  computed: {
    title () {
      return this.form.di ? '编辑文章' : '新增文章'
    }
  },
  methods: {
    // 获取文章详情
    async detail (id) {
      const { data } = await detail(id)
      this.form = data
    },
    // 关闭弹窗
    closeBtn () {
      // 取消验证
      this.$refs.formRef.resetFields()
      this.form = {
        title: '',
        articleBody: '',
        videoURL: ''
      }
      this.$emit('update:dialogFormVisible', false)
    },
    // 确定添加
    async addbtn () {
      // 表单校验
      try {
        this.$refs.formRef.validate()
        if (this.form.id) {
          // 修改
          await update(this.form)
          this.$message.success('文章编辑成功')
          this.$emit('update-date')
        } else {
          // 新增
          this.form = await add(this.form)
          this.$message.success('新增文章成功')
          this.$emit('update-date')
        }
        this.$emit('uplist')
        this.$emit('update:dialogFormVisible', false)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang='less'>
:deep(.ql-container){
  height: 260px;
}
</style>
