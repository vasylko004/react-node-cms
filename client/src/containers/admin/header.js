// @flow
import React, {Component} from 'react';
import UserSign from '../../components/user-sign-module';

class Header extends Component<{},{}>{

    render(){
        return (<div>
            <nav>
                <div className="nav-wrapper purple darken-1">
                   <div className="p-l5"> 
                      
                   </div>
                   <div className="right">
                        <UserSign></UserSign>
                   </div>
                </div>
            </nav>
        </div>);
    }
}

export default Header;