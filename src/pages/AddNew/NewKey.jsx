import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { RotatingLines } from "react-loader-spinner";
import ReactQuill from "react-quill";

export default function NewKey() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cat = [
    "Select Category",
    "Fast Moving Consumer Goods (FMCG)",
    "Fast Moving Consumer Durables (FMCD)",
    "Fashion & Lifestyle",
    "Home & Furniture",
    "Auto-Mobility",
    "Telecom",
    "Fruits & vegetables",
    "Diary Farm",
    "Ecommerce Fulfillment",
    "Chemical",
    "Pharma",
    "Lens and Frames",
  ];
  const [form, setForm] = useState({
    Category: "",
    Title: "",
    Text: "",
  });

  const handleQuillChange = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      Text: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await setDoc(doc(db, "KEY-BENEFITS", form.Category), form);
      setIsSubmitting(false);
      navigate("/admin-panel/key-benefits");
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="flex">
      {isSubmitting && ( // Render loader only when isSubmitting is true
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-100">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={true}
          />
        </div>
      )}
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="bg-[#F9F9F9] w-full ">
        <Navbar />
        <div className="bg-white  py-4 m-8 rounded-3xl">
          <div className="border-b font-semibold text-xl px-8 py-2">
            <h1>Add Key Benefits</h1>
          </div>
          <form className="p-8    space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-5 pr-5 md:grid-cols-3 md:gap-0 md:pr-0">
              <label className="text-[#186ad2] text-lg">
                Category <span className="text-red-500 text-lg">*</span>
              </label>
              <select
                defaultValue={cat[0]}
                value={form.Category}
                onChange={(e) => {
                  setForm({
                    ...form,
                    Category: e.target.value,
                  });
                }}
                className="outline-none border w-64 md:w-80 lg:w-[30rem] font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
              >
                {cat.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="grid gap-5 pr-5 md:grid-cols-3 md:gap-0 md:pr-0">
              <label className="text-[#186ad2] text-lg">
                Title <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                value={form.Title}
                onChange={(e) => {
                  setForm({
                    ...form,
                    Title: e.target.value,
                  });
                }}
                placeholder="Which Plan Is Right For Me?"
                className="outline-none border w-64 md:w-80 lg:w-[30rem] font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
              />
            </div>
            <div className=" grid gap-5 pr-5 md:grid-cols-3 md:gap-0 md:pr-0">
              <label className="text-[#186ad2] text-lg">Text</label>
              <ReactQuill
                value={form.Text}
                onChange={handleQuillChange}
                className="w-64 md:w-80 lg:w-[30rem]"
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
    </div>
  );
}
