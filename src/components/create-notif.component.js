import React, { Component } from 'react'
import axios from 'axios'

export default class CreateNotification extends Component{
    constructor(props) {
        super(props)

        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeMessage = this.onChangeMessage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    
        this.state = {
            title: '',
            message: ''
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }
    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault()
        const notification = {
            title: this.state.title,
            message: this.state.message,
            createdAt: new Date()
        }
        axios.post('http://localhost:3000/add', notification)
            .then(res => console.log(res.data))
            .catch((error)=>{console.log(error)});
            
        this.setState({
            title: '',
            message: ''
        })
        window.location.reload()
    }

    render() {
        return (
            <form className="main-form">
                <input
                    type="text"
                    required
                    className="input"
                    placeholder="Enter a title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                />
                <input
                    type="text"
                    required
                    className="input"
                    placeholder="Enter a message"
                    value={this.state.message}
                    onChange={this.onChangeMessage}
                />
                <button type="button" className="submit-btn" onClick={this.onSubmit}>Create notification</button>
            </form>
        )
    }
}