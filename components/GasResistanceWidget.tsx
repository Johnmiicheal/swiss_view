import { Center, Container, Box, Text } from '@chakra-ui/react';
import {useEffect, useState} from 'react';


export default function GasResistanceWidget({gasResistance} : {gasResistance : number}){
    const TextDetails = [{
            text: "Good!",
            color: "#46eb34",
            qualifier :"Very Good"
        },
        {
            text: "Average",
            color: "#dceb34",
            qualifier :"Ok"
        },
        {
            text: "Not Good",
            color: "#ebc034",
            qualifier :"Not Good"
        },
        {
            text: "Bad!",
            color: "#eb8334",
            qualifier :"Bad"
        },
        {
            text: "Dangerous!!",
            color: "#eb5634",
            qualifier :"Dangerous!!"
        }]

    const breakPoints = [50,100,150,300,500];
    const [textProps, setTextProps] = useState<number>(0);

    useEffect(() => {
        let id = 0;
        breakPoints.forEach((val) => {
            if (gasResistance >= val){
                id++;
            }
        })
        setTextProps(Math.min(id,4));
    }, [gasResistance])

    return( 
    
        <Container marginTop="10px" marginBottom="4%">

                <Box bg='gray.300' p={4} borderRadius='md'>
                    <Center>
                        <div style ={{
                            height: "120px",
                            width: "120px",
                            borderRadius: "50%",
                            border: `10px solid ${TextDetails[textProps].color}`,
                            display: "inline-block",
                            position: "relative"
                        }}> 

                        <Center>
                                <p style={{textAlign:"center", 
                                    color:TextDetails[textProps].color, 
                                    position:"absolute",
                                    top:"38%", 
                                    // right:"29%", 
                                    fontSize:20,
                                }}>
                                    <b>{TextDetails[textProps].text}</b>
                                </p>

                        </Center>
                        </div>
                    </Center>
                    <Center mt={3}>
                        <p>Air quality is <b>{TextDetails[textProps].qualifier}</b>.</p> 
                    </Center>
                    <Center>
                        <p><b>{parseInt(gasResistance.toFixed())}</b>/500</p>
                    </Center>
                </Box>

                <Box bg='gray.400' mt={-3} borderRadius="0 0 7px 7px" fontSize={18} px={2} >
                    <Text align='center' fontWeight={500}>Air Quality</Text>
            </Box>
        </Container>
    )
    
}