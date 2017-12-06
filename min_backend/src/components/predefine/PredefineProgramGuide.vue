
<template>
  <div class="">
    <el-form
      ref="programDirectiveForm"
      label-width="100px"
      class="form-box"
      :inline="true"
      :model="programDirectiveForm"
    >
      <template v-for="(programDirective, index) in programDirectiveForm.programDirectives">
        <el-form-item
          :prop="'programDirectives.' + index + '.pageID'"
          :label="'页面' + (index + 1)"
          :rules="[{ required: true, message: '请选择页面', trigger: 'change' }]"

        >
          <el-select v-model="programDirective.pageID" placeholder="请选择页面" style="width: 312px;">
            <el-option label="首页状态变量" value="homeVar"></el-option>
            <el-option label="选择变量" value="chooseVar"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :prop="'programDirectives.' + index + '.directive'"
          :rules="[{ required: true, message: '请选择指引', trigger: 'change' }]"
        >
          <el-select v-model="programDirective.directive" placeholder="请选择指引"  style="width: 312px;">
            <el-option label="增加+" value="add"></el-option>
            <el-option label="减少-" value="reduce"></el-option>
            <el-option label="更新至=" value="updateTo"></el-option>
            <el-option label="文本增加" value="textAdd"></el-option>
          </el-select>
          <fa-icon class="fa-plus-circle icon-add" id="ADD_PARAM" @click="onAddProgramDirective" v-if="programDirective.showAddBtn"/>
          <fa-icon class="fa-minus-circle icon-add" id="REDUCE_PARAM" @click="onReduceProgramDirective" v-if="programDirective.showReduceBtn"/>
        </el-form-item>
      </template>
      <el-form-item label="备注信息" prop="remark" class="form-item__remark">
        <el-input
          type="textarea"
          resize="none"
          class="input-remark"
          :autosize="{ minRows: 3, maxRows: 6 }"
          v-model="programDirectiveForm.remark"/>
      </el-form-item>
      <el-form-item size="large" class="form-item__bottom">
        <el-button type="primary" @click="onAddProgramDirectives('programDirectiveForm')">立即创建</el-button>
        <el-button @click="onResetForm('programDirectiveForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FaIcon from '../../components/commons/FaIcon'

export default {
  components: { FaIcon },
  data () {
    return {
      programDirectiveForm: {
        programDirectives: [{ pageID: '', directive: '', showAddBtn: true, showReduceBtn: false }],
        remark: ''
      }
    }
  },
  methods: {
    onAddProgramDirectives (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit: ', this.programDirectiveForm)
        } else {
          return false
        }
      })
    },

    onResetForm (formName) {
      this.$refs[formName].resetFields()
    },

    onAddProgramDirective (event) {
      const length = this.programDirectiveForm.programDirectives.length
      this.programDirectiveForm.programDirectives[length - 1].showAddBtn = false
      this.programDirectiveForm.programDirectives[length - 1].showReduceBtn = false
      this.programDirectiveForm.programDirectives.push({ variable: '', updateType: '', value: '', showAddBtn: true, showReduceBtn: true })
      console.log(this.programDirectiveForm.programDirectives)
    },

    onReduceProgramDirective (event) {
      let length = this.programDirectiveForm.programDirectives.length
      if (length <= 1) return

      this.programDirectiveForm.programDirectives.pop()

      // 保持最后一个元素显示加减按钮，因为上面pop一个元素，所以这里减2
      this.programDirectiveForm.programDirectives[length - 2].showAddBtn = true
      this.programDirectiveForm.programDirectives[length - 2].showReduceBtn = !(length <= 2)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  width: 862px;
  text-align: left;
  margin-top: 20px;
}

.form-item__bottom {
  text-align: center;
  width: 100%;
}

.form-item__remark {
  display: block;
}

.input-remark {
    width: 640px;
}

.input-msg-title {
  width: 188px;
}

.radio-box {
  text-align: left;
}

.icon-add {
  font-size: 28px;
  margin-left: 12px;
  vertical-align: middle;
}
.icon-add:nth-of-type(2) {
  margin-left: 0;
}
</style>
