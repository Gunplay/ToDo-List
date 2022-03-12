import React, {Component} from 'react';

import './todo-list-item.css';

// СПОСОБО создания классом, лучше чем функция так как можно хранить состояние объекта (например счётчик)
// export default class TodoListItem extends React.Component

export default class TodoListItem extends Component {
// тоже самое что и создовать CONSTRUCTOR







    // constructor() {
    //     // Делаем вызов родителя Component, спомощью метода super
    //     super();
    //
    //     this.onLabelClick = () => {
    //         console.log(`Done: ${this.props.label}`);
    //     };
    //
    // }


    render () {

        const {label, onDeleted,  onToggleImport, onToggleDone, important, done} = this.props;


        let className = "todo-list-item";
        if (done) {
            className += ' done';
        }

        if (important) {
            className += ' important'
        }

        return (
            <span className={className}>
      <span
          className="todo-list-item-label"


          onClick={onToggleDone}
            >
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImport}>
        <i className="fa fa-exclamation"/>
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDeleted}>
        <i className="fa fa-trash-o" />
      </button>
    </span>
        );
    };
}







// СПОСОБО ЗАДНИЯ ФУНКЦИЕЙ

//
// const TodoListItemFunc = ({ label, important = false }) => {
//
//   const style = {
//     color: important ? 'steelblue' : 'black',
//     fontWeight: important ? 'bold' : 'normal'
//   };
//
//   return (
//     <span className="todo-list-item">
//       <span
//         className="todo-list-item-label"
//         style={style}>
//         {label}
//       </span>
//
//       <button type="button"
//               className="btn btn-outline-success btn-sm float-right">
//         <i className="fa fa-exclamation" />
//       </button>
//
//       <button type="button"
//               className="btn btn-outline-danger btn-sm float-right">
//         <i className="fa fa-trash-o" />
//       </button>
//     </span>
//   );
// };

//export default TodoListItem;
