// @flow
import React, { Component } from 'react';
import Joi from '@hapi/joi';
import Form, {type DataType, validateData} from './form';
import TextField from '../inputs/text-filed';
import Button from '../buttons';

type State = {
    data: {
        username: DataType,
        email: DataType,
        first_name: DataType,
        last_name: DataType,
        password: DataType,
        password_repeat: DataType
    }
}

class SignUpFrom extends Component<{}, State>{
    constructor(props: {}){
        super(props);

        this.state = {
            data:{
                username:{
                   validation: Joi.string().min(3).max(30).required(),
                   error: false
                },
                email: {
                    validation: Joi.string().email({ minDomainSegments: 2 }),
                    error: false
                },
                first_name: {
                    validation: Joi.string().min(3).max(30),
                    error: false                    
                },
                last_name: {
                    validation: Joi.string().min(3).max(30),
                    error: false                    
                },
                password: {
                    validation: Joi.string().required(),
                    error: false                    
                },
                password_repeat: {
                    validation: Joi.string().required(),
                    error: false                    
                }
            }
        }
    }

    handleSubmit(DATA:{}):void{
        let {data} = this.state
        /* */
        let result = validateData(DATA, data);
        this.setState({
            data: data
        });
        if(result.hasAnyError){
            
        }else{

        }
    }

    render(){
        const handleSubmit = this.handleSubmit.bind(this);
        let {data} = this.state;
        return <div className="card-form">
            <Form onSubmit={handleSubmit} >
                <p className="form-title p-b5"> Sign Up </p>
                <TextField name="username" label="Username" validation={data.username.validation} isInvalid={data.username.error} />
                <TextField name="email" type="email" label="Email" validation={data.email.validation} isInvalid={data.email.error}  />
                <TextField name="first_name" label="First Name" validation={data.first_name.validation} isInvalid={data.first_name.error} />
                <TextField name="last_name" label="Last Name" validation={data.last_name.validation} isInvalid={data.last_name.error} />
                <TextField name="password" type="password" label="Password" validation={data.password.validation}isInvalid={data.password.error} />
                <TextField name="password_repeat" type="password" label="Repeat Password" validation={data.password_repeat.validation} isInvalid={data.password_repeat.error} />
                <div className="center-align p-t5">
                    <Button size="large"> Submit </Button>
                </div>
            </Form>
        </div>
    }
}

export default SignUpFrom;