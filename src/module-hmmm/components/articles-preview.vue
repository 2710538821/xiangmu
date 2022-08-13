<template>
  <div class='container'>
    <el-dialog title="预览文章" :visible='preiVisible' @close='closebut'>
      <h2>{{seebutForm.title}}</h2>
      <div>
      <span>{{seebutForm.createTime | parseTimeByString}}</span>&nbsp;&nbsp;
      <span>{{seebutForm.username}}</span>&nbsp;&nbsp;
      <i class="el-icon-view"></i>
      <span>{{seebutForm.visits}}</span>
    </div>
    <div class="box">
      <p>222</p>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTimeByString } from '@/filters/index'
export default {
  props: {
    preiVisible: {
      default: false,
      type: Boolean
    },
    seebutForm: Object
  },
  data () {
    return {
      parseTimeByString
    }
  },
  methods: {
    seebut (val) {
      console.log(val)
      this.seebutForm = val
    },
    closebut () {
      this.$emit('update:preiVisible', false)
    }
  }
}
</script>

<style scoped lang='less'>
.box{
border-top: 1px dashed #6666;
background-color: #f5f5f5;
display: flex;
}
.box p{
  align-items: center;
}
</style>
