// @flow
import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { type USER, UPDATE_AUTH_USER, SERVER} from '../../constants';
import UserSign from '../../components/user-sign-module';
import MainSidebar from './main-sidebar';
import { deleteCookie } from '../../utils/cookies';

type Props = {
    user: USER | null,
    resetAuthUser: ()=>void
}

type State = {
    sidebarShow: boolean
}

class Header extends Component<Props, State>{
    state = {
        sidebarShow: false
    }

    sidebarToggle(event: Event): void{
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

    logout(){
        this.props.resetAuthUser();
        deleteCookie("userdata");
    }

    render(){
        let { user } = this.props;
        let name = "";
        let avatar;
        if(user && user.firstName){
            name = user.firstName;
        }
        if(user && user.avatar){
            avatar = SERVER.apihost + user.avatar;
        }
        let { sidebarShow } = this.state;
        let sidebarToggle = this.sidebarToggle.bind(this);
        let handleHideSidebar = this.handleHideSidebar.bind(this);
        let logout = this.logout.bind(this);
        
        return (<div>
            <nav>
                <div className="nav-wrapper purple darken-1">
                   <div className="p-l5 left">
                   {user?<a href="#!" className="sidebar-modules" onClick={sidebarToggle} ><i className="material-icons">view_module</i></a>:<span></span>}
                   </div>
                   <div className="right">
                        <UserSign username={name} logout={logout} avatar={avatar}></UserSign>
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
    resetAuthUser: ()=>{
        dispatch({type: UPDATE_AUTH_USER, data: false});
    }
}))(Header);