import React, {Component} from 'react';
import './item-add-form.css';

export default  class ItemAddForm extends Component {

    state = {
        label: ''
    };


    // func вытаскиваем значение по таргету
    onLabelChange = (e) => {
        this.setState({
            label:  e.target.value.toUpperCase()
        });
    };

    onSubmit = (e) => {
        // что бы страниться не перезагружалась
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form className="item-add-form d-flex"
                onSubmit={this.onSubmit}

            >
                <input type="text"
                    className="form-control"
                       onChange={this.onLabelChange}
                       placeholder="What needs to be done"
                       // create controle elem
                       value={this.state.label}
                />
                <button className="btn btn-outline-secondary"
                        >
                    Add Item
                </button >

            </form>
        )
    }
}