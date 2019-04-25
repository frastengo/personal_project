import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './Profiles.css'
import {getAllProfiles} from './../../ducks/profilesReducer'
import Profile from './../Profile/Profile'
import Select from 'react-select'
import options from './searchData.js'


const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
]

const ageGroups = [
    { value: 'puppy', label: 'Puppy' },
    { value: 'adult', label: 'Adult' },
]

const breedOptions = []
console.log('breedoptions', breedOptions)

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null,
            profiles: [],
            filteredProfiles: [],
            breeds: [],
            selectedGender: {},
            selectedBreed: {}
        };
    }
    
    getAllProfiles = () => {
        axios.get('/api/profiles').then(res => {
            this.setState({
                profiles: res.data,
                filteredProfiles: res.data
            })
        })
    }

    componentDidMount(){
        this.getAllProfiles()
        // this.props.getAllProfiles();
        axios.get('https://dog.ceo/api/breeds/list/all').then(res => {
            this.setState({
                breeds: res.data.message
            })
        })
    }

    handleGender = (selectedGender) => {
        // this.getAllProfiles();

        // if (selectedGender & selectedBreed){

        // } else if {
        //     (selectedGender && !selectedBreed)
        // } else if {
        //     (!selectedGender && selectedBreed)
        // }


        let {value} = selectedGender
        value = value.charAt(0).toUpperCase() + value.slice(1)
        console.log('   value at handlegender', value)
        axios.get(`/api/profiles/?gender=${value}`).then(res => {
            this.setState({ 
                selectedGender,
                profiles: res.data
            });
        })
    }
    handleBreed = (selectedBreed) => {
        // this.getAllProfiles();

        let {value} = selectedBreed
        // value = value.charAt(0).toUpperCase() + value.slice(1)
        // value = value.charAt(0).toUpperCase() + value.slice(1)
        console.log('IIII AMM HERE   value at handlebreed', value)
        // axios.get(`/api/profiles/?breed=${value}`).then(res => {
        let result = this.state.profiles.filter(dog => dog.breed.toLowerCase() == value);

        this.setState({ 
            selectedBreed,
            // filteredProfiles: result,
            profiles: result
        });
    }



        // console.log('SELECTED GENDER IN HANDLE GENDER', value)

        // console.log('GENDER VALUE TO UPPER CASE', value)
        // let mappedProfilesByGender = this.state.profiles.filter(dog => dog.gender.toLowerCase() == value)
        // let result = 

        // this.setState({
        //     filteredProfiles: mappedProfilesByGender
        // })
        // console.log('filtered by gender',mappedProfilesByGender)


    
    

    
    render() {
        console.log('OPTIONS', options)
        const {selectedGender} = this.state
        console.log('selectegender on state', (selectedGender))
        const {value} = selectedGender
        console.log(value)

        var valuesArray = []
        var array = []
        for (const [key, value] of Object.entries(this.state.breeds)) {
            if (value.length > 0){
                var options = []
                for (let i = 0; i < value.length; i++){
                    // array.push({label: key, options: [
                    //     {value: value[i], label: value[i]}
                    // ]})
                    options.push({value: value[i] + " " + key, label: (value[i].charAt(0).toUpperCase() + value[i].slice(1)) + ' ' + (key.charAt(0).toUpperCase()+(key.slice(1)))})
                }
                array.push({label: key, options})
            }else {

                // array.push({value: breed, label: breed.charAt(0).toUpperCase()+breed.slice(1)})
                array.push({label: (key.charAt(0).toUpperCase()+(key.slice(1))), value: key})
            }
        }
        // console.log('array of values', valuesArray)
        console.log('ARRAY OF KEYS', array)
        var breedsToAdd = ["pitbull"]

        array.push("pitbull", "boston Bulldog", "english Bulldog", "french Bulldog", "staffordshire bullterrier", "australian Cattledog", "border Collie", "cardigan Corgi", "great Dane", "scottish Deerhound", "norwegian Elkhound", "bichon frise", "italian Greyhound", "walker Hound", "ibizan Hound", "english Hound", "blood Hound", "basset Hound" , "afghan Hound", "english Mastiff", "tibetan Mastiff", "bull Mastiff" , "swiss moutain" )
        console.log('ARRAY WITH PITBULL ADDED', array)

        // const mappedArray = array.map(breed => {
        //     return {value: breed, label: breed.charAt(0).toUpperCase()+breed.slice(1)}
        // })


        // console.log('mappedArray', mappedArray)



        // const {breeds} = this.state
        // console.log(breeds)
        // console.log('objectkeys', Object.keys(breeds))
        // console.log(breedsObjects)
    // const mappedBreeds = this.state.breeds.map(breed => {
    //     return <p>{breed}</p>
    // })
    //     return (
    //         <div>
    //             <select>
    //                 <option value={`"${breed}"`}>{breed}</option>
    //             </select>
    //         </div>
    //     )
    // })
    
    console.log(this.state.breeds)
    console.log(this.props.profiles)


    console.log('PROFILES FROM AXIOS', this.state.profiles)
    
    // let { loggedInUser, profiles} = this.props;
    const mappedProfiles = this.state.profiles.map(dog =>
     {
        return <Profile key={dog.profile_id} dog={dog}/>
    })


     
    const { selectedOption } = this.state;

    return (
        <div>
            <div className="select-container">
                <h1 >Search by </h1>

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


            </div>
            
            <div className="mapped-profiles">{mappedProfiles} </div>
                {/* <h1>{mappedBreeds}</h1> */}
        </div>
        );
    }
}

    function mapStateToProps(state){
        return state.profiles;
    }
      
      //mapDispatchToProps will map functions imported from the reducer onto the props of this component
    
      
      //exporting as a new enhanced component
      //connect component evoked 
      //if not using mapStateToProps, use null because it is ordinal 
      export default connect(mapStateToProps, {getAllProfiles})(Profiles);