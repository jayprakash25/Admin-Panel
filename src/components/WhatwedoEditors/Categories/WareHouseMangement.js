import React, { useState } from "react";
import { db, storage } from "../../../Firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

function UserDetailsField({ label, children }) {
  return (
    <div className="grid grid-cols-3">
      <label className="text-[#186ad2] text-lg">{label}</label>
      {children}
    </div>
  );
}

export default function WareHouseMangement() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const [layout, setlayout] = useState({
    Tittle1: "",
    Para1: "",
    Para2: "",
    SubCat1: {
      Tittle: "DistributionWarehousing",
      image: "",
      Para: "",
    },
    SubCat2: {
      Tittle: "ConsolidationWarehousing",
      image: "",
      Para: "",
    },
    SubCat3: {
      Tittle: "InPlantWarehousing",
      image: "",
      Para: "",
    },
    SubCat4: {
      Tittle: "VALUEADDEDSERVICES",
      image: "",
      Para: "",
      List: [""],
    },
    Tittle3: "",
    SubCat5: {
      Tittle: "",
      Para: "",
    },
    SubCat6: {
      Tittle: "",
      Para: "",
    },
    SubCat7: {
      Tittle: "",
      Para: "",
    },
    SubCat8: {
      Tittle: "",
      Para: "",
    },
    Tittle4: "",
    Subcat9: {
      Tittle: "wlkewe",
      SubTittle: "pek",
      Para: "kwelkw",
      image: "",
    },
    Tittle5: "",
    Para5: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const uploadTasks = [];
      const updatedSubCats = {};

      for (let i = 1; i <= 4; i++) {
        const subCatKey = `SubCat${i}`;
        const image = layout[subCatKey]?.image;

        if (image) {
          const imageRef = ref(storage, `warehouse/${image.name}`);
          const uploadTask = uploadBytesResumable(imageRef, image);
          uploadTasks.push(uploadTask);

          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          updatedSubCats[subCatKey] = {
            ...layout[subCatKey],
            image: downloadURL,
          };
        }
      }

      const image9 = layout.Subcat9?.image;
      if (image9) {
        const imageRef9 = ref(storage, `warehouse/${image9.name}`);
        const uploadTask9 = uploadBytesResumable(imageRef9, image9);
        uploadTasks.push(uploadTask9);

        const downloadURL9 = await getDownloadURL(uploadTask9.snapshot.ref);
        updatedSubCats.Subcat9 = {
          ...layout.Subcat9,
          image: downloadURL9,
        };
      }

      await Promise.all(uploadTasks);

      const updatedLayout = {
        ...layout,
        ...updatedSubCats,
      };

      const docRef = doc(db, "WAREHOUSE", "test");
      await updateDoc(docRef, updatedLayout);
      // await setDoc(docRef, updatedLayout);
      setIsSubmitting(false);
      navigate("/whatwedo");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (event, subCatKey) => {
    const imageFile = event.target.files[0];
    setlayout((prevLayout) => ({
      ...prevLayout,
      [subCatKey]: {
        ...prevLayout[subCatKey],
        image: imageFile,
      },
    }));
  };

  const handleImageChangeSubCat9 = (event) => {
    const imageFile = event.target.files[0];
    setlayout((prevLayout) => ({
      ...prevLayout,
      Subcat9: {
        ...prevLayout.Subcat9,
        image: imageFile,
      },
    }));
  };

  const handleFieldChange = (section, field, value) => {
    // console.log("Field changed:", field, "New value:", value);
    setlayout((prevLayout) => ({
      ...prevLayout,
      [section]: {
        ...prevLayout[section],
        [field]: value,
      },
    }));
  };
  return (
    <>
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
      <form className="pl-10 space-y-4 pt-7" onSubmit={handleSubmit}>
        <UserDetailsField label="Tittle1">
          <input
            type="text"
            value={layout.Tittle1}
            onChange={(e) =>
              setlayout({
                ...layout,
                Tittle1: e.target.value,
              })
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="Para1">
          <textarea
            type="text"
            value={layout.Para1}
            onChange={(e) =>
              setlayout({
                ...layout,
                Para1: e.target.value,
              })
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>
        <UserDetailsField label="Para2">
          <textarea
            type="text"
            value={layout.Para2}
            onChange={(e) =>
              setlayout({
                ...layout,
                Para2: e.target.value,
              })
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat1image">
          <input
            type="file"
            // value={layout.SubCat1.image}
            onChange={(event) => handleImageChange(event, "1")}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat1Tittle">
          <input
            type="text"
            value={layout.SubCat1.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat1", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat1Para">
          <textarea
            type="text"
            value={layout.SubCat1.Para}
            cols={8}
            rows={8}
            onChange={(e) =>
              handleFieldChange("SubCat1", "Para", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat2image">
          <input
            type="file"
            // value={layout.SubCat2.image}
            onChange={(event) => handleImageChange(event, "2")}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat2Tittle">
          <input
            type="text"
            value={layout.SubCat2.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat2", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat2Para">
          <textarea
            type="text"
            value={layout.SubCat2.Para}
            onChange={(e) =>
              handleFieldChange("SubCat2", "Para", e.target.value)
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat3image">
          <input
            type="file"
            // value={layout.SubCat3.image}
            onChange={(event) => handleImageChange(event, "3")}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat3Tittle">
          <input
            type="text"
            value={layout.SubCat3.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat3", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat3Para">
          <textarea
            type="text"
            value={layout.SubCat3.Para}
            onChange={(e) =>
              handleFieldChange("SubCat3", "Para", e.target.value)
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat4image">
          <input
            type="file"
            // value={layout.SubCat4.image}
            onChange={(event) => handleImageChange(event, "4")}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat4Tittle">
          <input
            type="text"
            value={layout.SubCat4.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat4", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat4Para">
          <textarea
            type="text"
            value={layout.SubCat4.Para}
            onChange={(e) =>
              handleFieldChange("SubCat4", "Para", e.target.value)
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>

        <UserDetailsField label="Tittle3">
          <input
            type="text"
            value={layout.Tittle3}
            onChange={(e) =>
              setlayout({
                ...layout,
                Tittle3: e.target.value,
              })
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat5Tittle">
          <input
            type="text"
            value={layout.SubCat5.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat5", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat5Para">
          <textarea
            type="text"
            value={layout.SubCat5.Para}
            cols={8}
            rows={8}
            onChange={(e) =>
              handleFieldChange("SubCat5", "Para", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat6Tittle">
          <input
            type="text"
            value={layout.SubCat6.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat6", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat6Para">
          <textarea
            type="text"
            value={layout.SubCat6.Para}
            onChange={(e) =>
              handleFieldChange("SubCat6", "Para", e.target.value)
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat7Tittle">
          <input
            type="text"
            value={layout.SubCat7.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat7", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat7Para">
          <textarea
            type="text"
            value={layout.SubCat7.Para}
            onChange={(e) =>
              handleFieldChange("SubCat7", "Para", e.target.value)
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat8Tittle">
          <input
            type="text"
            value={layout.SubCat8.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat8", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat8Para">
          <textarea
            type="text"
            value={layout.SubCat8.Para}
            onChange={(e) =>
              handleFieldChange("SubCat8", "Para", e.target.value)
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>

        <UserDetailsField label="Tittle4">
          <input
            type="text"
            value={layout.Tittle4}
            onChange={(e) =>
              setlayout({
                ...layout,
                Tittle4: e.target.value,
              })
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat9image">
          <input
            type="file"
            onChange={handleImageChangeSubCat9}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>

        <UserDetailsField label="SubCat9Tittle">
          <input
            type="text"
            value={layout.Subcat9.Tittle}
            onChange={(e) =>
              handleFieldChange("SubCat9", "Tittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat9subTittle">
          <input
            type="text"
            value={layout.Subcat9.SubTittle}
            onChange={(e) =>
              handleFieldChange("SubCat9", "SubTittle", e.target.value)
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="SubCat9Para">
          <textarea
            type="text"
            value={layout.Subcat9.Para}
            onChange={(e) =>
              handleFieldChange("SubCat9", "Para", e.target.value)
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>

        <UserDetailsField label="Tittle5">
          <input
            type="text"
            value={layout.Tittle5}
            onChange={(e) =>
              setlayout({
                ...layout,
                Tittle5: e.target.value,
              })
            }
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2] rounded-full"
          />
        </UserDetailsField>
        <UserDetailsField label="Para5">
          <textarea
            type="text"
            value={layout.Para5}
            onChange={(e) =>
              setlayout({
                ...layout,
                Para5: e.target.value,
              })
            }
            cols={8}
            rows={8}
            className="outline-none border w-30rem font-semibold text-sm border-[#eb5f0f] px-4 py-2 focus:border-[#186ad2]  rounded-xl"
          />
        </UserDetailsField>

        <div className="flex items-center justify-center pt-10">
          <button
            className="rounded-full text-white px-20 py-2 bg-[#0B2A97]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}