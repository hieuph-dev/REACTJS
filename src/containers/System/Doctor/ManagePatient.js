import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import {getAllPatientForDoctor, postSendRemedy} from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast} from 'react-toastify';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async() => {
        let { user } = this.props;
        let { currentDate } = this.state;         
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if(res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
   

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.language !== prevProps.language) {
           
       } 
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: ''
        })
    }

    sendRemedy = async(dataChild) => {
        let {dataModal} = this.state;
        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
        if(res && res.errCode === 0) {
            toast.success('Send Remedy succeeds:');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            toast.error('Something wrongs...');
            console.log('Error send semedy: ', res)
        }
    }

    render() {
        let {dataPatient, isOpenRemedyModal, dataModal} = this.state;
        let {language} = this.props;    
        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">
                        Quản lí bệnh nhân khám bệnh 
                    </div>
                    <div className="manage-patient-body now">
                        <div className="col-4 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                    onChange = {this.handleOnchangeDatePicker}
                                    className="form-control"
                                    value = {this.state.currentDate}
                                />
                        </div>
                        <div className="col-12 table-manage-patient">
                            <table style={{width:'100%'}}>
                                <tbody>
                                    <tr>
                                        <th><center>STT</center></th>
                                        <th><center>Thời gian</center></th>
                                        <th><center>Họ và tên</center></th>
                                        <th><center>Địa chỉ</center></th>
                                        <th><center>Giới tính</center></th>
                                        <th><center>Actions</center></th>
                                    </tr>
                                        {dataPatient && dataPatient.length > 0 ?
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                                let gender = language === LANGUAGES.VI ?
                                                item.patientData.genderData.valueVi: item.patientData.genderData.valueEn
                                                return (
                                                    <tr key = {index}>
                                                        <td><center>{index+1}</center></td>
                                                        <td><center>{time}</center></td>
                                                        <td><center>{item.patientData.firstName}</center></td>
                                                        <td><center>{item.patientData.address}</center></td>
                                                        <td><center>{gender}</center></td>
                                                        <td>
                                                            <center>
                                                                <button className="mp-btn-confirm"
                                                                    onClick={() => this.handleBtnConfirm(item)}
                                                                >
                                                                    Xác nhận
                                                                </button>
                                                            </center>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="6"><center>No data</center></td>
                                            </tr>
                                        }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <RemedyModal
                    isOpenModal = {isOpenRemedyModal}
                    dataModal = {dataModal}
                    closeRemedyModal = {this.closeRemedyModal}
                    sendRemedy = {this.sendRemedy}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
       language: state.app.language,
       user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
