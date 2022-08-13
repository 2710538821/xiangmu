<template>
 <el-row type="flex" justify="end">
         <el-pagination
         background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.page"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="page.pagesize"
      layout=" prev, pager, next, sizes, jumper"
      :total="total">
    </el-pagination>
        </el-row>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      require
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.pagesize = val
    },
    handleCurrentChange (val) {
      this.page.page = val
    }
  },
  data () {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  }
}
</script>
