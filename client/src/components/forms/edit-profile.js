// @flow
import React, { Component } from 'react';
import Joi from '@hapi/joi';
import Form, {type DataType, validateData} from './form';
import { type STATUSES, type RequestSignUP, type USER } from '../../constants';
import TextField from '../inputs/text-filed';
import CheckBox from '../inputs/checkbox';
import Button from '../buttons';
import UploadFile from '../inputs/file-upload';
import SelectInput from '../inputs/select';

type State = { 
    data: {  
        email: DataType,
        firstName: DataType,
        lastName: DataType,
        password: DataType,
        password_repeat: DataType,
        role: DataType,
        verified: DataType
    },
    attachment: File | null
}

type Props = {
    status?: STATUSES,
    userData?: USER,
    onSubmit?: (data: FormData)=>void
}

class EditProfileForm extends Component<Props,State>{
    state:State = {
        data: {
            email: {
                validation: Joi.string().email({ minDomainSegments: 2 }),
                error: false
            },
            firstName: {
                validation: Joi.string().min(3).max(30),
                error: false                    
            },
            lastName: {
                validation: Joi.string().min(3).max(30),
                error: false                    
            },
            password: {
                validation: Joi.string().optional().allow(""),
                error: false                    
            },
            password_repeat: {
                validation: Joi.string().allow("").optional(),
                error: false                    
            },
            role: {
                validation: Joi.number(),
                error: false
            },
            verified: {
                validation: Joi.boolean(),
                error: false
            }
        },
        attachment: null
    }

    handleSubmit(DATA:RequestSignUP):void{
        let {data, attachment} = this.state
        /* */
        if(DATA.verified && DATA.verified.toString() === "on"){ DATA.verified = true; }else{ DATA.verified = false; }
        DATA.role = parseInt(DATA.role);
        //console.log(DATA);
        let result = validateData(DATA, data);
        if( DATA.password === DATA.password_repeat ){
            data.password_repeat.error = false;
        }else{
            data.password_repeat.error = true;
        }

        this.setState({
            data: data
        });

        if(!result.hasAnyError){
            let formData: FormData = new FormData();
            formData.append("email", DATA.email);
            formData.append("firstName", DATA.firstName);
            formData.append("lastName", DATA.lastName);
            if(DATA.password){
                formData.append("password", DATA.password);
            }
            if(attachment){
                formData.append("avatar", attachment);
            }
            if(DATA.verified) formData.append("verified", DATA.verified.toString())
            if(DATA.role) formData.append("role", DATA.role.toString());
            if(this.props.onSubmit) this.props.onSubmit(formData);
        }
    }

    handleChooseFile(file: File){
        this.setState({attachment: file});
    }
 
    render(){
        let handleSubmit = this.handleSubmit.bind(this);
        const { status, userData } = this.props;
        let { data } = this.state;
        let  handleChooseFile = this.handleChooseFile.bind(this);
        //if(userData) console.log(userData.role);
        return <div>
            <Form onSubmit={handleSubmit} status={ status||0 } >
                <TextField name="email" type="email" label="Email" value={userData?userData.email:""} validation={data.email.validation} isInvalid={data.email.error}  />
                <TextField name="firstName" label="First Name" value={userData?userData.firstName:""}  validation={data.firstName.validation} isInvalid={data.firstName.error} />
                <TextField name="lastName" label="Last Name" value={userData?userData.lastName:""} validation={data.lastName.validation} isInvalid={data.lastName.error} />
                <TextField name="password" type="password" label="Password" validation={data.password.validation} isInvalid={data.password.error} />
                <TextField name="password_repeat" type="password" label="Repeat Password" validation={data.password_repeat.validation} isInvalid={data.password_repeat.error} />
                <UploadFile name="avatar" label="Avatar" onChange={handleChooseFile} />
                <CheckBox name="verified" label="Verified" type="switch" checked={userData?userData.verified:false} disabled={userData?(userData.role!==0):true}  />
                <SelectInput name="role" label="Role" value={userData?userData.role.toString():""} disabled={userData?(userData.role!==0):true} data={[{
                    name: "Administator",
                    value: "0"
                },{
                    name: "Editor",
                    value: "1"
                }]} placeholder="Select options" />
                <div className="center-align p-t5">
                    <Button size="large"> Submit </Button>
                </div>
            </Form>
        </div>
    }
}

export default EditProfileForm;