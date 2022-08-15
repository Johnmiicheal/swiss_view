import { Center, Container, Switch, Box, Text} from "@chakra-ui/react";
import { Button} from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useEffect, useState } from "react";

const axios = require('axios');

export default function MLWidget({data, setNotification}: {data: any, setNotification: any}) {

    const [input, setInput] = useState<string>('0');
    const [mode, setMode] = useState<string>("");
    const [disableToggle, setDisableToggle] = useState<boolean>(true);
    const [switchIsChecked, setSwitchIsChecked] = useState<boolean>(false);

    const toggleMode = () => {
        setTimeout(() => setDisableToggle(true), 100);
        axios({
            method: 'post',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/toggle_mode`,
            withCredentials: false
        }).then((res: any) => {
            if(mode == "machine_learning"){
                setMode("weather_api")
                setNotification({
                    message: `Mode has been changed to weather_api`,
                    type: "notif"
                })
            }else{
                setMode("machine_learning")
                setNotification({
                    message: `Mode has been changed to machine_learning`,
                    type: "notif"
                })
            }
            setTimeout(() => setNotification({message: null, type: "notif"}), 1000);
        })
        setTimeout(() => setDisableToggle(false), 2000);
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/get_mode`,
            withCredentials: false
        }).then((res: any) => {
            setMode(res.data);
            setDisableToggle(false)
        })
    }, [])


    useEffect(() => {
        if(mode == "machine_learning"){
            setSwitchIsChecked(true);
        }else{
            setSwitchIsChecked(false);
        }
    }, 
    [mode])

    const updateTrainingFreq = () => {
        //validate string to number, else raise error
            let newFreq = Number(input);
            if (isNaN(newFreq)){
                setNotification({
                    message: `Error occured in setting training frequency. Ensure your input 
                                is a number that is greater than 2 and try again.`,
                    type: "error"
                })
                setTimeout(() => setNotification({message: null, type: "notif"}), 1000);

            }

            else if (newFreq > 2){
                axios({
                    method: 'post',
                    url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/set_training_freq/${newFreq}`,
                    withCredentials: false
                }).then((res: any) => {
                   //success message here
                   setInput(newFreq.toString());
                    setNotification({
                        message: `Training Frequency has been updated!`,
                        type: "notif"
                    })
                    setTimeout(() => setNotification({message: null, type: "notif"}), 1000);
                })
            }
    } 
    

    useEffect(() => {
        axios({
            method: 'get',
            url: ` ${process.env.NEXT_PUBLIC_REST_ENDPOINT}/get_training_freq`,
            withCredentials: false
        }).then((res: any) => {
            setInput(res.data);
        })
    
    }, [])

    return (
        <Container right="0px" borderRadius="20%" marginTop="10px" >
            <Box bg='gray.300' p={4} borderRadius='md'>
                <Center>
                    <img src={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_img`}
                     alt="Decision Tree" width="150px" height="200px" 
                     style={{background: "#e7e7e7"}}/>
                </Center>
                <br/>
                <Center>
                    <Link href={`${process.env.NEXT_PUBLIC_REST_ENDPOINT}/ml_img`}isExternal>
                        <u>Model Image URL </u> <ExternalLinkIcon mx='2px' />
                    </Link>
                </Center>
                <br/>

                <div style={{paddingLeft: "15px"}}>
                    <p>
                        Machine Learning: &nbsp;&nbsp;
                        <Switch 
                        size="md"
                        defaultChecked={mode == "machine_learning"} 
                        onChange={toggleMode} isDisabled={disableToggle}
                        isChecked={switchIsChecked}
                        />
                    </p>
                    <p>Last Model Training Time : <b>{data?.last_update_time}</b></p>
                    <p>N Samples Used: <b>{data?.n_samples_used}</b> </p>
                    <p>Training Frequency: &nbsp;
                        <input type="text" 
                        value={input} 
                        size={1}
                        onChange={(e) => setInput(e.target.value)}/> 
                        &nbsp; days &nbsp;&nbsp;
                    <Button 
                    size="md"
                    height={"80%"}
                    colorScheme='green' 
                    onClick={updateTrainingFreq}>
                        Set
                    </Button></p>
                </div>
                
            <br/>
            </Box>
            
            {/*
            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray",
                fontWeight: 'bold',
                fontSize: "18px"
            }}>ML Widget</h4> */}
            <Box bg='gray.400' mt={-3} borderRadius="0 0 7px 7px" fontSize={18} px={2} >
                <Text align='center' fontWeight={500}>ML Widget</Text>
            </Box>
        </Container>
    )
}