<template>
  <div class="container">
    <el-dialog :title="form.title" :visible="dialogFormVisible" @close="closeBtn">
  <el-form :model="form" :rules="rules" ref="formref" label-width="100px">
    <el-form-item label="文章标题:" prop="title">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="文章内容:" prop="articleBody">
      <RichText v-model="form.articleBody"></RichText>
    </el-form-item>
    <el-form-item label="视频地址:" prop="videoURL">
        <el-input v-model="form.videoURL" placeholder="请输入视频地址"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closeBtn">取 消</el-button>
    <el-button type="primary">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    // 关闭弹窗
    closeBtn () {
      this.$emit('update:dialogFormVisible', false)
    }
  }
}
</script>

<style scoped lang='less'>
:deep(.ql-container){
  height: 260px;
}
</style>
