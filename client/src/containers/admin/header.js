// @flow
import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { type USER} from '../../constants';
import UserSign from '../../components/user-sign-module';
import MainSidebar from './main-sidebar';

type Props = {
    user: USER | null
}

type State = {
    sidebarShow: boolean
}

class Header extends Component<Props, State>{
    state = {
        sidebarShow: false
    }

    sidebarToggle(event:Event):void{
        event.preventDefault();
        let { sidebarShow } = this.state;
        this.setState({
            sidebarShow: !sidebarShow
        })
    }

    handleHideSidebar():void{
        this.setState({
            sidebarShow: false
        })
    }

    render(){
        let { user } = this.props;
        let name = "";
        if(user && user.firstName){
            name = user.firstName;
        }
        let { sidebarShow } = this.state;
        let sidebarToggle = this.sidebarToggle.bind(this);
        let handleHideSidebar = this.handleHideSidebar.bind(this);
        return (<div>
            <nav>
                <div className="nav-wrapper purple darken-1">
                   <div className="p-l5 left">
                   {user?<a href="#!" className="sidebar-modules" onClick={sidebarToggle} ><i className="material-icons">view_module</i></a>:<span></span>}
                   </div>
                   <div className="right">
                        <UserSign username={name}></UserSign>
                   </div>
                </div>
            </nav>
            {user?<MainSidebar user={user} isOpen={sidebarShow} onHide={handleHideSidebar} />:<Fragment></Fragment>}
        </div>);
    }
}

export default connect(state=>({
    user: state.users.current
}),dispatch=>({

}))(Header);