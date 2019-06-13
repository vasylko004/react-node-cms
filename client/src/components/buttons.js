//@flow
import React,{ Component } from 'react';

type Props = {
    type?: string,
    children?: any,
    size?: "std"|"large",
    classes?: string
}

class Button extends Component<Props,any>{

    render(){
        const { children, size, classes } = this.props;
        let _classes = "waves-effect waves-light";
        if(classes){
            _classes += classes;
        }
        if(size === 'large'){
            _classes += " btn-large";
        }else{
            _classes += " btn";
        }
        return (<button className={_classes}> { children } </button>);
    }
}

export default Button;