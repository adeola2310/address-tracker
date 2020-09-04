import React, {useEffect, useState} from 'react';
import icon from "../src/images/icon-arrow.svg"
import './App.css';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import axios from 'axios'
import Loader from "./components/loader/loader";



function App() {
    const [long, setLong] = useState(3.406448);
    const [lat, setLat] = useState(6.465422);
    const [zoom, setZoom] = useState(13);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);
    const [searchedData, setSearchedData] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const position = [lat, long];
    const API_KEY = "at_DKIHDUVwU5tupGUBeO5UX8FvjbDoS";

const fetchData = async ()=>{
   axios.get(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${searchText}`)
       .then(res=>{
           const data = res?.data;
           setData(data)
           console.log(data)
       })
       .catch((error) => {
           console.log(error)
       })
}

useEffect(()=>{
    fetchData()
}, [])


    const performSearch = (searchText) =>{
    console.log(searchText)
        const searchedData = data?.data?.filter((ele)=>{
            let name = ele.data.ip
            return name.includes(searchText.toLowerCase())
        })
        setSearchedData(searchedData);
        console.log(searchedData)
        return searchedData

    }
    const handleChange = (e)=>{
        const searchTerm = e.target.value
        setSearchText(searchTerm);
        performSearch(searchTerm)
    }

    const ipData = searchText ? searchedData : data?.data

    return (
        <>
            <div className="header">
                <h3> IP Address Tracker</h3>


                <div className="search">
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleChange}
                        placeholder="Search for any IP address or location.."
                    />
                    <button
                        type="submit"
                        className="button"
                        onClick={()=>performSearch}>
                        <img src={icon} alt=""/>
                    </button>
                </div>

            </div>


                <div className="info">

                    <div className="info-list">

                        <div className="one">
                            <h6>IP Address</h6>
                            <h1>{data.ip}</h1>
                        </div>
                        <div className="one">
                            <h6>Location</h6>
                            <h1>{data.location?.region}, {data.location?.country}</h1>
                        </div>
                        <div className="one">
                            <h6>Time Zone</h6>
                            <h1>UTC {data?.location?.timezone}</h1>
                        </div>
                        <div className="one">
                            <h6>ISP</h6>
                            {
                                isLoading ? <Loader/> : <h1>{data.isp}</h1>
                            }
                            {/*<h1>*/}
                            {/*    /!*isLoading ? <Loader/> :*!/*/}
                            {/*    /!*{data.isp}*!/*/}

                            {/*    isLoading ? <Loader/> : {data.isp}*/}
                            {/*</h1>*/}
                        </div>
                    </div>
                </div>


                <Map center={position} zoom={zoom}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                </Marker>
                </Map>



        </>
    );
}

export default App;
