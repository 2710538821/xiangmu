<template>
  <div class='container'>
    <el-dialog title="新增用户" :visible="dialogVisible" @close="btnCancel">
      <el-form :model="companysForm" :rules="rule" ref="ruleForm">
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="shortName">
          <el-input v-model="companysForm.shortName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth" prop="company">
          <el-input v-model="companysForm.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市地区" :label-width="formLabelWidth" prop="province">
          <el-select v-model="companysForm.province" placeholder="请选择">
            <el-option label="北京市" value="110000"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="" :label-width="formLabelWidth" prop="city">
          <el-select v-model="companysForm.city" inline="true" placeholder="请选择">
            <el-option label="东城区" value="110101"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="方向(企业标签)" :label-width="formLabelWidth" prop="tags">
          <el-input v-model="companysForm.tags" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
          <el-input type="textarea" v-model="companysForm.remarks"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="btnOK">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCompanysList } from '../../api/hmmm/companys'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formLabelWidth: '120px',
      companysForm: {
        shortName: '',
        company: '',
        province: '',
        tags: '',
        remarks: '',
        isFamous: true
      },

      rule: {
        shortName: [{
          required: true, message: '企业简称不能为空', trigger: 'blur'
        }],
        company: [{
          required: true, message: '所属公司不能为空', trigger: 'blur'
        }],
        province: [{
          required: true, message: '所属省份不能为空', trigger: 'blur'
        }],
        city: [{
          required: true, message: '所属城市不能为空', trigger: 'blur'
        }],
        tags: [{
          required: true, message: '请输入标签', trigger: 'blur'
        }],
        remarks: [{
          required: true, message: '备注不能为空', trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    async btnOK () {
      try {
        await this.$refs.ruleForm.validate()
        await addCompanysList(this.companysForm)
        this.$emit('update:dialogVisible', false)
        this.$emit('update-data')
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel () {
      this.companysForm = {
        shortName: '',
        company: '',
        province: '',
        tags: '',
        remarks: ''
      }
      this.$emit('update:dialogVisible', false)
      this.$refs.ruleForm.resetFields()
    }
  }
  // computed: {
  //   // showTitle () {
  //   //   return this.formData.id ? '编辑用户' : '新增用户'
  //   // }
  // }
}
</script>

<style scoped lang='less'>
</style>
