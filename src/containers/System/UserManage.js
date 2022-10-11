import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers} from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    render() {
        console.log('check render ', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className = "users-container">
                <div className="title text-center">Manage users with Hieu Pham</div>
                <div className="users-table mt-3 mx-1">
                <table id="customers">
                    <tr>
                        <th><center>Email</center></th>
                        <th><center>First name</center></th>
                        <th><center>Last name</center></th>
                        <th><center>Address</center></th>
                        <th><center>Actions</center></th>
                    </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                            console.log('hieu pham check map', item, index)
                                return (
                                    <tr key = {index}>
                                        <td><center>{item.email}</center></td>
                                        <td><center>{item.firstName}</center></td>
                                        <td><center>{item.lastName}</center></td>
                                        <td><center>{item.address}</center></td>
                                        <td>
                                            <center>
                                                <button className = "btn-edit"><i className = "fas fa-pencil-alt"></i></button>
                                                <button className = "btn-delete"><i className = "fas fa-trash"></i></button>
                                            </center>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
