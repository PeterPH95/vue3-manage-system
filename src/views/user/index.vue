<template>
  <el-table :data="filterData" style="width: 100%" :border="true">
    <el-table-column label="出生日期" width="300" align="center">
      <template #default="scope">
        <div style="display: flex; justify-content: center; align-items: center;">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="200" align="center">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>姓名: {{ scope.row.name }}</div>
            <div>地址: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="性别" width="80" align="center">
      <template #default="scope">
        <div style="display: flex; align-items: center; justify-content: center;">
          <span>{{ scope.row.gender === 1 ? '女': '男' }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="地址" align="center">
      <template #default="scope">
        <div style="display: flex; align-items: center; justify-content: center;">
          <span>{{ scope.row.address }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column width="300" align="center">
      <template #header>
        <el-input v-model="search" size="small" placeholder="按名字搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { Timer } from '@element-plus/icons-vue';
import type { User } from "@/api/interface/index";
import { getUserList } from "@/api/modules/user";
import { computed, onBeforeMount, ref, watch } from 'vue';


const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

// 数据源
const tableData: User[] | any = ref([]);
// 筛选后的数据
const filterData: User[] | any = ref([]);
const search = ref('');


watch(search, () => {
  filterData.value = tableData.value.filter(
  ( data: { name: string; }) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
},{immediate: true})

const getUserLists = async () => {
  let {data} = await getUserList();
  // console.log(data);
  tableData.value.push(...data.userList);
  filterData.value.push(...tableData.value);
}

onBeforeMount(() => {
  getUserLists();
})

</script>


<style lang="less" scoped>

</style>