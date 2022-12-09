<template>
  <div>
    <el-card class="loginfo">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
        <h2 class="title">系统登录</h2>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" placeholder="用户名：admin / user" :prefix-icon="User" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" show-password placeholder="密码：123456" :prefix-icon="Lock" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(ruleFormRef)" >登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { Lock, User } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { useGlobalStore } from "@/stores";
import { initDynamicRouter } from "@/router/modules/dynamicRouter";
import { loginApi } from "@/api/modules/login";

// const {proxy} = getCurrentInstance() as any;
const router = useRouter();
const globalStore = useGlobalStore();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({ username: 'admin', password: '123456'});

const rules = reactive<FormRules>({
  username: [ { required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [ { required: true, trigger: 'blur', message: '请输入密码' } ]
});


const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate( async valid => {
    if (!valid) return;

    // 1.执行登录接口 返回两类的token（管理员|用户）
    const {data} = await loginApi(ruleForm);
    globalStore.setToken(data.access_token)
    
    // 2.添加动态路由
    await initDynamicRouter();

    // 3.清除上次的登录记录

    // 4.跳转到首页
    router.push('/home');
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

onMounted(() => {
  // 监听enter 调用登录
  document.onkeydown = (e:any) => {
    // window.event 兼容IE浏览器
    e = window.event || e    
    if (e.code === 'Enter' || e.code === "NumpadEnter" || e.code === "enter") {
      login(ruleFormRef.value);
    }
  }
})
</script>

<style lang="less" scoped>
.loginfo {
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
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