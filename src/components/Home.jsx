import React, { useEffect, useState } from 'react'
import Header from './Header'
import './style.css'
import { getUserAPI } from '../services/allAPI'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Home() {
  const [fetchedData,setFetchedData] = useState({})
  const user = JSON.parse(sessionStorage.getItem("UserEmail"))
    if (!user) {
        window.location="/user-login"
    }

  const getUser = async()=>{
    const result = await getUserAPI(user)
    //console.log(result.data);
    setFetchedData(result.data)
  }
  console.log(fetchedData);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  useEffect(()=>{
    getUser()
  },[])
  return (
    <div className='home'>
      <Header/>
      <div style={{height:"36vh"}}>
        <h4 className='text-center fw-bold' >User Details</h4>
        <div className="row">
          <div className="col-4 d-flex justify-content-center align-items-center">
            <img height={'300px'} width={'300px'} className='rounded-circle user-img  m-2' src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg" alt="" />
          </div>
          <div className="col-8 d-flex justify-content-center align-items-center flex-column">
            <div className='d-flex gap-5'>
              <div className='' >
                <label htmlFor="" className='fw-bold'>Full Name</label> <br />
                <input type="text" value={fetchedData.name} className='form-controls shadow border border-0 p-2 rounded home-input' placeholder='Your data will be shown here' readOnly/>
              </div>
              <div className=''>
                <label htmlFor="" className='fw-bold'>Email</label> <br />
                <input type="text" value={fetchedData.email} className='form-controls shadow border border-0 p-2 rounded home-input' placeholder='Your data will be shown here' readOnly/>
              </div>
            </div>
            <div className='d-flex gap-5 mt-5'>
              <div className=''>
                <label htmlFor="" className='fw-bold'>Company Name</label> <br />
                <input type="text" value={fetchedData.company} className='form-controls shadow border border-0 p-2 rounded home-input' placeholder='Your data will be shown here' readOnly/>
              </div>
              <div className=''>
                <label htmlFor="" className='fw-bold'>Password</label> <br />
                {/* <input type="password" value={fetchedData.password} className='form-controls shadow border border-0 p-2 rounded home-input' placeholder='Your data will be shown here' readOnly/> */}
                <div className="position-relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={fetchedData.password}
                        className='form-controls shadow border border-0 p-2 rounded home-input'
                        placeholder='Your data will be shown here'
                        readOnly
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
          </div>

        </div>
      </div>
      <div >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fill-opacity="1" d="M0,160L21.8,181.3C43.6,203,87,245,131,224C174.5,203,218,117,262,106.7C305.5,96,349,160,393,202.7C436.4,245,480,267,524,277.3C567.3,288,611,288,655,288C698.2,288,742,288,785,272C829.1,256,873,224,916,192C960,160,1004,128,1047,144C1090.9,160,1135,224,1178,250.7C1221.8,277,1265,267,1309,234.7C1352.7,203,1396,149,1418,122.7L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
      </div>
     
    </div>
  )
}

export default Home