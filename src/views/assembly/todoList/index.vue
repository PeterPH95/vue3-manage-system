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
                class="new-todo"
                v-focus placeholder="请输入待办事项" 
                v-model="todo.content"
                @keydown.enter="addTodo(todo)"
              >
              <button @click="addTodo(todo)">+添加</button>
            </div>
          </div>
          <ul class="todos">
            <li class="todo-container" 
              v-for="item in todoLists" 
              :key="item.id"
              @dblclick="editTodo(item)"
              draggable="true"
            >
              <input class="mark" type="checkbox" v-model="item.fulfill">
              <!-- 双击显示的编辑框 -->
              <input 
                class="edit"
                type="text"
                v-model="editedTodo.content"
                v-if="item.id === editedTodo.id"
                v-focus
                @blur="doneEdit(editedTodo)"
                @keyup.enter="doneEdit(editedTodo)"
                @keyup.esc="cancelEdit()"
              />
              <!-- 双击隐藏 -->
              <label
                class="todo-content" 
                v-else
                :class="{todofinish: item.fulfill}" 
              >
                {{item.content}}
              </label>

              <button class="delete" @click="delTodo(item.id)">删除</button>
            </li>
          </ul>
          <div class="todo-bottom">
            <el-select v-model="theDay" placeholder="请选择周几" style="width: 30%;margin-right: 5px;"  @change="selectDay">
              <el-option
                v-for="item in weekDay"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
import type { Todo, Range } from "@/stores/interface/index";
import { nanoid } from 'nanoid';
import { computed, reactive, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import TodoChart from './TodoChart.vue';

const todoStore = useTodoStore();
const todoLists = computed(() => todoStore.todoListGet);

// 初始化newtodo
const todo = ref<Todo>({
  id: '',
  content: '',
  day: 0,
  fulfill: false
})

// 双击编辑的todo
const editedTodo = ref<Todo>({
  id: '',
  content: '',
  day: 0,
  fulfill: false
})

// 周几信息
const weekDay = reactive(
  [
    {
      value: 0,
      label: '周日'
    }, {
      value: 1,
      label: '周一'
    }, {
      value: 2,
      label: '周二'
    }, {
      value: 3,
      label: '周三'
    }, {
      value: 4,
      label: '周四'
    }, {
      value: 5,
      label: '周五'
    }, {
      value: 6,
      label: '周六'
    }
  ]
)

// 选择的时间，默认今天
const theDay = ref('')

// 挑选触发的函数
function selectDay(val: Range) {
  todoStore.selectDay(val);
}



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

// 检测单个事项的完成情况
watch(todoStore, ()=>{
  
})

// 自定义获取焦点指令
const vFocus = {
  mounted(el: HTMLElement) {
    el.focus();
  }
}

// 双击显示编辑框
function editTodo(todo: Todo){
  editedTodo.value = {...todo}
}

// 将编辑的内容更新到todolist
function doneEdit(todo: Todo){
  todoStore.editTodo(todo)
  // 重置编辑的内容
  cancelEdit()
}

// 重置或取消编辑
function cancelEdit() {
  editedTodo.value = {
    id: '',
    content: '',
    day: 0,
    fulfill: false
  }
}

</script>

<style lang="less" scoped>
@import "./index.less";
</style>