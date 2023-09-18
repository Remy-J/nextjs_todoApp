import { gql } from '@apollo/client'

// GraphQL query to retrieve the list of all todos
export const GET_TODOS = gql`
  query {
    todos {
      id
      userID
      title
      description
      imageURL
      completed
    }
  }
`

// GraphQL query to retrieve a todo based on its ID
export const GET_TODO_BY_ID = gql`
  query GetTodoById($id: Int!) {
    todo(id: $id) {
      id
      userID
      title
      description
      imageURL
      completed
    }
  }
`

// GraphQL mutation to create a new todo
export const CREATE_TODO = gql`
  mutation CreateNewTodo($todo: CreateTodo!) {
    createTodo(todo: $todo) {
      id
      userID
      title
      description
      imageURL
      completed
    }
  }
`

// GraphQL mutation to update existing todo
export const UPDATE_TODO = gql`
  mutation UpdateExistingTodo($todo: UpdateTodo!) {
    updateTodo(todo: $todo) {
      id
      userID
      title
      description
      imageURL
      completed
    }
  }
`

// GraphQL mutation to delete a todo based on its ID
export const DELETE_TODO = gql`
  mutation DeleteTodoById($id: Int!) {
    deleteTodo(id: $id) {
      success
    }
  }
`
