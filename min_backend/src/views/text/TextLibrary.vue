<template>
  <div>
    <div class="text-lib__search-box">
      <el-form :inline="true" :model="formTextSearch" class="demo-form-inline">
        <el-form-item label="文本库名称">
          <el-input v-model="formTextSearch.textLibName" placeholder="文本库名称"/>
        </el-form-item>
        <el-form-item label="文本库状态">
          <el-select v-model="formTextSearch.textLibStatus" placeholder="文本库状态">
            <el-option
              v-for="item in textLibStatusSel"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="search" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="textLibrarysAll" class="text-lib__table" border stripe>
      <template v-for="column in TEXT_LIBRARY_THEAD">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          v-if="column.prop === 'keywords'" >
          <template slot-scope="scope">
            <template v-for="keyward in scope.row.keywords">
              <el-tag style="margin-left: 10px;" type="primary">{{ keyward }}</el-tag>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :width="column.width" v-else />
      </template>
      <el-table-column prop="operation" label="操作" :width="240">
        <template slot-scope="scope">
          <el-button size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { TEXT_LIBRARY_THEAD } from '../../utils/constant'

const textLibrarysAll = [
  { name: '安全提醒（消费后提醒类）', priority: '0', keywords: ['345345', '2234', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' },
  { name: '返现/分期券（消费后提醒类）', priority: '1', keywords: ['返现', '分期券', '安全', '提醒', '返现', '分期券', '安全', '提醒'], status: '禁用' }
]

const textLibStatusSel = [
  { value: 'all', label: '所有' },
  { value: 'using', label: '启用' },
  { value: 'forbidden', label: '禁用' }
]

export default {
  data () {
    return {
      TEXT_LIBRARY_THEAD,
      textLibrarysAll,
      textLibStatusSel,
      formTextSearch: {}
    }
  }
}
</script>

<style lang="scss">
.text-lib__search-box {
  padding: 20px 30px 0 30px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
}

.search-btn {
  margin-left: 60px;
}

.text-lib__table {
  width: 100%;
}

.text-lib__table .cell {
  line-height: 32px;
}
</style>
