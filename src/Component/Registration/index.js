import React, { useEffect, useState } from "react";
import Upload from "../Upload";
import UploadKTP from "../Upload/uploadktp.js";

import axios from "axios";
import PostImage from "../PostImage/file";

// const baseURL = "http://10.103.1.203:8082/backoffice/update_patient";

const Registration = () => {
  const [patientIDNumber, setpatientIDNumber] = useState("");
  const [mrNumber, setmrNumber] = useState("");
  const [patientName, setpatientName] = useState("");
  const [patientBirthPlace, setpatientBirthPlace] = useState("");
  const [patientBirthDate, setpatientBirthDate] = useState("");
  const [patientGender, setpatientGender] = useState("");
  const [MaritalStatus, setMaritalStatus] = useState("");
  const [patientIdType, setpatientIdType] = useState("");
  const [patientEmail, setpatientEmail] = useState("");
  const [patientAddress, setpatientAddress] = useState("");
  const [patientPhoneNumber, setpatientPhoneNumber] = useState("");
  const [patientCity, setpatientCities] = useState([]);
  const [patientDistrict, setpatientDistrict] = useState([]);
  const [patientVillages, setpatientVillages] = useState([]);
  const [patientdataIdImages, setpatientdataIdImages] = useState("");
  const [ProfilePicture, setProfilePicture] = useState("");
  const [patientProvince, setProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedVillage, setSelectedVillage] = useState(0);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [imageString, setImageString]= useState(null);
  

  const changeCardNumber = (e) => {
    const value = e.target.value;
    setpatientIDNumber(value);
  };

  const changeMrNumber = (e) => {
    const value = e.target.value;
    setmrNumber(value);
  };

  const changePatientName = (e) => {
    const value = e.target.value;
    setpatientName(value);
  };

  const changePlaceBirth = (e) => {
    const value = e.target.value;
    setpatientBirthPlace(value);
  };

  const changeDateBirth = (e) => {
    const value = e.target.value;
    setpatientBirthDate(value);
  };

  const changeGender = (e) => {
    const value = e.target.value;
    setpatientGender(value);
  };

  const changeStatus = (e) => {
    const value = e.target.value;
    setMaritalStatus(value);
  };

  const changeIdentitas = (e) => {
    const value = e.target.value;
    setpatientIdType(value);
  };

  const changeEmail = (e) => {
    const value = e.target.value;
    setpatientEmail(value);
  };

  const changeAddress = (e) => {
    const value = e.target.value;
    setpatientAddress(value);
  };

  const changePhone = (e) => {
    const value = e.target.value;
    setpatientPhoneNumber(value);
  };

 

  const getProvince = () => {
    return patientProvince.map((province, Id) => {
      return (
        <option key={Id} value={province.Id}>
          {province.Name}
        </option>
      );
    });
  };

  const getCity = () => {
    return patientCity.map((city, Id) => {
      return (
        <option key={Id} value={city.Id}>
          {city.Name}
        </option>
      );
    });
  };

  const getDistrict = () => {
    return patientDistrict.map((district, Id) => {
      return (
        <option key={Id} value={district.Id}>
          {district.Name}
        </option>
      );
    });
  };

  const getVillages = () => {
    return patientVillages.map((villages, Id) => {
      return (
        <option key={Id} value={villages.Id}>
          {villages.Name}
        </option>
      );
    });
  };
  const handleProvince = (e) => {
    console.log(e.target.value);
    setSelectedProvince(e.target.value);
  };

  const handleGetCity = (e) => {
    console.log(e.target.value);
    setSelectedCity(e.target.value);
  };

  const handleGetDistrict = (e) => {
    console.log(e.target.value);
    setSelectedDistrict(e.target.value);
  };

  const handleGetVillages = (e) => {
    console.log(e.target.value);
    setSelectedVillage(e.target.value);
  };

  //pakenya yg ini
  const uploadImage = (e) => {
    const selectedImages = e.target.files[0];
    let data ="";
    let reader = new FileReader();

    reader.readAsDataURL(selectedImages);
    
    reader.onload = () => {
      setImagePreview(URL.createObjectURL(selectedImages));
      data = reader.result;
      setImageString(data);
    
   
    }
    
  };

  const uploadImageKTP = (e) => {
    const selectedImage= e.target.files[0]
    setProfilePicture(selectedImage);
    setImagePreview2(URL.createObjectURL(selectedImage));
    let data ="";
    let reader = new FileReader();

    reader.readAsDataURL(selectedImage);
    
    reader.onload = () => {
     
      data = reader.result;
      setImage(data);
    
   
    }
  };

  useEffect(() => {
    handleGetProvince();
    handleCity();
  }, [selectedProvince]);

  useEffect(() => {
    handleDistrict();
  }, [selectedCity]);

  useEffect(() => {
    handleVillages();
  }, [selectedDistrict]);

  const handleGetProvince = () => {
    const url =
      "http://10.103.1.203:8082/publics/master_address_lookup?type=province";
    axios.get(url).then((response) => {
      setProvince(response.data.Result);
    });
  };


  const handleCity = () => {
    const urlCity =
      "http://10.103.1.203:8082/publics/master_address_lookup?type=cities&key=" +
      selectedProvince;
    axios.get(urlCity).then((response) => {
      if (response.data.Code !== "0001") {
        setpatientCities(response.data.Result);
      }
      // console.log(response.data)
    });
  };

  const handleDistrict = () => {
    const urlDistrict =
      "http://10.103.1.203:8082/publics/master_address_lookup?type=district&key=" +
      selectedCity;
    axios.get(urlDistrict).then((response) => {
      if (response.data.Code !== "0001") {
        setpatientDistrict(response.data.Result);
      }
      console.log(response.data);
    });
  };

  const handleVillages = () => {
    const urlVillages =
      "http://10.103.1.203:8082/publics/master_address_lookup?type=villages&key=" +
      selectedDistrict;
    axios.get(urlVillages).then((response) => {
      if (response.data.Code !== "0001") {
        setpatientVillages(response.data.Result);
      }
      console.log(response.data);
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = {
      patientIDNumber: patientIDNumber,
      patientName: patientName,
      patientBirthPlace: patientBirthPlace,
      patientBirthDate: patientBirthDate,
      patientGender: patientGender,
      MaritalStatus: MaritalStatus,
      patientIdType: patientIdType,
      patientEmail: patientEmail,
      patientAddress: patientAddress,
      patientPhoneNumber: patientPhoneNumber,
      patientProvince: selectedProvince,
      patientCity: selectedCity,
      patientDistrict: selectedDistrict,
      patientVillages: selectedVillage,
      patientdataIdImages: patientdataIdImages,
      ProfilePicture: ProfilePicture,
    };


 try {
  let datas={
    ImageString: imageString,
    FileType: "Profile Picture"
    }

    let imagesData={
      ImageString: imageString,
      FileType: "IDI KTP"
      }
  let access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDc3IiwiVXNlcmNvZGUiOiJVU1ItMDAwMDAxMDkwIiwiVXNlck5hbWUiOiJkaW5kYS5heXVAaW5kb2xhYi5jb20iLCJSb2xlcyI6W3siUm9sZUlkIjoiMSIsIlJvbGVOYW1lIjoiVVNFUiIsIlJvbGVEZXNjcmlwdGlvbiI6IkRlZmF1bHQgVXNlciIsIkJyYW5jaElEIjoiYWxsIn0seyJSb2xlSWQiOiIzIiwiUm9sZU5hbWUiOiJDQVNISUVSIiwiUm9sZURlc2NyaXB0aW9uIjoiQ2FzaGllclx0IiwiQnJhbmNoSUQiOiJJTkRPTEFCLVBJIn0seyJSb2xlSWQiOiI2IiwiUm9sZU5hbWUiOiJTQSIsIlJvbGVEZXNjcmlwdGlvbiI6IlN1cGVyIEFkbWluaXN0cmF0b3IiLCJCcmFuY2hJRCI6ImFsbCJ9XSwiVXNlckRhdGEiOnsiVXNlcklkIjoiMTA3NyIsIlVzZXJDb2RlIjoiVVNSLTAwMDAwMTA5MCIsIlVzZXJOYW1lIjoiZGluZGEuYXl1QGluZG9sYWIuY29tIn19.kGf0chPaEevbKFdnib_0rcs32bXS5qujSHRuq4jRk5k";
axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: access_token
  
}



let resp = await axios({
  url: "http://10.103.1.203:8082/app/upload_images", 
  data: [{datas,imagesData}],
  method: 'post',
  maxContentLength: 100000000,
  maxBodyLength: 1000000000,
  body: JSON.stringify(data)
})
 console.log("error", resp)
  // .then((res) => {
  //   console.log("Selamat", res);
  // });

 } catch (error) {
  console.log(error)
 }




   
  };
  
  return (
    <>
      <div className="row p-4 text-center">
        <div className="col-md-12">
          <h1>Patient Registration</h1>
        </div>
      </div>
      <div className="row p-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="form-group">
                  <label className="form-label">ID Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="patientIDNumber"
                    placeholder="Masukkan Nomor KTP"
                    value={patientIDNumber}
                    onChange={changeCardNumber}
                    required
                  />
                </div>
                {/* <div className="mt-3">
                  <button className="btn btn-primary lookup_nar">
                    <i className="uil uil-file-alt"></i> Lookup Patient data
                    from N A R
                  </button>
                </div> */}
                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Medical Record Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="patientMRNumber"
                      placeholder="Nomor Medical Record"
                      disabled
                      value={mrNumber}
                      onChange={changeMrNumber}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mt-3">
                    <label className="form-label">Patient Name</label>
                    <input
                      datatype="patientName"
                      name="patientName"
                      type="text"
                      className="form-control patientdata patientdata-name"
                      placeholder="Nama Pasien "
                      value={patientName}
                      onChange={changePatientName}
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Place of birth</label>
                    <input
                      type="text"
                      className="form-control"
                      name="patientBirthPlace"
                      placeholder="Tempat Lahir"
                      value={patientBirthPlace}
                      onChange={changePlaceBirth}
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Date Of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="patientBirthDate"
                      placeholder="Tanggal Lahir"
                      value={patientBirthDate}
                      onChange={changeDateBirth}
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select patientdata patientdata-maritalstatus"
                      name="MaritalStatus"
                      value={patientGender}
                      onChange={changeGender}
                      required
                    >
                      <option value="-">Pilih Jenis Kelamin </option>
                      <option value="Laki-Laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Marital Status</label>
                    <select
                      className="form-select patientdata patientdata-maritalstatus"
                      name="MaritalStatus"
                      value={MaritalStatus}
                      onChange={changeStatus}
                      required
                    >
                      <option value="-">Pilih Status </option>
                      <option value="Single">Lajang</option>
                      <option value="Married">Menikah</option>
                      <option value="Divorce">Cerai</option>
                      <option value="Widowed">Duda / Janda</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Jenis Identitas</label>
                    <select
                      className="form-select patientdata patientdata-idtype"
                      name="patientIdType"
                      value={patientIdType}
                      onChange={changeIdentitas}
                      required
                    >
                      <option value="-">Pilih Jenis Identitas </option>
                      <option value="KTP">KTP </option>
                      <option value="Passport">Passport </option>
                      <option value="SIM">SIM </option>
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="patientEmail"
                      placeholder="Alamat Email"
                      value={patientEmail}
                      onChange={changeEmail}
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Home Address</label>
                    <textarea
                      className="form-control"
                      name="patientAddress"
                      placeholder="Alamat Tempat Tinggal"
                      rows={4}
                      value={patientAddress}
                      onChange={changeAddress}
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="patientPhoneNumber"
                      placeholder="Nomor Handphone"
                      value={patientPhoneNumber}
                      onChange={changePhone}
                      required
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Provinsi</label>
                    <select
                      className="form-select patientdata patientdata-idtype"
                      name="patientProvince"
                      onChange={handleProvince}
                      required
                      // tinggal tambahin function kalau dia change aja untuk save value
                      // api satu lg mos kalo itu bisa  harusnya sama aja buat kabupaten, kelurahan dll,
                      //// w pasang api nya dlu
                    >
                      {/* <option value="choose" disabled selected="selected">Pilih Provinsi </option> */}
                      <option value={patientProvince}>Pilih Provinsi </option>
                      {getProvince()}
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Kabupaten</label>
                    <select
                      className="form-select patientdata patientdata-idtype"
                      name="patientCity"
                      onChange={handleGetCity}
                      required
                    >
                      <option value={patientCity}>Pilih Kabupaten </option>
                      {getCity()}
                    </select>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Kecamatan</label>
                    <select
                      className="form-select patientdata patientdata-idtype"
                      name="patientDistrict"
                      onChange={handleGetDistrict}
                      required
                    >
                      <option value={patientDistrict}>Pilih Kecamatan </option>
                      {getDistrict()}
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="form-group">
                    <label className="form-label">Kelurahan</label>
                    <select
                      className="form-select patientdata patientdata-idtype"
                      name="patientVillages"
                      onChange={handleGetVillages}
                      required
                    >
                      <option value={patientVillages}>Pilih Kelurahan </option>
                      {getVillages()}
                    </select>
                  </div>
                </div>

                <Upload
               

                  onChange={(e) => uploadImage(e)}
                  img={imagePreview} acccept="image/png/jpeg"

                />


                <UploadKTP
                  onChange={(e) => uploadImageKTP(e)}
                  img={imagePreview2} acccept="image/png/jpeg"
                />
           
           {/* <PostImage /> */}
                <div className="d-grid gap-2 d-md-block mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={submit}
                  >
                  
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
