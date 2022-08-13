<template>
  <div class="container">
    <el-card>
      <!-- 新增按钮 -->
      <el-row type="flex" justify="end">
        <el-button type="success" icon="el-icon-edit" size="small">新增试题</el-button>
      </el-row>
      <!-- 选择项表单 -->
      <!-- 第一行选项 -->
      <el-row type="flex" class="pailie">
        <el-col class="itemCol">
          <el-form>
            <el-form-item label="学科">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="试题类型">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="题目">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="itemCol">
          <el-form>
            <el-form-item label="试题类型">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级目录">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="itemCol">
          <el-form>
            <el-form-item label="学科">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级目录">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键字">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="itemCol">
          <el-form>
            <el-form-item label="学科">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级目录">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.el-card {
  margin: 0 10px;

  .pailie {

    // border: 1px solid #000;
    .itemCol {
      border: 1px solid #000;

      /deep/ .el-form-item__label {
        width: 77px;
        border: 1px solid #000;
      }
    }
  }
}
</style>
