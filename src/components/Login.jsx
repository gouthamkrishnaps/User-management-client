import React, { useState } from 'react'
import './style.css'
import animationdata4 from '../assets/Animation - 1701613384620 (2).json'
import Lottie from 'lottie-react'
import swal from 'sweetalert'
import { loginAPI } from '../services/allAPI'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'


function Login() {
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        email : "",
        password : ""
    })
    console.log(userData);

    const handleLogin = async(e)=>{
        e.preventDefault()
        const {email,password} = userData
        if(!email || !password){
            swal({
                title: 'Hey..!',
                text: 'Please fill the form completely',
                icon: 'warning',
            });
        }
        else{
            const result = await loginAPI(userData)
            console.log(result);

            if(result.status === 200){
                sessionStorage.setItem("UserEmail",JSON.stringify(userData.email))
                //setData(userData)
                //sessionStorage.setItem("token",result.data.token)
                swal({
                    title: 'Good Job 😍',
                    text: 'Login Successfull',
                    icon: 'success',
                });
    
                setUserData({
                    email:"",
                    password:""
                })
                //setIsAuthToken(true)
                //navigate to home after login
                setTimeout(()=>{
                    navigate('/')
                },2000)
               
            }
            else{
                swal({
                    title: 'Oh sorry..😣!',
                    text: `${result.response.data}`,
                    icon: 'error',
                });
            }
        }
    }

    const [errors,setErrors] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {}
        if(!userData.email.trim()){
            validationErrors.email = "email is required"
        }else if( !userData.email.endsWith("@gmail.com")){
            validationErrors.email = "email is not valid"
        }
        if(!userData.password.trim()){
            validationErrors.password = "password is required"
        }else if(userData.password.length < 8 || !/(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$)/.test(userData.password) ){
            validationErrors.password = "not a valid password"
            
                /* swal({
                    title: 'How to enter password ?',
                    text: 'Password must be at least 8 characters long \n At least one uppercase letter\n At least one lowercase letter\n At least one digit\n At least one special character from @, #, $, %, ^, &, * \n ',
                    icon: 'warning',
                }) */
                    
               
        }
        setErrors(validationErrors)

        if(Object.keys(validationErrors).length === 0){
            handleLogin(e)
        }
    }
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
  return (
    <div className='login'>
        <></>
        <div className='login-container rounded shadow'>
            <p className='company-head fs-4 p-2'><i className="fa-brands fa-slack fs-4"></i> Tech Assist</p>
            <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center" style={{height:"60vh"}}>
                    <Lottie loop={false} animationData={animationdata4} style={{width:'90%'}}/>
                </div>
                <div className="col-6 d-flex  align-items-center flex-column">
                    <h3 className='text-center fw-bold'>Welcome Back :-)</h3>
                    <form action="" className='mt-5'>
                        <div className='input-section'>
                            <label htmlFor="email " className={errors.email?'text-danger  fw-bold':'fw-bold'}>{errors.email?errors.email:'Email'}</label> <br />
                            <input id='email' value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} type="text" className='from-controls border border-0 rounded-pill shadow p-2 mt-1' placeholder='Type here..'/>
                        </div>
                        <div className='input-section mt-4'>
                            <label htmlFor="password " className={errors.password?'text-danger  fw-bold':'fw-bold'}>{errors.password?errors.password:'Password'}</label> <br />
                                <div className="position-relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}
                                        className='form-controls shadow border rounded-pill border-0 p-2 rounded home-input'
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
                        <div className='d-flex gap-2 mt-5 w-100' >
                            <a onClick={handleSubmit} href='/' className='btn btn-success rounded-pill shadow'>Login Now</a>
                            <a href='/user-register' className='btn btn-outline-primary rounded-pill shadow'>New User ?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login