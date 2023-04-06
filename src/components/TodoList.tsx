import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { useStore } from "effector-react";

import $store from "../store";
// Todo list that show list with map
function TodoListItems() {
    const store = useStore($store)
  return (
    <>
      {store.todos.map((todo) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox />
          <Input mx={2} value={todo.text} />
          <Button>Delete</Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;
