import { defineStore } from 'pinia';
import type { Todo, TodosState, Range } from '../interface';
import { makeTodosPlus, myday } from "@/assets/static/todoStaticData";


// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useTodoStore = defineStore(
  'todoState',
  {
    state: (): TodosState => ({
      allTodos: makeTodosPlus(),
      // 获取了allTodos中具体周几的引用对象
      todayTodoList: [],
      todoFulfillList: [],
      day: 7// 初始值为7，需要更新
    }),
    getters: {
      // 获取待办事件
      todoListGet(): Todo[] {
        if (this.day === 7) {
          // 获取周几
          const today = new Date().getDay();
          this.day = today as any;
        }
        // 按选择的日期更新数据
        let weekDay = myday[this.day as number];
        this.todayTodoList = this.allTodos[weekDay];
        console.log('todoListGet调用了');

        // 更新 todoFulfillList
        this.todoFulfillList = []
        this.todayTodoList.forEach(item => {
          if (item.fulfill && !this.todoFulfillList.includes(item)) {
            this.todoFulfillList.push(item);
          }
        });

        return this.todayTodoList;
      },

      // 统计周一到周日已完成和未完成的事件
      countAlltodos() {
        console.log("countAlltodos");
        
        // 1. 定义输出格式
        let todosList: any = [];
        let fulfillList: any = [];
        // 2. 按日期分组统计
        for (let index = 0; index < 7; index++) {
          let weekDay = myday[index];
          let todos = 0;
          let fulfills = 0;

          const temp = this.allTodos[weekDay] as Todo[]
          temp.forEach(item => {
            if (item.fulfill) {
              fulfills++;
            } else {
              todos++;
            }
          })

          todosList.push(todos);
          fulfillList.push(fulfills);
        }

        // 3. 返回数组
        return [todosList, fulfillList]
      }
    },
    actions: {
      // 选择日期，并更新对应的todoFulfillList
      selectDay(newday: Range) {
        // 切换到其他选项卡时，重置 todoFulfillList
        if (newday !== this.day) {
          this.todoFulfillList = []
          this.day = newday;
        }
      },
      addTodo(todo: Todo) {
        this.todayTodoList.unshift(todo);
      },
      // 清除单个todo
      removeTodo(id: string) {
        console.log(this.allTodos[this.day]);
        let weekDay = myday[this.day]
        this.allTodos[weekDay] = (this.allTodos[weekDay] as Todo[]).filter(item => item.id !== id);
        // this.todayTodoList = this.todayTodoList.filter(item => item.id !== id);
        this.todoFulfillList = this.todoFulfillList.filter(item => item.id !== id);
      },
      // 更新列表，将完成的和未完成的分组保存
      updateStore() {
        this.todayTodoList.forEach(item => {
          if (item.fulfill && !this.todoFulfillList.includes(item)) {
            this.todoFulfillList.push(item);
          }
        });
        this.todayTodoList = this.todayTodoList.filter(item => !item.fulfill);
        this.todoFulfillList = this.todoFulfillList.filter(item => item.fulfill);
      },
      // 显示所有待办
      showAllTodos() {
        this.todoFulfillList.forEach(item => {
          if (!this.todayTodoList.includes(item)) {
            this.todayTodoList.push(item);
          }
        })
      },
      // 编辑某项todo
      editTodo(todo: Todo) {
        this.todayTodoList.forEach(
          item => {
            if (todo.id === item.id) {
              item.content = todo.content
            }
          }
        )
      }
    },
    // 持久化
    persist: true
  })