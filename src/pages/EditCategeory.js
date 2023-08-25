import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db, storage } from "../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function EditCategeory() {
  const { categoryid } = useParams();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    Name: "",
    Image: null,
  });

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      Image: imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageRef = ref(storage, `images/${Image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, Image);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error(error);
        },
        async () => {
          // download url for upload file
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const formData = {
            ...form,
            Image: downloadURL,
          };

          const docRef = doc(db, "CATEGORIES", categoryid);
          await updateDoc(docRef, formData);
          navigate("/categories");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body className="flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="bg-[#F9F9F9] w-full  lg:ml-24">
        <Navbar />
        <div className="py-4 m-8 bg-white rounded-3xl">
          <div className="px-8 py-2 text-xl font-semibold border-b">
            <h1>Edit Category</h1>
          </div>
          <form className="p-8 space-y-4 pl-14" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 text-lg">
              <label className="text-[#186ad2] text-lg">
                Category Name <span className="text-lg text-red-500">*</span>
              </label>
              <input
                value={form.Name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    Name: e.target.value,
                  });
                }}
                placeholder="Which Plan Is Right For Me?"
                className="outline-none border w-[30rem] font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
              />
            </div>
            <div className="grid grid-cols-3 text-lg">
              <label className="text-[#186ad2] text-lg">
                Category Image <span className="text-lg text-red-500">*</span>
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                placeholder="Which Plan Is Right For Me?"
                className="outline-none border w-[30rem] font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
              />
            </div>

            <div className="flex items-center justify-center pt-10">
              <button
                className="rounded-full text-white px-4 py-2 bg-[#0B2A97]"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </body>
  );
}
