import { Flex, Alert, AlertIcon, AlertTitle, Box, Heading, SimpleGrid, Image, Text, Stat, StatGroup, StatNumber, StatHelpText, StatArrow, StatLabel } from "@chakra-ui/react";
import {InfoIcon} from '@chakra-ui/icons'
import { useState, useEffect } from "react";

export default function WeatherWidget({data, uv, tickerData}: {data: any, uv:number, tickerData:any}){
    // const imSize = useBreakpointValue({base: "200px", md:"200px", sm:"200px"})
    
    const breakPoints = [2,5,7,10]
    const colors = ["green.300", "yellow.300", "orange.300", "red.300", "purple.300"]
    const [uvColor, setUVColor] = useState("green")
    
    useEffect(() => {
      let id = 0;
      breakPoints.forEach((v) => {
        if (uv > v){
          id++;
        }
      })
      setUVColor(colors[id])
      
    }, [uv])


  



    return(
        // <Container left="0px" height="100%"  marginTop="10px" marginBottom="3%">
        //     <Flex
        //     backgroundColor="#e7e7e7"
        //     paddingBottom="10px"
        //     paddingTop="10px"
        //     direction={{ base: 'row', md: 'row', sm: "column" }}>
        //         <Center>
        //             <Flex direction="column">
        //                 <img src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/weather_img`} alt={data?.label} 
        //                 width="100px" height={imSize}/>
        //                 <p><b>{(data?.label || "").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</b></p>
        //             </Flex>
        //         </Center>

        //         <Flex direction="column" px="20px">
        //             <p>Temperature: {data?.ext_temp}°C</p>
        //             <p>Wind Direction: {data?.wind_direction}</p>
        //             <p>Wind Speed: {data?.wind_speed}</p>
        //             <p>Pressure: {data?.baro_pressure}</p>
        //             <p>Humidity: {data?.humidity}</p>
        //         </Flex>
                

        //     </Flex>
        //     <h4 style={{
        //         height: "40px",
        //         backgroundColor: "lightgray",
        //         fontWeight: 'bold',
        //         fontSize: "17px"
        //     }}>Weather Widget</h4>
        // </Container>

        <Flex>
          <Flex direction='column' >
              <Flex direction={{base: 'column' , md: 'row'}} mb={5}>
                <Box
                  bg="gray.300"
                  pr={4}
                  w={80}
                  h={28}
                  borderRadius="md"
                  mr={5}
                  mb={5}
                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/wind.png" alt="wind_icon" w={16} mr={5} pl={2}/>
                      <Stat>
                        <StatLabel>Wind Speed</StatLabel>
                        <StatNumber>{data.wind_speed}km/h</StatNumber>
                        <StatHelpText>
                          <StatArrow type={tickerData.windSpeed> 0 ? "increase" : "decrease"} />
                          {tickerData.windSpeed}%
                        </StatHelpText>
                        </Stat>   
                  </Flex>
                        <Box bg='gray.400' w={80} borderRadius="0 0 7px 7px" boxShadow='md'
>
                          <Text px={2}>
                          Wind Direction: {data.wind_direction}
                          </Text>
                          </Box>                 
                </Box>

                <Box
                  bg="gray.300"
                  pl={2}
                  pr={4}
                  w={80}
                  h={28}
                  borderRadius="md"
                  boxShadow='md'

                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/barometer.png" alt="pressure" w={16} mr={5} />
                    <Stat>
                        <StatLabel>Pressure</StatLabel>
                        <StatNumber>{data.baro_pressure}psi</StatNumber>
                        <StatHelpText>
                          <StatArrow type={tickerData.pressure > 0 ? "increase" : "decrease"} />
                          {tickerData.pressure}%
                        </StatHelpText>
                        </Stat>
                  </Flex>
                </Box>
              </Flex>
              
              <Flex direction={{base: 'column' , md: 'row'}}>
                <Box
                  bg="gray.300"
                  pl={2}
                  pr={4}
                  w={80}
                  h={28}
                  mr={5}
                  mb={{ base: 5}}
                  borderRadius="md"
                  boxShadow='md'

                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/sun.png" alt="uv_index" w={16} mr={5} />
                    <Flex direction="column">
                      <Text fontWeight={400} fontSize={14} color="gray.500">
                        UV Index
                      </Text>
                      <Heading fontWeight={500}>{uv}</Heading>
                    </Flex>
                  </Flex>
                  <Flex backgroundColor={uvColor} borderRadius="0 0 7px 7px" h={8} mt={2} ml={-2} w={80} align='center' px={2}>
        
                    <InfoIcon fontSize={18} /> &nbsp;
                    UV Level: &nbsp; <b>{uv <= 2 ? "Low" : uv <= 5? "Medium": 
                    uv <= 7? "High" : uv <= 10? "Very High" : "Extremely High"}</b> 
                  </Flex>
                </Box>

                <Box
                  bg="gray.300"
                  pl={2}
                  pr={4}
                  w={80}
                  h={28}
                  borderRadius="md"
                  boxShadow='md'
                >
                  <Flex direction="row" align="center" mt={2}>
                    <Image src="/humidity.png" alt="humidity" w={16} mr={5} />
                      <Stat>
                        <StatLabel>Humidity</StatLabel>
                        <StatNumber>{data.humidity}%</StatNumber>
                        <StatHelpText>
                          <StatArrow type={tickerData.humidity> 0 ? "increase" : "decrease"} />
                          {tickerData.humidity}%
                        </StatHelpText>
                        </Stat>
                  </Flex>
                </Box>
              </Flex>



              {/* <Flex>
                <DataView />
                <Flex justify="center" mt={20} pb={20} borderRadius={20}>
                  <MapWidget />
                </Flex>
              </Flex> */}


</Flex>
            </Flex>
    )
}