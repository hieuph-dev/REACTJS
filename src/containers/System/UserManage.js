import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'

import { emitter } from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true, 
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        }) 
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        }) 
    }

    createNewuser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
            } else {
                alert(res.errMessage)
            }
            console.log(res)
        } catch(e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    } 
     
    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if(res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            } else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        // console.log(arrUsers)
        return (
            <div className = "users-container">
                <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewuser = {this.createNewuser}
                    
                />
                
                {   this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen = {this.state.isOpenModalEditUser}
                        toggleFromParent = {this.toggleUserEditModal}
                        currentUser = {this.state.userEdit}
                        editUser = {this.doEditUser}
                    />
                }           
                <div className="title text-center">Manage users with Hieu Pham</div>
                <div className="mx-1">
                    <button 
                        className = "btn btn-primary px-3"
                        onClick = {() => this.handleAddNewUser()}>
                        <i className="fas fa-plus"></i> 
                        Add new users
                    </button>
                </div>
                <div className="users-table mt-3 mx-1">
                <table id="customers">
                    <tbody>
                    <tr>
                        <th><center>Email</center></th>
                        <th><center>First name</center></th>
                        <th><center>Last name</center></th>
                        <th><center>Address</center></th>
                        <th><center>Actions</center></th>
                    </tr>
                        {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key = {index}>
                                        <td><center>{item.email}</center></td>
                                        <td><center>{item.firstName}</center></td>
                                        <td><center>{item.lastName}</center></td>
                                        <td><center>{item.address}</center></td>
                                        <td>
                                            <center>
                                                <button className = "btn-edit" onClick = { () => this.handleEditUser(item)} ><i className = "fas fa-pencil-alt"></i></button>
                                                <button className = "btn-delete" onClick = { () => this.handleDeleteUser(item)}><i className = "fas fa-trash"></i></button>
                                            </center>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
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
