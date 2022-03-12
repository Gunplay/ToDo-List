import React, {Component} from 'react';


import AppHeader from '../app-header';
import SearchPanel from '../seacrh-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';


import './app.css';
// import todoDate from "./index";

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch'),
            // {label: 'Drink Coffee', important: false, id: 1},
            // {label: 'Make Awesome App', important: true, id: 2},
            // {label: 'Have a lunch', important: false, id: 3}
                    ],
        term: '',
        filter: 'all' // active, all, done
    };

    createTodoItem  (label) {
        return {
            label,
            import: false,
            done: false,
            id: this.maxId++
}
}


    deleteItem = (id) => {
        // console.log(id);
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            // splice возращает тот элемент который удалили
          // todoData.splice(idx, 1);
          // return {
          //     todoData: todoData
          // };
            // [a, b, c, d, e]
            // [a, b,  d, e]
            // Метод slice не изменяет содержимое - просто копирует элементы
            // const before = todoData.slice(0, idx);
            // const after = todoData.slice(idx + 1);

            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];



            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        //console.log('Added', text);

        // generation id ?
        const newItem =  this.createTodoItem(text);
        // add element in array ?
        this.setState(({todoData}) => {

            const newArray = [
                ... todoData,
                newItem
            ];

                return {
                    todoData: newArray
                };
        });

    };

    toggleProperty  (arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        // 1. update object
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName]};
        // 2. construct
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];


}

    onToggleImport = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }

        });
    };


    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }

        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    onFilterChange = (filter) => {
        this.setState({filter});
    };


    search(items, term) {

        if (term.length === 0) {
            return items;
        }

       return items.filter((item) => {
           return item.label
                    .indexOf(term
                   .toLowerCase()) > -1;
        });
    }

    filter(items, filter) {

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render () {

        const {todoData, term, filter } = this.state;

        const visibleItems = this.filter(
            this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel
                    onSearchChange={ this.onSearchChange}/>
                    <ItemStatusFilter

                        filter={filter}
                         onFilterChange={ this.onFilterChange}
                    />
                </div>

                <TodoList

                           todos={visibleItems}
                          onDeleted = { this.deleteItem}
                           onToggleImport={this.onToggleImport}
                           onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>


        );
    }

};

