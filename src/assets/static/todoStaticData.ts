import type { Todo, weekTodosState } from "@/stores/interface";
import { nanoid } from 'nanoid';


export const myday: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const makeTodos = () => {
  let todoArr:Todo[] = [];
  let item: Todo = { id: nanoid(), content: '敲代码',  day: 0, fulfill: false };
  todoArr.push(item);
  for (let index = 0; index < 6; index++) {
    let obj: any = {};
    obj.id = nanoid();
    obj.content =  todoArr[index].content +  '+';
    obj.day =  index;
    obj.fulfill = index%2 ? false : true;

    todoArr.push(obj);
  }
  return todoArr;
}


// 按周几分组代办事件
export const makeTodosPlus = () => {
  let allTodoArr:weekTodosState = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  };

  let len = myday.length;
  for (let index = 0; index < len; index++) {
    const key = myday[index];

    let obj: any = {};
    obj.id = nanoid();
    obj.content = key + '-写代码';
    // 0-6 周日-周六
    obj.day =  index;
    obj.fulfill = false;

    allTodoArr[key].push(obj)
  }
  return allTodoArr;
}


export const getTodaysTodo = () => {

}

export default makeTodos;