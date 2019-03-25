import React, { Component } from 'react'
import Navigation from './comp/Navigation'
import FaceRecognition from './comp/FaceRecognition'
import ImageLinkForm from './comp/ImageLinkForm'
import Rank from './comp/Rank'
import SignIn from './comp/SignIn'
import Register from './comp/Register'
import Clarifai from 'clarifai'

// https://www.cutislaserclinics.com/wp-content/uploads/2018/02/Achieve-a-Youthful-V-Shape-Face.jpg
const app = new Clarifai.App({
  apiKey: '74f613a10f5d4a54baef24e41813cc28'
})

class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      password: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then(console.log) //skrot od data => console.log(data)
  }

  calculateFaceLocation = data => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImg')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayBox = box => {
    this.setState({
      box
    })
  }

  onInputChange = e => {
    this.setState({
      input: e.target.value
    })
  }

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState({...this.state.user, user: {
              entries: count
            }})
          })
        }
      this.displayBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err))
  }
  

  onRouteChange = route => {
    if (route === 'signout' || route === 'register') {
      this.setState({
        isSignedIn: false
      })
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      })
    }
    this.setState({
      route
    })
  }
  loadUser = user => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        password: user.password,
        email: user.email,
        entries: 0,
        joined: user.joined
      }
    })
  }

  render() {
    const { box, imageUrl, route, isSignedIn, user } = this.state
    return (
      <div className="App">
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home' ? 
          <>
            <Rank user={user} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </> : (
            route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} /> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
