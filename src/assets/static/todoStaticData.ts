import type { Todo } from "@/stores/interface";
import { nanoid } from 'nanoid';



const myday: string[] = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

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

export default makeTodos;