import React, { Component } from 'react';
import { Consumer} from "../../context";
import TextInputGroup from '../layout/TextInputGroup'
import axios from 'axios';

class AddContact extends Component {
    state = {
        name:'',
        email:'',
        phone:'',
        errors: {}
    };

    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const {name, email, phone} = this.state;

        //Check for Errors
        if(name === ''){
            this.setState({errors:{name:'Name is required'}});
            return;
        }
        if(email === ''){
            this.setState({errors:{email:'Email is required'}});
            return;
        }
        if(phone === ''){
            this.setState({errors:{phone:'Phone is required'}});
            return;
        }

        const newContact = {
            name,
            email,
            phone
        };

       const res = await axios
            .post(`https://jsonplaceholder.typicode.com/users`, newContact);
            dispatch({type: 'ADD_CONTACT', payload: res.data});


        // Clear fields after submit
        this.setState({
            name:'',
            email:'',
            phone:'',
            errors: {}
        });

        // Redirects to home page after a contact have been added.
        this.props.history.push('/');
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render() {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {value => {
                    const{ dispatch } = value;
                    return(
                        <div>
                            <div className="card mb-3">
                                <div className="card-header">Add Contacts</div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                       <TextInputGroup
                                       label="Name"
                                       name="name"
                                       placeholder="Enter name..."
                                       value={name}
                                       onChange={this.onChange}
                                       error={errors.name}
                                       />
                                        <TextInputGroup
                                            label="Email"
                                            name="email"
                                            placeholder="Enter email..."
                                            value={email}
                                            onChange={this.onChange}
                                            type="email"
                                            error={errors.email}
                                        />
                                        <TextInputGroup
                                            label="Phone"
                                            name="phone"
                                            placeholder="Enter phone..."
                                            value={phone}
                                            onChange={this.onChange}
                                            error={errors.phone}
                                        />
                                        <input type="submit"
                                               value="add Contact"
                                               className="btn btn-light btn-block"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default AddContact;