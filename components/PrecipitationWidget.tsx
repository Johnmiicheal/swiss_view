import { Container } from "@chakra-ui/react";
import LiquidFillGauge from 'react-liquid-gauge';


export default function PrecipitationWidget({data}: {data: number}){
    const fillColor = "#16aecc"

    return (<Container marginTop="10px" marginBottom="4%">

            <div style={{paddingBottom:"10px", paddingTop: "10px", backgroundColor: "#e7e7e7"}}>

                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={180}
                    height={180}
                    value={Math.floor((data*100 / (500*0.2974))*1000 )/1000}
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
                                <tspan className="value" style={valueStyle}>{data.toFixed(2)}</tspan>
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
            </div>
            <h4 style={{
                height: "40px",
                backgroundColor: "lightgray",
                fontWeight: 'bold',
                fontSize: "17px"
            }}>Precipitation Levels</h4>

        </Container>)
}