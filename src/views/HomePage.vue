<template>
  <div class="container">
    <h1>Home Page</h1>

    <div class="box">
      <myTable
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @handleList="handleList"
        @handleSelectionChange="handleSelectionChange"
      >
        <template v-slot:button="scope">
          <el-button @click="handleList('修改', scope.row)">修改</el-button>
          <el-button @click="handleList('删除', scope.row)">删除</el-button>
        </template>
      </myTable>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import myTable from '../components/myTable/myTable.vue'

import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

onMounted(() => {
  getTableData()
})

const tableData = reactive({
  loading: false,
  stripe: true,
  height: 800,
  border: true,
  tableHead: [
    {
      uniqueId: 1,
      align: 'center',
      label: '多选',
      type: 'selection',
      width: 60
    },
    {
      uniqueId: 2,
      align: 'center',
      label: '标题',
      prop: 'title',
      sortable: true
    },
    {
      uniqueId: 3,
      align: 'center',
      label: 'ID',
      prop: 'id',
      type: 'show',
      width: 80
    },
    {
      uniqueId: 4,
      align: 'center',
      label: '图片A',
      type: 'img',
      prop: 'thumbnailUrl',
      width: 140
    },
    {
      uniqueId: 5,
      align: 'center',
      label: '图片B',
      width: 140,
      type: 'img',
      prop: 'url'
    },
    { uniqueId: 6, align: 'center', label: '操作', type: 'button', width: 220 }
  ],
  tableBody: [],
  currentPage: 1,
  currentSize: 10,
  total: 200,
  pageSizes: [10, 20, 30, 40]
})

// 获取表单数据
const getTableData = () => {
  tableData.loading = true
  setTimeout(() => {
    proxy.$http
      .getPosts({ _page: tableData.currentPage, _limit: tableData.currentSize })
      .then((res) => {
        tableData.tableBody = res
        tableData.total = res.length
        tableData.loading = false
      }, 3000)
  })
}

// 分页
const handleSizeChange = (newSize) => {
  tableData.currentSize = newSize
  getTableData()
}
const handleCurrentChange = (newPage) => {
  tableData.currentPage = newPage
  getTableData()
}

// 多选
const handleSelectionChange = (val) => {
  console.log('val', val)
}

// 操作
const handleList = (type, row) => {
  console.log(type, row)
}
</script>

<style scoped>
.box {
  margin: 0 auto;
  width: 80%;
  height: 80vh;
  background-color: red;
}
</style>
