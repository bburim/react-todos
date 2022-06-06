import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux";
import { store } from "./storage/store";
import CreateTodoComponent from "./components/CreateTodoComponent";
import TodosListComponent from "./components/TodosListComponent";
import NavComponent from "./components/NavComponent";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="container pb-5">
        <div className="px-1 py-1 my-1 text-center">
          <h1 className="display-5 fw-bold">todos</h1>
        </div>
        <CreateTodoComponent />
        <BrowserRouter>
          <Routes>
            <Route path="/active" element={<TodosListComponent filter="active" />}></Route>
            <Route path="/completed" element={<TodosListComponent filter="completed" />}></Route>
            <Route path="/" element={<TodosListComponent />}></Route>
          </Routes>
          <NavComponent />
        </BrowserRouter>
      </div>
    </Provider>
  )
};

export default App;
