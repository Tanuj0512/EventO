import React, { useState } from 'react';
import './event.css';  // Don't forget to import your CSS file

const Image = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen, yet!');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        setFile(reader.result);
      };

      reader.readAsDataURL(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileName('No file chosen, yet!');
  };

  return (
    
              
              
    <div className={`cont ${file ? 'active' : ''}`}>
      <div className="wrapper">
        <div className="image">
        {file && (
                 <a href={URL.createObjectURL(file)} target="_blank">
                 {console.log(URL.createObjectURL(file))}
                  <img
                    src={URL.createObjectURL(file)}
                    alt="user-uploaded media"
                   
                  />
                 </a> 
              )}
        </div>

        {/* <div className="content1">
          <div className="icon">
            <i className="fas fa-cloud-upload-alt"></i>
          </div>
        </div>

        <div id="cancel-btn"    onClick={clearFile}>
          <i className="fas fa-times"></i>
        </div> */}
      </div>
      
      <input
           
           type="file"
           id="custom-btn"
           
           onChange={(e) => setFile(e.target.files[0])}
           accept="image/, video/"
         />

    </div>

    
   
  );
};

export default Image;
