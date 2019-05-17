// @flow
import React, { Component } from 'react';
import Form from './form';
import TextField from '../inputs/text-filed';
import Button from '../buttons';

class SignUpFrom extends Component<any, any>{
    constructor(props: any){
        super(props);

        this.state = {
            
        }
    }

    render(){
        return <div className="card-form">
            <Form >
                <p className="form-title p-b5"> Sign Up </p>
                <TextField name="name" label="Username"  />
                <TextField name="email" type="email" label="Email" />
                <TextField name="first_name" label="First Name" />
                <TextField name="last_name" label="Last Name" />
                <TextField name="password" type="password" label="Password" />
                <TextField name="password_repeat" type="password" label="Repeat Password" />
                <div className="center-align p-t5">
                    <Button size="large"> Submit </Button>
                </div>
            </Form>
        </div>
    }
}

export default SignUpFrom;