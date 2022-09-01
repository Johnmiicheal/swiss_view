import { Container, Box, Text } from "@chakra-ui/react";
import LiquidFillGauge from 'react-liquid-gauge';


export default function PrecipitationWidget({data}: {data: number}){
    const fillColor = "#16aecc"

    return (<Container marginTop="10px" marginBottom="4%">

            <Box bg='gray.300' p={4} borderRadius='md' >

                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={180}
                    height={180}
                    value={Math.floor((data*100 / (500*0.2794))*1000 )/1000}
                    percent="%"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={() => {
                        const valueStyle = {
                            fontSize: 25
                        };
                        const percentStyle = {
                            fontSize: 25 * 0.9
                        };
 
                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{(data * 0.2794).toFixed(2)}</tspan>
                                <tspan style={percentStyle}>&nbsp;mm/hr</tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    circleStyle={{
                        fill: fillColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: '#444',
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: '#fff',
                        fontFamily: 'Arial'
                    }}
                />
            </Box>
            <Box bg='gray.400' mt={-3} borderRadius="0 0 7px 7px" fontSize={18} px={2} >
                    <Text align='center' fontWeight={500}>Precipitation Levels</Text>
            </Box>
            

        </Container>)
}
