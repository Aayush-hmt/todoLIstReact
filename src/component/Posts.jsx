// import { useEffect, useState } from "react";
// import { getPost, deletePost } from "../api/postApi";
// import Form from "./Form";
// import { postData } from "../api/postApi";


// export default function Posts() {
//     const [data, setData] = useState([]);





//     const hendleRemovePost = async (id) => {
//         try {
//             const deleteResp = await deletePost(id);
//             // console.log(deletePost)
//             if (deleteResp.status === 200) {
//                 const newUpdatesPost = data.filter((current) => {
//                     return current.id !== id;

//                 });
//                 console.log("filtered data", newUpdatesPost)
//                 setData(newUpdatesPost)
//             }
//             else{
//                 console.log("faild to responce ....delete")
//             }
//         }
//         catch (e) {
//             console.log("delete data error ", e)

//         }


//     }
//     const getPostData = async () => {
//         const res = await getPost();
//         setData(res.data)
//         console.log("data posts ", res)
//     }
//     useEffect(() => {
//         getPostData();
//     }, [])


//     return (
//         <>
//         <section>
// <Form data={data} setData={setData}/>
//         </section>
//            <section>
//            <ol className="p-4 bg-blue-300 shadow-md">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {data.map((current) => {
//                         const { id,  body,title } = current;
//                         return<li
//                             key={id}
//                             className="p-4 bg-white rounded-lg shadow flex flex-col gap-2 h-full"
//                          >
//                             {/* Text Area */}
//                             <div className="flex-1">
//                                 <p className="text-lg font-bold text-blue-700 p-2">ID: {id}</p>
//                                 <p className="text-gray-800 font-semibold p-2">{title}</p>
//                                 <p className="text-gray-700 p-2">{body}</p>
//                             </div>

//                             {/* Button Area (Always at Bottom) */}
//                             <div className="flex gap-2 p-2 justify-start">
//                                 <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
//                                     Edit
//                                 </button>
//                                 <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition" onClick={() =>   hendleRemovePost(id)} >
//                                     Delete
//                                 </button>
//                             </div>
//                         </li>
//                     })}
//                 </div>
//             </ol>

//            </section>




//         </>
//     )
// }





import { useEffect, useState } from "react";
import { getPost, deletePost} from "../api/postApi";
import Form from "./Form";

export default function Posts() {
    const [data, setData] = useState([]);
    const [updateData, setUpdateDate] = useState({});

    // Fetch Posts
    const getPostData = async () => {
        try {
            const res = await getPost();
            if (res && res.data) {
                setData(res.data);
                console.log("Fetched posts:", res.data);
            } else {
                console.error("Failed to fetch posts");
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Delete Post
    const handleRemovePost = async (id) => {
        try {
            const deleteResp = await deletePost(id);
            if (deleteResp.status === 200) {
                setData(data.filter((item) => item.id !== id));
                console.log(`Post with ID ${id} deleted`);
                setUpdateDate({})
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        getPostData();
    }, []);

    const handleEditPost = (currentDate) => setUpdateDate(currentDate);


    return (
        <>
            <section>
                <Form data={data} setData={setData} updateData={updateData} setUpdateDate={setUpdateDate} />
            </section>

            <section>
                <ol className="p-4 bg-blue-300 shadow-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 lg:mt-20">
                        {data.map((current) => {
                            const { id, title, body } = current;
                            return (
                                <li
                                    key={id}
                                    className="p-4 bg-white rounded-lg shadow flex flex-col gap-2 h-full"
                                >
                                    {/* Post Details */}
                                    <div className="flex-1">
                                        <p className="text-lg font-bold text-blue-700 p-2">
                                            ID: {id}
                                        </p>
                                        <p className="text-gray-800 font-semibold p-2">
                                            {title}
                                        </p>
                                        <p className="text-gray-700 p-2">{body}</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 p-2 justify-start">
                                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                            onClick={() => handleEditPost(current)}>
                                            Edit
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
                                            onClick={() => handleRemovePost(id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </div>
                </ol>
            </section>
        </>
    );
}
