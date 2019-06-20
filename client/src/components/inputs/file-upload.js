//@flow
import React, { Component } from 'react';
//import Joi from '@hapi/joi';

type Props = {
    classes?: string,
    placeholder?: string, 
    label: string,
    helperText?: string,
    name: string,
    errorMessage?: string,
    isInvalid?: boolean,
    disabled?: boolean,
    onChange?: (file:File)=>void,
    accept?: "images" | "pdf" | "texts" | "documents"
}

type State = {
    fileName: string
}

class UploadFile extends Component<Props,State>{
    inputRef: ?HTMLInputElement;

    constructor(props: Props){
        super(props);
        this.state = {
            fileName: ""
        }
        this.inputRef = null;
    }

    handleChange(evt: SyntheticInputEvent<HTMLInputElement>):void{
        const input = evt.currentTarget
        let file:File;
        if(input.files){
            file = input.files[0];
            console.log(input.files);
            this.setState({
                fileName: file.name
            })

            if(this.props.onChange) this.props.onChange(file);
        }
    }

    handleChooseFile():void{
        if(this.inputRef) this.inputRef.click()
    }

    generateAcceptForInput(accept: string | void): string{
        let _accept:string = "";
        switch(accept){
            case "text":
                _accept = "text/plain, text/csv"
            break;
            case "pdf":
                _accept = "application/pdf"
            break;
            case "documents":
                _accept = "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint"
            break;
            default:
                _accept = "image/*";
            break;
        }

        return _accept;
    }

    render(){
        let { classes, label, accept } = this.props;
        let _accept = this.generateAcceptForInput(accept);
       
        if(!classes) classes = "";
        let { fileName } = this.state;
        const handleChange:(evt: SyntheticInputEvent<HTMLInputElement>)=>void = this.handleChange.bind(this);
        const handleChooseFile: ()=>void = this.handleChooseFile.bind(this);

        return <div className={ "input-field " + classes}>
            <label className="file-label">{label}</label>
            <div className="upload-header">
                <div><button className="file-button btn grey lighten-2 " type="button" onClick={handleChooseFile}> File </button></div>
                <div> <p> {fileName} </p> </div>
            </div>
            <input type="file" className="hidden" accept={_accept} onChange={handleChange}  ref={(input)=>{ this.inputRef = input }} />
        </div>
    }
}

export default UploadFile;