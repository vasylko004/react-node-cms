import React, { Component } from 'react';
import Form from './form';
import TextField from '../inputs/text-filed';
import Button from '../buttons';
import CheckBox from '../inputs/checkbox';

class SignInForm extends Component{

    render(){
        return (<div  className="card-form">
            <Form>
                <p className="form-title p-b5"> Sign In </p>
                <TextField name="email" type="email" label="Email" />
                <TextField name="password" type="password" label="Password" />
                <CheckBox name="remember_me" label="Remember Me"  />
                <div className="center-align p-t5">
                    <Button size="large"> Submit </Button>
                </div>

            </Form>
        </div>);
    }
}


export default SignInForm;