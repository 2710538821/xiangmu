<template>
  <div class="container">
    <el-dialog title="题目审核" :visible="showCheck" width="410px" @close="btnCancel">
      <el-radio v-model="checkData.chkState" label="1">通过</el-radio>
      <el-radio v-model="checkData.chkState" label="2">拒绝</el-radio>
      <el-form>
        <el-form-item>
          <el-input
            v-model="checkData.chkRemarks"
            type="textarea"
            placeholder="请输入审核意见"
            rows="3"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="end">
        <!-- 列被分为24 -->
        <el-col :span="8">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { questionsCheck } from '@/api/hmmm/questions'
export default {
  name: 'QuestionsCheck',
  props: {
    showCheck: {
      type: Boolean,
      default: false
    },
    checkData: {
      type: Object
    },
    checkDataid: {
      type: Number,
      default: null
    }
  },
  methods: {
    // 确定
    async btnOk () {
      this.checkData.chkState = Number(this.checkData.chkState)
      await questionsCheck(this.checkDataid, { ...this.checkData, id: this.checkDataid })
      // console.log(this.checkDataid, this.checkData)
      this.$emit('update:showCheck', false)
      this.$emit('updataData')
    },
    // 取消
    btnCancel () {
      this.$emit('update:showCheck', false)
    }
  }
}
</script>

<style scoped lang="less">
.el-form {
  margin-top: 20px;
}
</style>
