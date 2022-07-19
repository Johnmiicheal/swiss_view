import type { NextPage } from "next";
import {
  Flex,
  SimpleGrid,
  Box,
  Spacer,
  Heading,
  Text,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AspectRatio,
} from "@chakra-ui/react";
import MLWidget from "../components/MLWidget";
import SettingsView from "../components/SettingsView";
import WeatherWidget from "../components/WeatherWidget";
import dynamic from "next/dynamic";
import DataView from "../components/DataView";
import { useState, useEffect } from "react";
import WelcomeScreen from "../components/WelcomeScreen";
import GasResistanceWidget from "../components/GasResistanceWidget";
import UVWidget from "../components/UVWidget";
import PrecipitationWidget from "../components/PrecipitationWidget";
import StatusWidget from "../components/StatusWidget";
import Notification from "../components/Notification";
import Layout from "../components/Layout";

const axios = require("axios");

type notificationType = {
  message: string | null;
  type: "err" | "notif";
};

const Home: NextPage = () => {

  const [welcome, setWelcome] = useState<boolean>(true);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [page, setPage] = useState<string>("/");
  const [gasResistance, setGasResistance] = useState<number>(0);
  const [precipitation, setPrecipitation] = useState<number>(0);
  const [uv, setUV] = useState<number>(0);
  const [notification, setNotification] = useState<notificationType>({
    message: null,
    type: "notif",
  });

  const [mlData, setMLData] = useState({
    accuracy: undefined,
    description: undefined,
    last_update_time: undefined,
    n_samples_used: undefined,
  });

  const [weatherData, setWeatherData] = useState({
    icon_image_url: "",
    label: undefined,
    wind_speed: undefined,
    wind_direction: undefined,
    baro_pressure: undefined,
    ext_temp: undefined,
    humidity: undefined,
    uv: undefined,
  });

  const [statusData, setStatusData] = useState({
    last_update_time: undefined,
    station_status: undefined,
    update_frequency: undefined,
    uptime: 0,
    battery_percentage: undefined,
  });

  useEffect(() => {
    axios({
      method: "get",
      url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_info`,
      withCredentials: false,
    }).then((res: any) => {
      setMLData(res.data);
    });

    axios({
      method: "get",
      url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather`,
      withCredentials: false,
    }).then((res: any) => {
      setWeatherData(res.data);
      setGasResistance(res.data.gas_resistance);
      setPrecipitation(res.data.precipitation_mmhr);
      setUV(res.data.uv);
    });

    axios({
      method: "get",
      url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/status`,
      withCredentials: false,
    }).then((res: any) => {
      setStatusData(res.data);
    });

    // setTimeout(() => setWelcome(false), 1000)left ;
    setWelcome(false);
    setTimeout(() => setShowMap(true), 6000);
  }, []);

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {
        welcome ? (
          <WelcomeScreen />
        ) : (

          <Layout page={page} setPage={setPage}>
            <Flex direction='row' justify='space-between'>
              <Flex direction='column'>

            {page === "/"? 
            <>
              <Heading fontSize={24} ml={{ base: 0, md: -16 }}>
                Today&#39;s Overview
              </Heading>

              <WeatherWidget data={weatherData} uv={uv} />

              <AspectRatio 
                ratio={4 / 3} 
                w={{base: "350px", md: "680px"}} 
                h={{ base: "200px", md: "300px"}} 
                mt={10} ml={{ base: -16, md: -16 }} 
                borderRadius='md' 
                borderWidth='2px' 
                borderColor='gray.300' 
                >
                <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2199119983507!2d3.8918724396182944!3d7.4409033119709305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3585d348366907b9!2zN8KwMjYnMjcuOCJOIDPCsDUzJzMxLjYiRQ!5e0!3m2!1sen!2sng!4v1657699637955!5m2!1sen!2sng" width="600" height="450" allowFullScreen loading="lazy"  />
            </AspectRatio>
              
            
            </>
            : <></>}


            {page === "/graphs"? 
            <>
              <Flex ml={{ base: -5, md: 16, lg: 60}}>
                <DataView />
              </Flex>
            </>
            : <></>}


            {page === "/settings"? 
            <SettingsView setNotification={setNotification} />
            : <></>}


            <Spacer />
            </Flex>

            {/* RIGHT-SIDEBAR CODE */}
            <Flex
              justifyContent="flex-end"
              display={{ base: "none", lg: "flex" }}
              // w='full'
            >
              <Box
                w={80}
                mr={-20}
                h="100vh"
                bgImg="/swisright.png"
                top="0"
                zIndex={2}
                pos="fixed"
              >
                <Flex px={3} mt={2} direction="row" justify="space-between">
                  <Flex direction="column">
                    <Heading
                      color="white"
                      fontWeight={600}
                      fontSize={20}
                      mb={2}
                    >
                      {process.env.NEXT_PUBLIC_FULL_NAME}
                    </Heading>
                    <Text color="white" fontWeight={400} fontSize={16}>
                      {process.env.NEXT_PUBLIC_YOUR_LOCATION}
                    </Text>
                  </Flex>

                  <Text color="white" fontWeight={600}>
                    {" "}
                    {time}{" "}
                  </Text>
                </Flex>
                <Flex direction="column" mt={10}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather_img`}
                    alt={weatherData?.label}
                    w={24}
                  />
                  <Flex mx={8} align="center">
                    <Heading color="white" fontWeight={500} mr={8}>
                      {" "}
                      {weatherData?.ext_temp}º C{" "}
                    </Heading>
                    <Text color="white">
                      {" "}
                      {(weatherData?.label || "").replace(
                        /(^\w{1})|(\s+\w{1})/g,
                        (letter) => letter.toUpperCase()
                      )}{" "}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            </Flex>
          </Layout>
        )

        // <Flex
        //     h='100vh'
        //     w="100%"
        //     direction='row'>
        //     <Flex direction="column" w="100%">
        //         <Notification message={notification.message} type={notification.type} />
        //         <Flex
        //         w={{base: "auto", md: "100%", lg: "100%"}}
        //         direction={{base: "column", md: "column", lg: "row"}}>
        //             <WeatherWidget data={weatherData} />
        //             <StatusWidget data={statusData} setNotification={setNotification} />
        //             <MLWidget data={mlData} setNotification={setNotification} />
        //         </Flex>

        //         <Flex
        //         w={{base: "auto", md: "100%", lg: "100%"}}
        //         paddingTop="3%"
        //         direction={{base: "column", md: "column", lg: "row"}}>
        //             <GasResistanceWidget gasResistance={gasResistance/100}/>
        //             <PrecipitationWidget data={precipitation} />
        //             <UVWidget data={uv} />
        //         </Flex>

        //         <DataView />
        //         {/* <Flex direction="row" px="5%"
        //         style = {{
        //                 // "& div": {
        //                 //     position: "relative",
        //                 //     width: "100%",
        //                 //     height: "200px"
        //                 // },
        //                 // position: "relative",
        //                 // width: "100%",
        //                 // height: "200px !important"
        //                 }}> */}
        //             <Flex justify='center' mt={20} pb={20} borderRadius=>
        //                 <MapWidget />
        //             </Flex>

        //     </Flex>
        // </Flex>
      }
    </>
  );
};
export default Home;
