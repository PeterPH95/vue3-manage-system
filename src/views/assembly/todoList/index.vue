<template>
  <div class="todolist">
    <el-row style="height: 15%;">
      <h1 class="title">Today's Todos</h1>
    </el-row>
    <el-row :gutter="20" style="height: 80%;">
      <el-col :span="8">
        <div class="l-content" style="height: 100%;">
          <div class="todo-head">
            <h1>待办事件</h1>
            <div>
              <input 
                type="text" 
                v-focus placeholder="请输入待办事项" 
                v-model="todo.content"
                @keydown.enter="addTodo(todo)"
              >
              <button @click="addTodo(todo)">+添加</button>
            </div>
          </div>
          <ul class="todos">
            <li class="todo-container" v-for="item in todoLists" :key="item.id">
              <input class="mark" type="checkbox" v-model="item.fulfill">
              <p class="todo-content" :class="{todofinish: item.fulfill}">{{item.content}}</p>
              <button class="delete" @click="delTodo(item.id)">删除</button>
            </li>
          </ul>
          <div class="todo-bottom">
            <button class="button" @click="finishMark()">完成</button>
            <button class="button" @click="clearMark()">移除</button>
            <button class="button" @click="showAll()">显示全部</button>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="r-content" style="height: 100%; width: 100%;">
          <h1>完成量统计</h1>
          <TodoChart :todoLists="todoLists" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from "@/stores/modules/todo";
import type { Todo } from "@/stores/interface/index";
import { nanoid } from 'nanoid';
import { computed, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import TodoChart from './TodoChart.vue';

const todoStore = useTodoStore();
const todoLists = computed(() => todoStore.todoList);

// 初始化todo
const todo = ref<Todo>({
  id: '',
  content: '',
  day: 0,
  fulfill: false
})


// 添加一个 todo
function addTodo(todo: Todo){
  if (!todo.content) {
    ElMessage.error("请输入内容!");
    return;
  }
  const id = nanoid();
  const day = new Date().getDay();
  todoStore.addTodo({
    id,
    content: todo.content,
    day,
    fulfill: todo.fulfill
  });
  // 添加完清除上个内容
  todo.content = '';
}

// 删除一个 todo 
function delTodo(id:string) {
  todoStore.removeTodo(id);
  ElMessage.success("删除成功！");
}

// 完成mark的所有 todos，并保存
function finishMark() {
  todoStore.updateStore();
}

// 移除选中的 todos
function clearMark() {
  todoStore.clearFulfill();
}

// 显示所有待办
function showAll() {
  todoStore.showAllTodos();
}

// 检测单个事项的完成情况
watch(todoStore, ()=>{
  
})

// 自定义获取焦点指令
const vFocus = {
  mounted(el: HTMLElement) {
    el.focus();
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>