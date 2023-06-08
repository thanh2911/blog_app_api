import React, {useState} from 'react'

const LoginSMS = () => {

    const [phone, setPhone] = useState('');

    // console.log(phone);
    
  return (
    <form >
        <div className="form-group">
            <label htmlFor="phone" className='form-label'>Phone Number</label>

            <input type="text" className='form-control'
            id='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            />

        <button type='submit' disabled={phone ? false : true}>
            Login
        </button>
        </div>
    </form>
  )
}

export default LoginSMS