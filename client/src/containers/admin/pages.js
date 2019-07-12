//@flow
import React, { Component } from 'react';
import { type USER } from '../../constants';

type Props = {
    user: USER
}

class PagesPage extends Component<Props, any>{
    render(){
        return <div className="row">
            <div className="col s12">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    }
}

export default PagesPage;