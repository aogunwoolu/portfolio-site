import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
);

function Abi_Radar() {

    const [color, setColor] = useState('#fff')

    var options = options = {
        maintainAspectRatio:false,
        colors : ['#ffcc48'],
        // legend: {
        //     display: false
        // },
        scale: {
            ticks: {
                // display: false,
                maxTicksLimit: 3
            },
            r: {
                grid: {
                    color: '#fff'
                }
            }
        },
        // gridLines: {
        //     display: false
        // }
    }
    var data = {
        labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
        datasets: [
        {
            label: '# of Votes',
            data: [2, 9, 3, 5, 2, 3],
            borderColor: color,
            borderWidth: 1,
        },
        ],
    };

    useEffect(() => {
        var ctx = document.getElementById("chart").getContext("2d"); 

        // /*** Gradient ***/
        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#b556ff');   
        gradient.addColorStop(1, '#4001f9');

        setColor(gradient);
    }, []);

    return (
        <div style={{height:'500px',width:'500px'}}>
            <Radar 
                id="chart"
                className='chartjs-render-monitor'
                data={data}
                options={options}
            />
        </div>
    )
}

export default Abi_Radar