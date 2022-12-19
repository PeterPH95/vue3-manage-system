<template>
  <div class="table-container">
    <!-- 操作表格：新增 -->
    <div class="handler">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
      <div>
        <el-input
          v-model="search"
          class="search"
          placeholder="按姓名搜索"
          :prefix-icon="Search"
        ></el-input>
      </div>
    </div>
    <el-table :data="filterData" style="width: 100%" :border="true" stripe lazy>
      <el-table-column label="姓名" width="120" align="center" prop="name" />
      <el-table-column label="性别" width="80" align="center">
        <template #default="scope">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <span>{{ scope.row.gender === 1 ? "女" : "男" }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="80" align="center" prop="age" />
      <el-table-column
        label="出生日期"
        width="200"
        align="center"
        prop="date"
      />
      <el-table-column label="身份证号码" width="220" align="center" prop="id" />
      <el-table-column label="居住地址" align="center" prop="address" />
      <el-table-column width="220" label="操作" align="center">
        <template #default="scope">
          <el-button size="small" :icon="Edit" @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination-block">
      <el-pagination
        background
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <!-- 编辑和新增表单 -->
  <el-dialog v-model="dialogFormVisible" :title="mode ? '新增' : '编辑'">
    <el-form :model="form" ref="ruleFormRef" :rules="rules" :inline="true">
      <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="on" />
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" :value="0" />
          <el-option label="女" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="请选择日期"
          style="width: 100%"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="id">
        <el-input v-model="form.id" placeholder="请输入身份证号码"  />
      </el-form-item>
      <el-form-item label="居住地址" :label-width="formLabelWidth" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址"  />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="handleUser(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import type { User } from "@/api/interface/index";
import { getUserList } from "@/api/modules/user";
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import {
  ElMessage,
  ElMessageBox,
  type FormRules,
  type FormInstance,
} from "element-plus";
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { nanoid } from "nanoid";

// 数据源
const tableData: User[] | any = ref([]);

// 筛选后的数据
const filterData: User[] | any = ref([]);
const search = ref("");

// 模式区分：新增(true)和编辑(false)
const mode = ref(false);

// 表单可见否
const dialogFormVisible = ref(false);
const formLabelWidth = "120px";

// 分页
const pageSize = ref(20);
const currentPage = ref(1);

// 新增表单
const ruleFormRef = ref<FormInstance>();
let form: any = reactive({
  guid: "",
  id: "",
  name: "",
  gender: 0,
  age: 18,
  date: "",
  address: "",
});

// 表单校验规则
const rules = reactive<FormRules>({
  id: [
    { required: true, message: '请输入身份证', trigger: 'blur' },
    { min: 18, max: 18, message: '请输入18位', trigger: 'blur' },
  ],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
  date: [{ required: true, message: "请输入生日", trigger: "blur" }],
  address: [{ required: true, message: "请输入地址", trigger: "blur" }],
});

// 新增按钮
const handleAdd = () => {
  mode.value = dialogFormVisible.value = true;
};

// 编辑按钮
const handleEdit = (index: number, row: User) => {
  dialogFormVisible.value = true;
  // 进入编辑模式
  mode.value = false;
  // 临时赋值
  Object.keys(row).forEach((key) => (form[key] = row[key]));
  // console.log(index, row, form);
};

// 删除按钮
const handleDelete = (index: number, row: User) => {
  ElMessageBox.confirm("此操作将永久删除该文件, 是否继续?", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      tableData.value = tableData.value.filter(
        (item: any) => item.guid !== row.guid
      );
      getList();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      // 取消后重置表单
      form = reactive({});
      ElMessage({
        type: "info",
        message: "操作取消",
      });
    });
  // console.log(index, row);
};

// dialog取消
const cancelEdit = () => {
  dialogFormVisible.value = false;
  form = reactive({});
};

// dialog确认
const handleUser = async (formEl: FormInstance | undefined) => {
  dialogFormVisible.value = true;
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      // 隐藏dialog
      dialogFormVisible.value = false;
      // console.log('submit!');
      if (!mode.value) {
        // 编辑时
        filterData.value.forEach((item: any) => {
          if (item.id === form.id) {
            Object.keys(item).forEach((key) => (item[key] = form[key]));
          }
        });
      } else {
        // 新增时
        let temp = reactive({ guid: nanoid(), ...form });
        tableData.value.unshift(temp);
      }

      // 重置表单
      form = reactive({});
      // 重新获取列表
      getList();
    } else {
      ElMessage.error("请填写完整");
    }
  });
};

// 搜索获取当前列表数据
const getList = () => {
  filterData.value = tableData.value.filter(
    (item: { name: string }, index: number) => {
      if (!search.value) {
        //无搜索，按分页查找
        if (
          index >= pageSize.value * (currentPage.value - 1) &&
          index < pageSize.value * currentPage.value
        ) {
          return true;
        }
        return false;
      }
    }
  );
};

// 按名字筛选数据
watch(
  search,
  () => {
    filterData.value = tableData.value.filter(
      (data: { name: string }) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    );
  },
  { immediate: true }
);

// 分页
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getUserLists();
  // console.log(`current page: ${val}`);
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getList();
  // console.log(`${val} items per page`)
}

// 获取用户列表
const getUserLists = async () => {
  // 先判断数据条数，数据不够，则发送请求
  while (tableData.value.length < currentPage.value * pageSize.value) {
    let { data } = await getUserList();
    tableData.value.push(...data.userList);
  }
  // console.log(data);
  getList();
};

onBeforeMount(() => {
  getUserLists();
});
</script>

<style lang="less" scoped>
.table-container {
  width: 100%;
  height: 100%;
  padding: 10px 50px;
  background: #fff;
  display: flex;
  flex-direction: column;

  .handler {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

    .search {
      width: 200px;
      margin-right: 8px;
    }
  }

  .el-table {
    height: 80%;
  }

  .pagination-block {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
