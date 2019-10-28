// @flow
import React, { Component, type Element } from 'react';
import { Validations, type ValidatorPattern } from '../../utils/validations';
import { type STATUSES } from '../../constants';

type Props = {
    validationType?:"formsubmit"|"inputchange"|"inputblur",
    onSubmit?:(data:any)=>void,
    fieldsData?:any,
    children?: Array<Element<any>>,
    status: STATUSES
}

type DataForm = {
    name: string,
    value: string | number | boolean | File | null,
    validation?: ValidatorPattern,
    isValid: boolean,
    el: Element<any>
}

type State = {
    data: Array<DataForm>
}

export type DataType = {
    validation: ValidatorPattern,
    errorMessage?: string,
    error: boolean
}

export type VerifiedFormData = {
    name:string, 
    value:string | number | boolean | File | null
}

export function validateData(DATA:{}, validate: {}): {data:{}, hasAnyError:boolean}{
    let hasAnyError:boolean = false;
    let validator = new Validations({});
    for(let prop in DATA){
        if(validate[prop]){
            const res = validator.validate(DATA[prop], validate[prop].validation);
            // 
            if(!res.result){
                validate[prop].error = true;
                if(res.errorMessage) validate[prop].errorMessage = res.errorMessage.replace("[field]", prop);
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
        //
        if(props.children){
            for (let i = 0; i < props.children.length; i++) {
                let element:Element<any> = props.children[i];
                let eProps:{ name?:string, className?: string, validation?: ValidatorPattern } = element.props
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
        /* */
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
        let { children, status } = this.props;
        //
        const handleSubmit = this.handleSubmit.bind(this);
        /*
        */
        return <form ref={(input)=>{ this.formRef = input }} onSubmit={handleSubmit}>
            {status===1?(<div className="form-panding-response">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>
            </div>):(<span></span>)}
            {status===2?(<div className="notice_success"> Success </div>):(<span></span>)}
            {status===3?(<div className="notice_error"> Error </div>):(<span></span>)}
            {children}
        </form>
    }
}

export default Form