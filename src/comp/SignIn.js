import React, { Component } from 'react'

class SignIn extends Component {

    state = {
        siemail: '',
        sipassword: ''
    }

    onInputChange = e => {
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    onSubmitSi = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.siemail,
                password: this.state.sipassword
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data == 'success') {
                    return this.props.onRouteChange('home')
                }
            }) 
    }

    render() {
        const { onRouteChange } = this.props
        const { siemail, sipassword } =this.state
        return (
            <div className="SignIn">
                <span className='centerspan'>LOG IN</span>
                <input
                    className='centerinput'
                    type="text"
                    name='siemail'
                    placeholder='email'
                    value={siemail}
                    onChange={this.onInputChange}
                />
                <input
                    className='centerinput'
                    type="text"
                    name='sipassword'
                    placeholder='password'
                    value={sipassword}
                    onChange={this.onInputChange}
                />
                <input
                    className='centerinput extrainput'
                    type="submit"
                    value="Sign In"
                    onClick={this.onSubmitSi}
                />
                <p className='parareg' onClick={() => onRouteChange('register')}>Create a new account</p>
            </div>
        )
    }
}

export default SignIn