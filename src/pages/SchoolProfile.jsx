import {useState, useEffect} from 'react'

import axios from 'axios'

import API_URL from '../config'
function SchoolProfile() {

  const [formData, setFormData] =
    useState({

      schoolName: '',
      schoolCode: '',
      affiliationNo: '',
      registrationNo: '',

      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',

      phone: '',
      mobile: '',
      email: '',
      website: '',

      principalName: '',
      vicePrincipal: '',
      administrator: ''

    })

    useEffect(() => {

  fetchProfile()

}, [])

const fetchProfile =
  async () => {

    try {

      const res =
        await axios.get(
          `${API_URL}/api/school-profile`
        )

      if (res.data) {

        setFormData({

          ...formData,

          ...res.data

        })

      }

    } catch (error) {

      console.log(error)

    }

  }

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })
  }

  const handleSubmit =
  async (e) => {

    e.preventDefault()

    try {

      await axios.post(

        `${API_URL}/api/school-profile`,

        formData

      )

      alert(
        'School Profile Saved'
      )

    } catch (error) {

  console.error(error)

  console.log(error.response?.data)

  alert(
    error.response?.data?.message ||
    error.message
  )

}

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-8">
          🏫 School Profile
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          {/* School Info */}

          <h2 className="text-xl font-bold mb-4">
            School Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">

            <input
              name="schoolName"
              value={formData.schoolName}
              placeholder="School Name"
              onChange={handleChange}
            />

            <input
              name="schoolCode"
              placeholder="School Code"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="affiliationNo"
              placeholder="Affiliation Number"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="registrationNo"
              placeholder="Registration Number"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

          </div>

          {/* Address */}

          <h2 className="text-xl font-bold mb-4">
            Address Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">

            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="country"
              placeholder="Country"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

          </div>

          {/* Contact */}

          <h2 className="text-xl font-bold mb-4">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-8">

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="mobile"
              placeholder="Mobile"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="website"
              placeholder="Website"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

          </div>

          {/* Administration */}

          <h2 className="text-xl font-bold mb-4">
            Administration
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">

            <input
              name="principalName"
              placeholder="Principal Name"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="vicePrincipal"
              placeholder="Vice Principal"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              name="administrator"
              placeholder="Administrator"
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

          </div>

          <button
            className="
            bg-blue-600
            text-white
            px-8
            py-3
            rounded-xl
            "
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>

  )
}
}

export default SchoolProfile