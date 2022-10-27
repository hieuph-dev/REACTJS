import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions" 


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
           userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUsers = this.state.usersRedux;
        return (
                <table id = "TableManageUser">
                    <tbody>
                    <tr>
                        <th><center>Email</center></th>
                        <th><center>First name</center></th>
                        <th><center>Last name</center></th>
                        <th><center>Address</center></th>
                        <th><center>Actions</center></th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                    arrUsers.map((item, index) => {

                        return (
                            <tr key = {index} >
                                <td><center>{item.email}</center></td>
                                <td><center>{item.firstName}</center></td>
                                <td><center>{item.lastName}</center></td>
                                <td><center>{item.address}</center></td>
                                <td>
                                    <center>
                                        <button 
                                            className = "btn-edit"
                                            onClick = {() => this.handleEditUser(item)}
                                            >
                                                <i className = "fas fa-pencil-alt"></i>
                                        </button>
                                        <button 
                                            className = "btn-delete"
                                            onClick = {() => this.handleDeleteUser(item)}
                                            >
                                                <i className = "fas fa-trash"></i>
                                        </button>
                                    </center>
                                </td>
                            </tr>
                        )

                    })
                    }
                                    
                    </tbody>
                </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
