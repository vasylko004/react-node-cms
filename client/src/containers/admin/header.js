// @flow
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { type USER} from '../../constants';
import UserSign from '../../components/user-sign-module';

type Props = {
    user: USER | null
}

class Header extends Component<Props,{}>{

    render(){
        let { user } = this.props;
        let name = "";
        if(user && user.firstName){
            name = user.firstName;
        }
        return (<div>
            <nav>
                <div className="nav-wrapper purple darken-1">
                   <div className="p-l5"> 
                      
                   </div>
                   <div className="right">
                        <UserSign username={name}></UserSign>
                   </div>
                </div>
            </nav>
        </div>);
    }
}

export default connect(state=>({
    user: state.users.current
}),dispatch=>({

}))(Header);