import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../Firebase";

export default function TrucksTable() {
  // const data = [
  //   {
  //     id: 1,
  //     Vendorid: "30001",
  //     Vendor: "  Fast Moving Consumer Goods (FMCG)",
  //     TruckType: "Tata Zip",
  //     LoadType: "Part",
  //     State: "Andhra Pradesh	",
  //     MultiPointDelivery: "yes",
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
    const querySnapshot = await getDocs(collection(db, "TRUCKS"));
    const enquiryData = querySnapshot.docs.map((doc) => doc.data());
    setData(enquiryData);

    setIsSubmitting(false);
  };
  const navigate = useNavigate();

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
          <div className="flex justify-between px-6 pt-2">
            <h1 className="text-xl font-semibold">Trucks</h1>
          </div>
          <div className="w-full py-8 pt-14">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-y border-[#EEEEEE]">
                  <tr>
                    <th className="py-2 pl-3">S.No</th>
                    <th className="py-2 pl-3">Vendor ID</th>
                    <th className="py-2 pl-3">Vendor</th>
                    <th className="py-2 pl-3">Truck Type</th>
                    <th className="py-2 pl-3">Load Type</th>
                    <th className="py-2 pl-3">State</th>
                    <th className="py-2 pl-3">Multi Point Delivery</th>
                    <th className="py-2 pl-3">Status</th>
                    <th className="py-2 pl-3">Edit</th>
                    <th className="py-2 pl-3">Delete</th>
                  </tr>
                </thead>
                <tbody className="border-b border-[#EEEEEE] ">
                  {data.map((item, i) => {
                    return (
                      <>
                        <tr>
                          <td className="py-8 md:pl-10 ">{i + 1}</td>
                          <td className="py-8 text-sm md:pl-3">3000{i + 1}</td>
                          <td className="py-8 text-sm md:pl-3">
                            {item.vendor}
                          </td>
                          <td className="py-8 pl-3">{item.truckType}</td>
                          <td className="py-8 pl-3">{item.loadType}</td>
                          <td className="py-8 pl-3">{item.serviceState}</td>
                          <td className="py-8 pl-10">
                            {item.multiPointDelivery}
                          </td>
                          <td className="py-8 pl-3">
                            <select className="px-4 outline-none border border-[#e2e2e2] py-1 text-[#333333] rounded-md">
                              <option>Select Status</option>
                              <option>Active</option>
                              <option>In-Active</option>
                              <option>Block</option>
                            </select>
                          </td>
                          <td
                            className="py-8 pl-3 cursor-pointer text-[#7e7e7e]"
                            onClick={() => {
                              navigate(`/truckedit/${i + 1}`);
                            }}
                          >
                            Edit
                          </td>
                          <td className="py-8 pl-3 cursor-pointer text-[#7e7e7e]">
                            Delete
                          </td>
                        </tr>
                      </>
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
