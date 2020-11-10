import React, { useState } from "react";
import "./App.css";
import Contact from "./components/displayList";
import { Header } from "./components/header";

function App() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const uploadImage = async (e) => {
    const uploadFile = e.target.files[0];
    const formData = new FormData();

    formData.append("file", uploadFile);
    formData.append("upload_preset", "companyImages");

    setLoading(true);

    fetch("https://api.cloudinary.com/v1_1/djt6ve0ac/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Response API:", res);
        setImage(res.url);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error in Upload");
        console.log("Error API", err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <img
        src="https://cdna.artstation.com/p/assets/images/images/016/928/246/original/cloe-ferrara-loader1-0.gif?1554021979"
        alt="Loading..."
        style={{ width: "100%" }}
      />
    );
  }

  return (
    <div className="App">
      <div className="row">
        <div className="col-md-12">
          <Header />
          <div
            style={{ background: "cyan", margin: "20px 40px", padding: "5px" }}
          >
            <h4>Contact Picture</h4>
            <input
              type="file"
              name="file"
              placeholder="Upload an Image"
              onChange={uploadImage}
              style={{ border: "3px dotted black", padding: "10px" }}
            />

            {image ? (
              <div
                style={{
                  background: "lightgreen",
                  padding: "5px",
                  margin: "5px 280px",
                  border: "2px solid black",
                }}
              >
                <img
                  src={image}
                  width="100"
                  height="100"
                  alt="user"
                  style={{ border: "2px dotted black" }}
                />
              </div>
            ) : (
              <>
                <br />
                <strong
                  width="100"
                  height="100"
                  style={{
                    background: "lightgreen",
                    padding: "3px",
                  }}
                >
                  No Image Selected
                </strong>
              </>
            )}
          </div>
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default App;
