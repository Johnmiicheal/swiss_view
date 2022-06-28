import type { NextPage } from 'next'
// import styles from '../styles/Home.module.css'

import { Center, Flex } from "@chakra-ui/react"
import MLWidget from "../components/MLWidget";
import WeatherWidget from "../components/WeatherWidget"
import dynamic from 'next/dynamic'
import DataView from "../components/DataView";
import { useState, useEffect } from 'react';
import WelcomeScreen from "../components/WelcomeScreen";
import GasResistanceWidget from "../components/GasResistanceWidget";
import StatusWidget from '../components/StatusWidget';
import Script from "next/script"

const axios = require('axios');

const Home:NextPage = () => {
    const MapWidget = dynamic(() => import('../components/MapWidget'), {
        ssr: false
      })

    const [welcome, setWelcome] = useState<boolean>(true);
    const [gasResistance, setGasResistance] = useState<number>(0);
    

    const [mlData, setMLData] = useState({
        accuracy: undefined,
        description: undefined,
        last_update_time: undefined,
        n_samples_used: undefined
    });

    const [weatherData, setWeatherData] = useState({
        icon_image_url : "",
        label : undefined,
        wind_speed : undefined,
        wind_direction : undefined,
        baro_pressure : undefined,
        ext_temp: undefined,
        humidity: undefined,
        uv: undefined
    });

    const [statusData, setStatusData] = useState({
        last_update_time : undefined, 
        station_status : undefined,
        update_frequency: undefined, 
        uptime : 0, 
        battery_percentage: undefined 
    });



    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_info`,
            withCredentials: false
        }).then((res: any) => {
            setMLData(res.data);
        })

        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather`,
            withCredentials: false
        }).then( (res:any) => {
                setWeatherData(res.data);
                setGasResistance(res.data.gas_resistance);
            })

        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/status`,
            withCredentials: false
        }).then((res: any) => {
            setStatusData(res.data);
        })

        // setTimeout(() => setWelcome(false), 1000);
        setWelcome(false); //Open after all fetches complete
    }, [])

    return(
    <>
    
        <Script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
        integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
        crossOrigin=''/>
         {/* <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
        <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGgp&v=weekly" async defer
        ></script> */}

        {welcome?  <WelcomeScreen />  :
        <Flex 
            h='100vh'
            w="100%"
            direction='row'>
            <Flex direction="column" w="100%">
                <Flex 
                w={{base: "auto", md: "100%", lg: "100%"}}
                direction={{base: "column", md: "column", lg: "row"}}>
                    <WeatherWidget data={weatherData} />
                    <StatusWidget data={statusData} />
                    <MLWidget data={mlData} />
                </Flex>

                
                <Flex 
                w={{base: "auto", md: "100%", lg: "100%"}}
                direction={{base: "column", md: "column", lg: "row"}}>
                    <GasResistanceWidget gasResistance={gasResistance}/>
                </Flex>

                <DataView />
                {/* <Flex direction="row" px="5%"
                style = {{
                        // "& div": {
                        //     position: "relative",
                        //     width: "100%",
                        //     height: "200px"
                        // },
                        // position: "relative",
                        // width: "100%",
                        // height: "200px !important"
                        }}> */}
                    <div style={{
                        margin: "20px",
                        height: "20%"
                    }}>
                        <MapWidget />
                    </div>
            </Flex>
        </Flex>}
    </>
    )
}
export default Home;