// @flow
import React, { Component, type Element } from 'react';
import Joi from '@hapi/joi';

type Props = {
    validationType?:"formsubmit"|"inputchange"|"inputblur",
    onSubmit?:(data:any)=>void,
    fieldsData?:any,
    children?: Array<Element<any>>
}

type DataForm = {
    name: string,
    value: string | number | boolean | File | null,
    validation?: Joi.String | Joi.Email | Joi.Number | Joi.Any,
    isValid: boolean,
    el: Element<any>
}

type State = {
    data: Array<DataForm>
}

export type DataType = {
    validation: Joi.Any | Joi.String | Joi.Email | Joi.Number,
    error: boolean
}

export type VerifiedFormData = {
    name:string, 
    value:string | number | boolean | File | null
}

export function validateData(DATA:{}, validate: {}): {data:{}, hasAnyError:boolean}{
    let hasAnyError:boolean = false;
    for(let prop in DATA){
        if(validate[prop]){
            const result = Joi.validate(DATA[prop], validate[prop].validation);
            if(result.error){
                validate[prop].error = true;
                hasAnyError = true;
            }else{
                validate[prop].error = false;
            }
        }
    }

    return {data: validate, hasAnyError:hasAnyError}
}

class Form extends Component<Props, State>{
    formRef: HTMLFormElement|null;

    constructor(props: Props){
        super(props);

        this.state = {
            data: []
        }
        // console.log(props)
        if(props.children){
            for (let i = 0; i < props.children.length; i++) {
                let element:Element<any> = props.children[i];
                let eProps:{ name?:string, className?: string, validation?: Joi.String | Joi.Email | Joi.Number | Joi.Any } = element.props
                if(eProps.name && eProps.validation){
                    this.state.data.push({
                        name: eProps.name,
                        value: null,
                        validation: eProps.validation,
                        isValid: true,
                        el: element
                    })
                }
            }
        }
        this.formRef = null;
        console.log(this.state.data)
    }

    handleSubmit(evt: Event):void{
        evt.preventDefault();
        let data:any = {}
        if(this.formRef) {
            for (let i = 0; i < this.formRef.elements.length; i++) {
                const element:any = this.formRef.elements[i];
                if(element.name){
                    data[element.name] = element.value;
                }                
            }   
        }
        /*let { data } = this.state;
        let invalidfields:any = {}
        let verifiedData:Array<VerifiedFormData> = []
        let hasAnyError:boolean = false;
        for (let i = 0; i < data.length; i++) {
            const result = Joi.validate(data[i].value, data[i].validation);
            if(result.error){
                data[i].isValid = false;
                invalidfields[data[i].name] = true;
                hasAnyError = true;
                //data[i].el.setAsInvalid();
            }else{
                invalidfields[data[i].name] = false;

                //data[i].el.setAsValid();
                verifiedData.push({
                    name: data[i].name,
                    value: data[i].value
                });
            }
        }

        if(hasAnyError){
            this.setState({data: data});
            if(this.props.onSubmit){
                this.props.onSubmit(null, invalidfields);
            }
        }else{
            if(this.props.onSubmit){
                this.props.onSubmit(verifiedData, null);
            }
        }*/
        if(this.props.onSubmit) this.props.onSubmit(data);
    }

    handleFieldUpdate(index: number):(value: string|number|boolean|File)=>void{
        return (value)=>{
            let { data } = this.state;
            data[index].value = value;
            this.setState({
                data: data
            });
        }
    }

    render(){
        let { children } = this.props;
        //let { data } = this.state;
        const handleSubmit = this.handleSubmit.bind(this);
        /*for (let i = 0; i < data.length; i++) {
            if(!data[i].isValid){
                data[i].el.props.isInvalid = !data[i].isValid;
            }
            //console.log(data[i].el);
        }*/
        return <form ref={(input)=>{ this.formRef = input }} onSubmit={handleSubmit}>
            {children}
        </form>
    }
}

export default Form