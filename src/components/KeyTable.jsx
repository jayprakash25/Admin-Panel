import React from "react";
import { useNavigate } from "react-router-dom";

export default function KeyTable() {
  const data = [
    {
      ServiceTitle: "Lens and Frames	",
      Title: "Which Plan Is Right For Me?	",
      Text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] p-8">
      <div className="p-6 bg-white rounded-xl">
        <div className="flex justify-between px-6 pt-2 flex-col md:flex-row space-y-5 md:space-y-0">
          <h1 className="text-xl font-semibold">Key Benefits</h1>
          <button
            onClick={() => {
              navigate("/addnewkey");
            }}
            className="bg-[#0B2A97] px-5 py-3 text-white rounded-3xl text-sm font-semibold"
          >
            Add Key Benefits
          </button>
        </div>
        <div className="w-full py-8 ">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-y border-[#EEEEEE]">
                <tr>
                  <th className="py-2 pl-6">S.No</th>
                  <th className="py-2 pl-6">Service Title</th>
                  <th className="py-2 pl-6">Title</th>
                  <th className="py-2 pl-6">Text</th>
                  <th className="py-2 pl-6">Edit</th>
                  <th className="py-2 pl-6">Delete</th>
                </tr>
              </thead>
              {data.map((item, i) => {
                return (
                  <>
                    <tbody className="border-b border-[#EEEEEE]">
                      <tr>
                        <td className="py-8 md:pl-14 ">{i + 1}</td>
                        <td className="py-8 text-sm md:pl-6">
                          {item.ServiceTitle}
                        </td>
                        <td className="py-8 text-sm md:pl-6">{item.Title}</td>
                        <td className="py-8 pl-6">{item.Text}</td>
                        <td
                          className="py-8 pl-6 cursor-pointer text-[#7e7e7e]"
                          onClick={() => {
                            navigate(`/key/${item.ServiceTitle}`);
                          }}
                        >
                          Edit
                        </td>
                        <td className="py-8 pl-6 cursor-pointer text-[#7e7e7e]">
                          Delete
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
