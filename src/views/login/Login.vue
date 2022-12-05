<template>
  <div>
    <el-card class="loginfo">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
        <h2 class="title">系统登录</h2>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="用户名：admin / user" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码：123456" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(ruleFormRef)" :loading="loading">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const {proxy} = getCurrentInstance() as any;
const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const loading = ref(false);

const ruleForm = reactive({ username: '', password: ''});

const rules = reactive<FormRules>({
  username: [ { required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [ { required: true, trigger: 'blur', message: '请输入密码' } ]
});

const getMenu = async (parmas:any) => { 
  let respose = await proxy.$api.getMenu(parmas);
  console.log(respose.message);
  Cookies.set("menu", JSON.stringify(respose.menu));
  Cookies.set("token", respose.token);
  // 动态路由添加时机
  router.push({name: 'home'})
}

const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      // 保存当前角色menu信息和token
      getMenu(ruleForm);
    } else {
      console.log('error submit!');
      return false;
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.loginfo {
  width: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
  padding: 5px;
  box-shadow: 0 0 15px #cac6c6;

  .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    font-weight: bold;
    margin-bottom: 20px;
  }

  .el-form-item {
    width: 80%;
    margin: 15px 0;

    :deep(.el-form-item__content) {
      display: block;
    }
  }
}
</style>