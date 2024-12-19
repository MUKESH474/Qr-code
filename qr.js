import './qr.css'

import { useState } from 'react'

const Qr = () => {
    const[img,setimg]= useState("")
    const[loading,setloading]=useState(false)
    const[qrdata,setqrdata]=useState('http://google.com/')
    const[size,setsize]=useState("150")
    function download(name){
        fetch(img)
        .then((res)=>res.blob())
        .then((blob)=>{
            const link =document.createElement("a")
            link.href=URL.createObjectURL(blob);
            link.document="qrcode.png"
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link)
            
        })
    }
    async function generate(){
        setloading(true)
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`
            setimg(url)
        }
        catch (error) {
            console.log('error')
        }
        finally{
            setloading(false)
        }
    }
  return (

    <div className='container'>
        <h1>Qr Code Generater</h1>
    {img && <img src={img}  className='qrimg'  />}
    {loading && <p> Loading...</p> }
    <label> Data for Qr code</label>
    <input type='text' placeholder='data for Qr' value={qrdata} onChange={(e)=>setqrdata(e.target.value)}/>
    <label> Image size</label>
    <input type='text' placeholder='Enter the size of the image' value={size} onChange={(e)=>setsize(e.target.value)} />
    <div>
    <button className='genbuuton' onClick={generate} >Generat Qr</button>
    <button className='genbuuton1' onClick={download}  >Download Qr</button>
    </div>
    </div>
  )
}

export default Qr
