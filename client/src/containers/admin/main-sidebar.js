// @flow
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { type USER, MenuItems, SERVER} from '../../constants';

type Props = {
    user: USER | null,
    isOpen: boolean,
    onHide?: ()=>void
}

class MainSidebar extends Component<Props,{}>{
    handleHide():void{
        if(this.props.onHide) this.props.onHide();
    }
    
    render(){
        let { isOpen, user } = this.props;

        let styles: { transform?: string } = {transform: isOpen?"translateX(0%)":"translateX(-105%)" };
        let handleHide:()=>void = this.handleHide.bind(this);
        return <div>
            <ul className="sidenav" style={styles}>
                <li>
                    <div className="user-view">
                        <div className="background">
                        </div>
                        {user?(<Fragment> 
                            <Link to="/admin/profile" onClick={handleHide}><img className="circle" src={user.avatar?(SERVER.apihost + user.avatar):"/images/user.svg"} alt="avatar" /></Link>
                            <Link to="/admin/profile" onClick={handleHide}><span className="white-text name">{ user.firstName + " " + user.lastName }</span></Link>
                            <Link to="/admin/profile" onClick={handleHide}><span className="white-text email">{ user.email }</span></Link>
                        </Fragment>):<Fragment></Fragment>}
                    </div>
                </li>
                {MenuItems.map((item, index)=>{
                    return <li key={index}><Link to={item.url} onClick={handleHide}>{item.name}</Link></li>
                })}
            </ul>
            <div className="sidenav-overlay" style={isOpen?{display: 'block', opacity: 1}:{}} onClick={handleHide}> </div>
        </div>
    }
}

export default MainSidebar;