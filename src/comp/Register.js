import React, { Component } from 'react'

class Register extends Component {

    state = {
        name: '',
        password: '',
        email: ''
    }
    onInputreg = e => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    onSubmitChange = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                }
            }) 
    }

    render() {
        const { onRouteChange } = this.props
        const { name, email, password } = this.state
        return (
            <div className="SignIn">
                <span className='centerspan'>Register</span>
                <input
                    className='centerinput'
                    type="text"
                    name='name'
                    value={name}
                    onChange={this.onInputreg}
                    placeholder='name'
                />
                <input
                    className='centerinput'
                    type="text"
                    name='email'
                    value={email}
                    onChange={this.onInputreg}
                    placeholder='email'
                />
                <input
                    className='centerinput'
                    type="text"
                    name='password'
                    value={password}
                    onChange={this.onInputreg}
                    placeholder='password'
                />
                <input
                    className='centerinput extrainput'
                    type="submit"
                    value="Register"
                    onClick={this.onSubmitChange}
                />
                <p className='parareg' onClick={() => onRouteChange('register')}>Have an account? Sign In!</p>
            </div>
        )
    }
}

export default Register