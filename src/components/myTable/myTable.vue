<!-- 表单封装 -->
<template>
  <div class="container">
    <!-- 表单 -->
    <el-table
      style="width: 100%"
      :data="tableData.tableBody"
      :border="tableData.border"
      :height="tableData.height"
      :stripe="tableData.stripe"
      highlight-current-row
      v-loading="tableData.loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      @selection-change="handleSelectionChange"
    >
      <template v-for="item in tableData.tableHead" :key="item.uniqueId">
        <!-- 序号 -->
        <el-table-column
          v-if="item.type == 'index'"
          type="index"
          :align="item.align"
          :label="item.label"
          :width="item.width"
        ></el-table-column>

        <!-- 多选 -->
        <el-table-column
          v-else-if="item.type == 'selection'"
          type="selection"
          :align="item.align"
          :label="item.label"
          :width="item.width"
        ></el-table-column>

        <!-- 查看 -->
        <el-table-column
          v-else-if="item.type == 'show'"
          :align="item.align"
          :label="item.label"
          :width="item.width"
          show-overflow-tooltip
        >
          <template #default="slotProps">
            <p @click="showDetail(slotProps.row)" class="show">
              {{ slotProps.row[item.prop] }}
            </p>
          </template>
        </el-table-column>

        <!-- 图片 -->
        <el-table-column
          v-else-if="item.type == 'img'"
          :align="item.align"
          :label="item.label"
          :width="item.width"
        >
          <template #default="slotProps">
            <el-image
              :src="slotProps.row[item.prop]"
              :preview-src-list="[slotProps.row[item.prop]]"
              fit="cover"
              :preview-teleported="true"
            />
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column
          v-else-if="item.type == 'button'"
          :label="item.label"
          :align="item.align"
          :width="item.width"
          :fixed="item.fixed"
        >
          <template #default="{ row, $index }">
            <slot name="button" :row="row" :index="$index"></slot>
          </template>
        </el-table-column>

        <!-- 表格数据 -->
        <el-table-column
          v-else
          :sortable="item.sortable"
          :width="item.width"
          :align="item.align"
          :prop="item.prop"
          :label="item.label"
          show-overflow-tooltip
        >
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        small
        :page-sizes="tableData.pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
// 接受父组件传递的参数
const props = defineProps({
  tableData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

// 传递给父组件
const emit = defineEmits(['handleSizeChange', 'handleCurrentChange', 'handleSelectionChange'])

// 分页功能
const handleSizeChange = (newSize) => {
  emit('handleSizeChange', newSize)
}
const handleCurrentChange = (newPage) => {
  emit('handleSizeChange', newPage)
}

// 多选
const handleSelectionChange = (val) => {
  emit('handleSelectionChange', val)
}

// 查看详情
const showDetail = (row) => {
  console.log('查看详情', row)
}
</script>

<style scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.show {
  cursor: pointer;
  color: turquoise;
}

.img {
  width: 110px;
  height: 110px;
  border-radius: 20px;
  object-fit: cover;
  cursor: pointer;
}
</style>
