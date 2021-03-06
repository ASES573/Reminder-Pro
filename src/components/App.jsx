/*
 * @Author: Aswath MadhuBabu 
 * @Date: 2017-06-24 14:08:29 
 * @Last Modified by:   Aswath MadhuBabu 
 * @Last Modified time: 2017-06-24 14:08:29 
 */
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addReminder } from '../actions';
import { deleteReminder } from '../actions';
import { clearReminders } from '../actions';
import moment from 'moment';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            dueDate: ''
        }
    }
    addReminder() {
        console.log('due date', this.state.dueDate);
        this.props.addReminder(this.state.text, this.state.dueDate);
    }
    deleteReminder(id) {
        this.props.deleteReminder(id);
    }
    // clearReminders(){

    // }
    renderReminders() {
        const {reminders} = this.props;
        console.log('final', reminders);
        return (
            <ul className='list-group'>
                {
                    reminders.map(reminder => {
                        return (<li key={reminder.id} className='list-group-item justify-content-between'>
                            <div className='list-group-item '>{reminder.text}    </div>
                            <div className='list-group-item'><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                            <div className="text-center">
                                <button className='btn btn-blue-grey' onClick={() => this.deleteReminder(reminder.id)}><i className="fa fa-times"></i>
                                </button>
                            </div>
                        </li>)
                    })
                }
            </ul>
        )
    }
    render() {
        console.log('props', this.props);
        return (
            <div>
                <div className="card-block">
                    <div className="text-center">
                        <h3><i className="fa fa-tasks"></i> Remember:</h3>
                        <hr className="mt-2 mb-2" />
                    </div>
                    <div className="md-form">
                        <input type="text" id="form2" className="form-control" placeholder='i want...' onChange={event => this.setState({ 'text': event.target.value })} required />
                    </div>
                    <div className="md-form">
                        <input type="datetime-local" id="form4" className="form-control" placeholder='Date' onChange={event => this.setState({ 'dueDate': event.target.value })} />
                        <div className='text-center'><button className="btn btn-floating btn-blue-grey" onClick={() => this.addReminder()}><i className='fa fa-plus'></i></button></div>
                        {this.renderReminders()}
                        <div className='text-center'>
                        <button className='btn btn-warning'   onClick={() => this.props.clearReminders()}><i className='fa fa-gavel'></i></button>
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        reminders: state
    }
}
export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);