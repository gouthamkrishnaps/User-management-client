import React, { useState } from 'react'
import './style.css'
import animationdata4 from '../assets/Animation - 1705666244512.json'
import Lottie from 'lottie-react'
import swal from 'sweetalert'
import { registerAPI } from '../services/allAPI'
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
    const navigate = useNavigate()

    const [userData , setUserData] = useState({
        name:"",
        email:"",
        company:"",
        password:""
    })
    console.log(userData);

    const handleRegister = async(e)=>{
        e.preventDefault()
        const {name,email,company,password} = userData
        if(!name || !email || !company || !password){
            swal({
                title: 'Hey..!',
                text: 'Please fill the form completely',
                icon: 'warning',
            });
        }
        else{
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status === 200){
                swal({
                    title: 'Good Job 😍',
                    text: 'Registration Successfull',
                    icon: 'success',
                });
                setUserData({
                    name:"",
                    email:"",
                    company:"",
                    password:""
                })
                //move to login
                navigate('/user-login')
            }
            else{
                swal({
                    title: 'Oh sorry..😣!',
                    text: `${result.response.data}`,
                    icon: 'error',
                })
            }
        }
    }
    const [errors,setErrors] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {}
        if(!userData.name.trim()){
            validationErrors.name = "name is required"
        }else if(!/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(userData.name)){
            validationErrors.name = "name is not valid"
        }    
        if(!userData.email.trim()){
            validationErrors.email = "email is required"
        }else if( !userData.email.endsWith("@gmail.com")){
            validationErrors.email = "email is not valid"
        }
        if(!userData.company.trim()){
            validationErrors.company = "Company is required"
        }else if(!/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(userData.company)){
            validationErrors.company = "Company is not valid"
        }
        if(!userData.password.trim()){
            validationErrors.password = "password is required"
        }else if(userData.password.length < 8 || !/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$)/.test(userData.password) ){
            validationErrors.password = "not a valid password"
            
                swal({
                    title: 'How to enter password ?',
                    text: 'Password must be at least 8 characters long \n At least one uppercase letter\n At least one lowercase letter\n At least one digit\n At least one special character from @, #, $, %, ^, &, * \n ',
                    icon: 'warning',
                })
                    
               
        }
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            handleRegister(e)
        }
        
    };
    
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className='register'>
        <div className='register-container rounded shadow'>
            <p className='company-head fs-4 p-2'><i className="fa-brands fa-slack fs-4"></i> Tech Assist</p>
            <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center" style={{height:"60vh"}}>
                    <Lottie  animationData={animationdata4} style={{width:'70%'}}/>
                </div>
                <div className="col-6 d-flex align-items-center flex-column">
                    <h3 className='text-center fw-bold'>Join with us</h3>
                    <form action="" className='mt-5'>
                        <div className='d-flex gap-3'>
                          <div className='input-section'>
                              <label htmlFor="name " className={errors.name?'text-danger  fw-bold':'fw-bold'}>{errors.name?errors.name:'Name'}</label> <br />
                              <input id='name' value={userData.name} onChange={(e)=>setUserData({...userData,name:e.target.value})} type="text" className='from-controls border border-0 rounded-pill shadow p-2 mt-1' placeholder='Type here..'/>
                          </div>
                          <div className='input-section '>
                              <label htmlFor="email " className={errors.email?'text-danger  fw-bold':'fw-bold'}>{errors.email?errors.email:'Email'}</label> <br />
                              <input id='email' value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} type="text" className='from-controls border border-0 rounded-pill shadow p-2 mt-1' placeholder='Type here..'/>
                          </div>
                        </div>
                        <div className='d-flex gap-3 mt-4'>
                          <div className='input-section '>
                              <label htmlFor="company " className={errors.company?'text-danger  fw-bold':'fw-bold'}>{errors.company?errors.company:'Company'}</label> <br />
                              <input id='company' value={userData.company} onChange={(e)=>setUserData({...userData,company:e.target.value})} type="text" className='from-controls border border-0 rounded-pill shadow p-2 mt-1' placeholder='Type here..'/>
                          </div>
                          <div className='input-section '>
                              <label htmlFor="password " className={errors.password?'text-danger  fw-bold':'fw-bold'}>{errors.password?errors.password:'Password'}</label> <br />
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}
                                        className='form-controls shadow rounded-pill border border-0 p-2 rounded home-input'
                                        placeholder='Type here..'
                                    />
                                    <span
                                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                                        onClick={togglePasswordVisibility}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                
                          </div>
                        </div>
                        
                        <div className='d-flex gap-2 mt-5 w-100' >
                        
                            <a onClick={handleSubmit} className='btn btn-success rounded-pill shadow'>Create Account</a>
                            <a href='/user-login' className='btn btn-outline-primary rounded-pill shadow'>Go to Login</a>
                        </div>
                    </form>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register