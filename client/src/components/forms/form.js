// @flow
import React, { Component } from 'react';

type Props = {
    validationType?:"formsubmit"|"inputchange"|"inputblur",
    onSubmit?:(formData: any)=>void,
    fieldsData?:any,
    children?: any
}

type State = {
    data: any
}

class Form extends Component<Props, State>{
    constructor(props: Props){
        super(props);

        this.state = {
            data: {}
        }
        console.log(props)
    }

    handleSubmit(evt: Event):void{
        evt.preventDefault();
    }

    render(){
        let {children} = this.props;
        return <form onSubmit={this.handleSubmit}>
            {children}
        </form>
    }
}

export default Form