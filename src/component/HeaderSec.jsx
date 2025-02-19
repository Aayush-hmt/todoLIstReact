import { useState } from "react"

export default function HeaderSec() {
   const data = useState({title:"",post:""});
    return (
        <div>
            <input type="text" placeholder="add title" value={data.title} onChange={data.title}/>
            <input type="text" placeholder="add post" value={data.post} onChange={data.post}/>
            <button onClick={hendleAddPost}>ADD</button>
        </div>
    )
}
