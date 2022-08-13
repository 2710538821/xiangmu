<template>
  <div class="container">
    <el-dialog :title="showTitle" :visible="dialogVisible" @close="btnCancel">
      <el-form :model="companysForm" :rules="rule" ref="ruleForm">
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="shortName">
          <el-input v-model="companysForm.shortName" autocomplete="off" style="width:440px"></el-input>
        </el-form-item>
        <el-form-item label="所属公司" :label-width="formLabelWidth" prop="company">
          <el-input v-model="companysForm.company" autocomplete="off" style="width:440px"></el-input>
        </el-form-item>
        <el-form-item label-width="120px">
          <span>https://www.tianyancha.com （在此可查询所属公司全称及简称）</span>
        </el-form-item>
        <el-row class="row">
          <el-form-item label="城市地区" :label-width="formLabelWidth" prop="province">
          <el-select v-model="companysForm.province" placeholder="请选择" @change="changeP">
            <el-option :label="item" :value="item" v-for="item in provinces()" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="city">
          <el-select v-model="companysForm.city" inline="true" placeholder="请选择">
            <el-option :label="item" :value="item" v-for="item in citysList" :key="item"></el-option>
          </el-select>
        </el-form-item>
        </el-row>
        <el-form-item label="方向(企业标签)" :label-width="formLabelWidth" prop="tags">
          <el-input v-model="companysForm.tags" autocomplete="off" style="width:440px"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remarks">
          <el-input type="textarea" v-model="companysForm.remarks" style="width:440px"></el-input>
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
import { addCompanysList, getCompanysDetail, editCompanysDetail } from '../../api/hmmm/companys'
import { provinces, citys } from '@/api/hmmm/citys'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      provinces,
      provincesList: [],
      citys,
      citysList: [],
      formLabelWidth: '120px',
      companysForm: {
        shortName: '',
        company: '',
        province: '',
        city: '',
        tags: '',
        remarks: '',
        isFamous: true,
        code: '',
        message: true
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
        if (this.companysForm.id) {
          await editCompanysDetail(this.companysForm)
          this.$emit('update:dialogVisible', false)
          this.$emit('update-data')
        } else {
          await this.$refs.ruleForm.validate()
          await addCompanysList(this.companysForm)
          this.$emit('update:dialogVisible', false)
          this.$emit('update-data')
        }
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
    },
    changeP (e) {
      provinces()
      console.log(e)
      citys(e)
      this.citysList = citys(e)
      this.companysForm.city = citys(e)[0]
    },
    async getDetail (id) {
      const res = await getCompanysDetail(id)
      // console.log(res.data)
      this.companysForm = res.data
      if (this.companysForm.isFamous === 1) {
        this.companysForm.isFamous = true
      } else {
        this.companysForm.isFamous = false
      }
      // console.log(this.companysForm)
    }
  },
  computed: {
    showTitle () {
      return this.companysForm.id ? '编辑用户' : '新增用户'
    }
  }
}
</script>

<style scoped lang="less">
.dialog-footer{
  display: flex;
  justify-content: center;
}
</style>
