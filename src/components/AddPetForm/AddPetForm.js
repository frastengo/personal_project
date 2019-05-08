import React, {Component} from 'react'
import './AddPetForm.css'
import axios from 'axios'
import ProfileDisplay from '../../components/ProfileDisplay/ProfileDisplay'
import Select from 'react-select'
import {genders, ageGroups, stateOptions} from './searchData.js'
import countryList from 'react-select-country-list'
import {setUser} from './../../ducks/userReducer'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/frastengo2019/image/upload"



// import {Link} from 'react-router-dom'





class AddPetForm extends Component {

    constructor(props){
        super(props)
        this.options = countryList().getData()

        this.state = {
            options: this.options,
            loggedInUser: null,
            loggedInUserId: null,
            breeds: [],
            selectedGender: {},
            selectedBreed: {}, 
            value: null,
            name: '',
            
            gender: "",
            age: '',
            city: "",
            country: '',
            state: '',
            favorites: '',
            zipcode: '',
            profile: [],
            displayProfile: [],
            image: '',
            uploadedFile: '',
            cloudinaryUrl: []
        }
    }

    componentDidMount() {
        axios.get("/auth/user").then(res => {
            this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data,
                    loggedInUserId: res.data.id,
                })
            }
          
        });
       
        axios.get('https://dog.ceo/api/breeds/list/all').then(res => {
            this.setState({
                breeds: res.data.message
            })
        })
        
    }

    // componentDidUpdate = () => {
    //     this.updateDisplay()
    // }

    changeHandler = (name, value) => {
        this.setState({
            [name]: value,
            
        })
        this.updateDisplay()
    }

    updateDisplay = () => {
        const {country, state, name, age, breed, favorites, gender, loggedInUserId, zipcode, image} = this.state
        this.setState({
            displayProfile: [{country, state, name, age, breed, favorites, gender, zipcode, image}]
        })
    }

    handleGender = (selectedGender) => {
        this.setState({
            
            gender: selectedGender.value
        })
        this.updateDisplay()
    }
    handleAge = (selectedAge) => {
        this.setState({
            age: selectedAge.value,
        })
        this.updateDisplay()
    }

    handleBreed = (selectedBreed) => {
        this.setState({
            breed: selectedBreed.value,
        })
        this.updateDisplay()
    }

    handleState = (selectedState) => {
        this.setState({
            state: selectedState.value,
        })
        this.updateDisplay()
    }
    handleCountry= (selectedCountry) => {
        this.setState({
            country: selectedCountry.value,
        })
        this.updateDisplay()
    }

    addProfile = () => {
        const {country, state, name, age, breed, favorites, gender, loggedInUserId, zipcode, image} = this.state
        

        



        axios.post(`/api/profiles/${loggedInUserId}`, {country, state, name, age, breed, favorites, gender, zipcode, image}).then(res => {
            this.setState({
                profile: res.data
            })
        })
    }

    onImageDrop = (files) => {
        console.log("onImageDrop FILES", files)
        this.setState({
          uploadedFile: files[0]
        });
        
        this.handleImageUpload(files[0]);
        this.updateDisplay()
    }

    handleImageUpload = (file) => {

        axios.get('/api/upload').then(response => {
    
            let formData = new FormData();
            formData.append("signature", response.data.signature)
            formData.append("api_key", "923861371997432");
            formData.append("timestamp", response.data.timestamp)
            formData.append("file", file);
        
            axios.post(CLOUDINARY_UPLOAD_URL, formData).then(response => {

                this.setState({
                    cloudinaryUrl: [...this.state.cloudinaryUrl, response.data.secure_url],
                    image: [...this.state.cloudinaryUrl, response.data.secure_url][0]
                    })
                }).catch( err => {
                console.log(err);
            })
        
        })
     }
    


    


    render(){
        // const {cloudinaryUrl} = this.state
        // console.log('THIS STATE IN ADD PET FORM CLOUDINARY URL',cloudinaryUrl[0])
       


        //setting breeds list from api
        var newBreedsObject = {...this.state.breeds}
        newBreedsObject['goldenDoodle'] = []
        newBreedsObject['pitbull'] = []
        console.log('NEW BREEDS OBJECT', newBreedsObject)

      
        var array = []
        for (const [key, value] of Object.entries(newBreedsObject)) {
            if (value.length > 0){
                var options = []
                for (let i = 0; i < value.length; i++){
                    options.push({value: (value[i].charAt(0).toUpperCase() + value[i].slice(1)) + " " + (key.charAt(0).toUpperCase()+(key.slice(1))), label: (value[i].charAt(0).toUpperCase() + value[i].slice(1)) + ' ' + (key.charAt(0).toUpperCase()+(key.slice(1)))})
                }
                array.push({label: (key.charAt(0).toUpperCase()+(key.slice(1))), options})
            }else {
                array.push({label: (key.charAt(0).toUpperCase()+(key.slice(1))), value: (key.charAt(0).toUpperCase()+(key.slice(1)))})
            }
        }


        let display = this.state.displayProfile 
        
       
        const mappedDisplayProfile = display.map(dog => {
            return <ProfileDisplay dog={dog}/>
        })



        console.log('STATE IN ADD PET FORM', this.state)
       return (
           <div className='container-pet-form'>
            <div className="add-pet-form-container">
                <div className='add-pet-form'>
                    <h1>Add New Pet</h1>
                    <div className='selections'>
                        <input 
                            className='select'
                            placeholder='Name'
                            name="name"
                            value={this.state.name}
                            onChange={(e)=>this.changeHandler(e.target.name, e.target.value)}
                        />

                        <Select
                            className='select'
                            placeholder="Gender"
                            value={this.selectedGender}
                            onChange={this.handleGender}
                            options={genders}
                        />

                        <Select
                            className='select'
                            placeholder="Breed"
                            
                            value={this.selectedBreed}
                            onChange={this.handleBreed}
                            options={array}
                        />

                        <Select
                            className='select'
                            placeholder="Age"
                            
                            value={this.selectedAge}
                            onChange={this.handleAge}
                            options={ageGroups}
                        />

                        <Select
                            className='select'
                            placeholder="State"
                            name="state"
                            value={this.selectedState}
                            onChange={this.handleState}
                            options={stateOptions}
                        />

                        <Select
                            className='select'
                            placeholder="Country"
                            name="country"
                            value={this.selectedCountry}
                            onChange={this.handleCountry}
                            options={this.state.options}
                        />
                        <input 
                            className='select'
                            placeholder='City'
                            name="city"
                            value={this.state.city}
                            onChange={(e)=>this.changeHandler(e.target.name, e.target.value)}
                        />

                        <input 
                            className='select'
                            placeholder='Zipcode'
                            name="zipcode"
                            value={this.state.zipcode}
                            onChange={(e)=>this.changeHandler(e.target.name, e.target.value)}
                        />

                        {/* <input 
                            type= 'text'
                            className='select'
                            placeholder='Image'
                            name="image"
                            value={this.state.image}
                            onChange={(e)=>this.changeHandler(e.target.name, e.target.value)}
                        /> */}

                        <textarea 
                            className='select-favorites'
                            placeholder="My favorite things are ..."
                            name="favorites"
                            value={this.state.favorites}
                            onChange={(e)=>this.changeHandler(e.target.name, e.target.value)}
                        />

                        <Dropzone onDrop={this.onImageDrop}accept="image/*, video/*" multiple={false}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p id="display-dropzone">Click to select picture or drop your picture here </p>
                                </div>
                                </section>
                            )}
                        </Dropzone>

                    </div>
                        

                    
                    
                </div>
            {this.state.displayProfile.length ? (
                        <div className="mapped-display-profile">
                            {mappedDisplayProfile}
                            <button className='add-button-class' onClick={this.addProfile}>ADD PET<i class="material-icons">
add_circle_outline
</i></button>
                        </div>

                        

                    ):(
                        <div className="display-message"><h2>Your profile preview will display here </h2>  
                        </div>
                    )}

            </div>

        </div>
        )
    }
}


function mapStateToProps(state){
    return state.profiles;
}
  

  export default connect(mapStateToProps, {setUser})(AddPetForm);