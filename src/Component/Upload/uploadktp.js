import React from "react";
import img1 from "../../images/idcard.png";

// const [patientdataIdImages, setpatientdataIdImages] = useState("");
// const [ProfilePicture, setProfilePicture] = useState("");

// const changepatientdataIdImages = (e) => {
//     const value = e.target.value;
//     setpatientdataIdImages(value);
//   };

//   const changeProfilePicture = (e) => {
//     const value = e.target.value;
//     setProfilePicture(value);
//   };

const UploadKTP = ({img, ...rest}) => {
  return (
    <div className="col-md-12 ">
          <div className="card mt-3">
            <label className="p-3">Upload Foto Profile</label>
            
            <div className="card-body">
              <ul className="nav nav-tabs-custom nav-justified"
                    role="tablist">
                <li className="nav-item">
                  
              

              {img && <img
                src={img}
                alt="preview"
                width={300}
              
                className="mx-5 mx-auto d-block"
              />}
             
              <input
                type="file" {...rest}
                className="form-control upload_idcard_images mt-5"
                accept="image/png, image/jpeg"
              />
            
              </li>
              </ul>
            </div>
            
          </div>
          </div>
  )
}

export default UploadKTP;