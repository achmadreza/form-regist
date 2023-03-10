import React, {useState} from "react";
import axios from "axios";

 const PostImage=()=>{
    const [image, setImage]= useState(null);
    const [previewImage, setPreviewImage]= useState(null);


const handleImageChange= (e)=>{
    const selectedImage= e.target.files[0]
    setImage(selectedImage);
    setPreviewImage(URL.createObjectURL(selectedImage));
}

const handleSubmit= async (e)=>{
    e.preventDefault();
 const data= {
    "imageString": image,
    "FileType": "ProfilePicture"
 }

    let access_token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiIxMDc3IiwiVXNlcmNvZGUiOiJVU1ItMDAwMDAxMDkwIiwiVXNlck5hbWUiOiJkaW5kYS5heXVAaW5kb2xhYi5jb20iLCJSb2xlcyI6W3siUm9sZUlkIjoiMSIsIlJvbGVOYW1lIjoiVVNFUiIsIlJvbGVEZXNjcmlwdGlvbiI6IkRlZmF1bHQgVXNlciIsIkJyYW5jaElEIjoiYWxsIn0seyJSb2xlSWQiOiIzIiwiUm9sZU5hbWUiOiJDQVNISUVSIiwiUm9sZURlc2NyaXB0aW9uIjoiQ2FzaGllclx0IiwiQnJhbmNoSUQiOiJJTkRPTEFCLVBJIn0seyJSb2xlSWQiOiI2IiwiUm9sZU5hbWUiOiJTQSIsIlJvbGVEZXNjcmlwdGlvbiI6IlN1cGVyIEFkbWluaXN0cmF0b3IiLCJCcmFuY2hJRCI6ImFsbCJ9XSwiVXNlckRhdGEiOnsiVXNlcklkIjoiMTA3NyIsIlVzZXJDb2RlIjoiVVNSLTAwMDAwMTA5MCIsIlVzZXJOYW1lIjoiZGluZGEuYXl1QGluZG9sYWIuY29tIn19.kGf0chPaEevbKFdnib_0rcs32bXS5qujSHRuq4jRk5k";

try {
    const response = await axios.post("http://10.103.1.203:8082/app/upload_images", data,{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(data)
    })

console.log("berhasil", response)
} 


catch (error) {
    console.log("ini error", error)
}

}

return(
    <div>
        <form>
        <input type="file" onChange={handleImageChange}/>
        <button type="submit"onClick={handleSubmit}>Upload Image dan Foto</button>
      

{previewImage && <img src={previewImage} alt="preview"/>}   
</form>
</div>
    )


}



export default PostImage;
