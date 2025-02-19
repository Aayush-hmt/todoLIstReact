// import { useState } from "react"
// import { postData } from "../api/postApi";

// export default function Form({data,setData}) {
//     const [post, setPostdata] = useState({
//         title: "",
//         body: ""
//     })

//     const handleValue = (e) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         setPostdata((prev) => {
//             return {
//                 ...prev, [name]: value
//             }
//         })
//     }
//     const addPostData = async () => {
//         const resp = await postData(post);
//         console.log("responce is ",resp)
//         if (resp&&resp.status === 200) {
//             setData([ ...data, resp.data])

//             setPostdata({
//                 title: "",
//                 body: ""
//             })
//         }
//         else {
//             // setPostdata({
//             //     title: "",
//             //     body: ""
//             // })
//             console.log("data is not store successfully")

//         }
//     }

//     const handleSubmitForm = (e) => {
//         // console.log("hendle form submit successfully..")
//         e.preventDefault();
//         addPostData()
//     }

//     return (
//         <>
//             <form onSubmit={handleSubmitForm} className="bg-white p-6   w-full max-w-md mx-auto flex  space-x-2">
//                 <input
//                     type="text"
//                     placeholder="Add title"
//                     onChange={handleValue}
//                     value={post.title}
//                     name="title"
//                     className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Add Post"
//                     onChange={handleValue}
//                     value={post.body}
//                     name="body"
//                     className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <input
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//                     placeholder="Add" />


//             </form>
//         </>
//     )
// }


import { useEffect, useState } from "react";
import { postData, sedRequUpdate } from "../api/postApi";

export default function Form({ data, setData, updateData, setUpdateDate }) {
    const [post, setPostdata] = useState({
        title: "",
        body: "",
    });

    useEffect(() => {
        // console.log("edit button is clicked...")
        updateData && setPostdata(
            {

                title: updateData.title || "",
                body: updateData.body || ""
            });



    }, [updateData])

    const isEmpty = Object.entries(updateData).length === 0;
    // console.log(isEmpty, "===", updateData)
    // console.log(isEmpty)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostdata((prev) => ({ ...prev, [name]: value }));
    };

    const addPostData = async () => {
        try {
            const resp = await postData(post);
            if (resp && resp.status === 201) {
                setData([...data, resp.data]);
                setPostdata({ title: "", body: "" });
            } else {
                console.error("Data was not stored successfully");
            }
        } catch (error) {
            console.error("Error in storing data:", error);
        }
    };
    const hendleEditPostData = async () => {
        try {
            const res = await sedRequUpdate(updateData.id, post);
            if (res.status === 200) {
                console.log("success full put method called", res)
                setData((prev) => prev.map((curr) => {
                    return curr.id === res.data.id ? res.data : curr;   //res.data.id ke place pr udataeDAta.id bhi use kr sakte h 
                }))
                setPostdata({ title: "", body: "" });
                setUpdateDate({})

            }
            else {
                console.log("not success put methods")
            }

            //   console.log("responce data ",res)
            //     console.log("use to put data........  ",updateData.id,post)
        }
        catch (error) {
            console.log("error in ")

        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        // const action = e.nativeEvent.submitter.value;
        const action = e.nativeEvent.submitter.value;

        console.log("action value is ",action)

        if (action === "Add") {
            addPostData();

        }
        if (action === "Edit") {

            hendleEditPostData();

        }
    };

    return (

        <form
            onSubmit={handleSubmitForm}
            className="p-6 w-full max-w-md mx-auto flex flex-col sm:flex-row gap-4"
        >
            <input
                type="text"
                placeholder="Add title"
                onChange={handleChange}
                value={post.title}
                name="title"
                className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                type="text"
                placeholder="Add Post"
                onChange={handleChange}
                value={post.body}
                name="body"
                className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                required
            />
            <button
                className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                type="submit" value=  {isEmpty ? "Add" : "Edit"}

            >
                {isEmpty ? "Add" : "Edit"}
            </button>
        </form>
    );

}
