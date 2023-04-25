import { defineStore } from 'pinia';
import type { Todo, TodosState } from '../interface';
import todoStaticData from "@/assets/static/todoStaticData";


// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useTodoStore = defineStore(
  'todoState',
  {
    state: (): TodosState => ({
      todoList: todoStaticData(),
      todoFulfillList: []
    }),
    getters: {
      // 获取代办事件
      todoListGet: state => state.todoList,
    },
    actions: {
      addTodo(todo: Todo) {
        this.todoList.unshift(todo);
      },
      // 清除单个todo
      removeTodo(id: string) {
        this.todoList = this.todoList.filter(item => item.id !== id);
        this.todoFulfillList = this.todoFulfillList.filter(item => item.id !== id);
      },
      // 清除选中的所有
      clearFulfill() {
        this.todoList = this.todoList.filter(item => !item.fulfill);
      },
      // 更新列表，将完成的和未完成的分组保存
      updateStore() {
        this.todoList.forEach(item => {
          if (item.fulfill && !this.todoFulfillList.includes(item)) {
            this.todoFulfillList.push(item);
          }
        });
        this.todoList = this.todoList.filter(item => !item.fulfill);
        this.todoFulfillList = this.todoFulfillList.filter(item => item.fulfill);
      },
      // 显示所有待办
      showAllTodos(){
        this.todoFulfillList.forEach(item => {
          if (!this.todoList.includes(item)) {
            this.todoList.push(item);
          }
        })
      },
      // 编辑某项todo
      editTodo(todo: Todo){
        this.todoList.forEach(
          item => {
            if (todo.id === item.id) {
              item.content = todo.content
            }
          }
        )
      }
    },
    // 持久化
    persist: false
  })