//@flow
import React,{ Component } from 'react';

type Props = {
    type?: string,
    children?: any,
    size?: "std"|"large"
}

class Button extends Component<Props,any>{

    render(){
        const { children, size } = this.props;
        let classes = "waves-effect waves-light";
        if(size === 'large'){
            classes += " btn-large";
        }else{
            classes += " btn";
        }
        return (<button className={classes}> { children } </button>);
    }
}

export default Button;