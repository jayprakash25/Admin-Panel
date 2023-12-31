import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./../././../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export default function ComTable() {
  const navigate = useNavigate();

  // const data = [
  //   {
  //     id: 1,
  //     category: "Lens and Frames",
  //     Tittle: "  Fast Moving Consumer Goods (FMCG)",
  //     date: "1-01-1970",
  //     Venture: "AI SILKS KALAMANDIR LTD",
  //     Phone: "9837742555",
  //     Name: "PRADEEP",
  //     Type: "User",
  //   },
  // ];

  const [data, setData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    setIsSubmitting(true);
    const querySnapshot = await getDocs(collection(db, "COMPANIES"));
    const enquiryData = querySnapshot.docs.map((doc) => doc.data());
    setData(enquiryData);

    setIsSubmitting(false);
  };

  const Deletedoc = async (docid) => {
    try {
      alert("Are you sure you want to delete?");
      await deleteDoc(doc(db, "COLLECTIONNAME", docid));
      alert("Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
      <div className="bg-[#F9F9F9] p-8">
        <div className="p-6 bg-white rounded-xl">
          <div className="flex flex-col justify-between px-6 pt-2 space-y-5 md:flex-row md:space-y-0">
            <h1 className="text-xl font-semibold">List of Companies</h1>
            <Link to={"/addnewcompany"}>
              <button className="bg-[#0B2A97] px-3 py-3 text-white rounded-3xl text-sm font-semibold">
                Add Company
              </button>
            </Link>
          </div>
          <div className="w-full py-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-y border-[#EEEEEE]">
                  <tr>
                    <th className="py-2 md:pl-3">S.No</th>
                    <th className="py-2 pl-3">Company ID</th>
                    <th className="py-2 pl-3">Username</th>
                    <th className="py-2 pl-3">Expiry date</th>
                    <th className="py-2 pl-3">Business</th>
                    <th className="py-2 pl-3">Individual</th>
                    <th className="py-2 pl-3">P Mobile no.</th>
                    <th className="py-2 pl-3">Users</th>
                    {/* <th className="py-2 pl-3">View</th> */}
                    <th className="py-2 pl-3">Edit</th>
                    <th className="py-2 pl-3">Delete</th>
                  </tr>
                </thead>
                <tbody className="border-b border-[#EEEEEE] text-sm">
                  {data?.map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        <tr>
                          <td className="py-8 md:pl-10 ">{i + 1}</td>
                          <td className="py-8 text-sm md:pl-3">
                            {item.category}
                          </td>
                          <td className="py-8 text-sm md:pl-3">{item.Name}</td>
                          <td className="py-8 pl-3">{item.DOB}</td>
                          <td className="py-8 pl-3">{item.Business}</td>
                          <td className="py-8 pl-3">{item.Name}</td>
                          <td className="py-8 pl-3">{item.Mobile}</td>
                          <td className="py-8 pl-3">{item.Users}</td>
                          <td
                            className="py-8 pl-3 cursor-pointer"
                            onClick={() => {
                              navigate(`/edit/${i + 1}`);
                            }}
                          >
                            Edit
                          </td>
                          <td
                            className="py-8 pl-3"
                            onClick={() => {
                              Deletedoc(item.id);
                            }}
                          >
                            Delete
                          </td>
                          <td className="py-8 pl-3 cursor-pointer">Delete</td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
