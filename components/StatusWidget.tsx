import { Container} from "@chakra-ui/react";
import { Text, Box } from '@chakra-ui/react'

const axios = require('axios');

export default function StatusWidget({data}: {data: any}){

    return (
        <Container marginTop="10px" marginBottom="4%">

            <Box bg='gray.300' p={4} borderRadius='md'>
            {/* <div style={{paddingBottom:"10px", paddingTop: "10px", paddingLeft:"15px",  backgroundColor: "#e7e7e7"}}> */}
            
                    {data?.station_status == "Online" ? 
                    <div style ={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        border: "15px solid #45e336",
                        display: "inline-block",
                    }}/> 
                    :
                    <div style ={{
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        border: "10px solid #ed1a33",
                        display: "inline-block",
                    }}/> 
                     }
                <p>Status: <b>{data?.station_status} </b></p>
                <p>Last Updated: <b>{data?.last_update_time}</b></p>
                <p>Uptime: <b>{(data.uptime / 60).toFixed(2)} hours </b></p>
                <p>Battery Percentage: <b>{data?.battery_percentage}% </b></p>
                <p>Update Frequency: <b>{data?.update_frequency} </b></p>

            </Box>
            <Box bg='gray.400' mt={-3} borderRadius="0 0 7px 7px" fontSize={18} px={2} >
                <Text align='center' fontWeight={500}>Status Widget</Text>
            </Box>
        </Container>
    )
}
