import React, { Component } from 'react'
import axios from 'axios'

const Notification = props => (
    <div className="card">
        <div className="delete-notification"
            onClick={() => { props.deleteNotification(props.notification.id) }}
        >
            <i className="material-icons">delete</i>
        </div>
        <div className="notif-title">{props.notification.title}</div>
        <div>{props.notification.message}</div>
    </div>
)

export default class NotificationsList extends Component{
    constructor(props) {
        super(props)

        this.deleteNotification = this.deleteNotification.bind(this)
        this.state = {
            notifications: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/notifications/')
            .then(response => {
              console.log(response.data)
            this.setState({ notifications: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
    }
    deleteNotification(id) {
        axios.delete('http://localhost:3000/notifications/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          notifications: this.state.notifications.filter(el => el._id !== id)
        })
        window.location.reload()
    }
    notificationList() {
        return this.state.notifications.map(currentNotif => {
          return <Notification notification={currentNotif} deleteNotification={this.deleteNotification} key={currentNotif.id}/>;
        })
    }
    render() {
        return (
            <div>
                <h3>Available notifications</h3>
                <div className="notifications-list">
                    { this.notificationList() }
                </div>
            </div>
        )
    }
}