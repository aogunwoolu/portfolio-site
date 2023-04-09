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

    var options = {
        maintainAspectRatio:false,
        colors : ['#ffcc48'],
        legend: {
            display: false
        },
        scales: {
            r: {
                ticks: {
                    stepSize: 20,
                    textStrokeColor: 'rgb(54, 162, 235)',
                    color: 'rgba(240, 240, 240, 0.5)',
                    backdropColor: 'rgb(47, 56, 62)'
                },
                angleLines: {
                    color: '#0c0c0c',
                },

                grid: {
                    color: "#fff",
                },

            },
        }
    }
    var data = {
        labels: ['Frontend Development', 'Backend Development', 'Full-Stack Development', 'Desktop Development', 'Web Development', 'Database Development', 'Mobile Development', 'DevOps Engineering'],
        datasets: [
        {
            label: 'Skills',
            data: [7, 9, 8, 5, 9, 10, 5, 7],
            borderColor: color,
            borderWidth: 3,
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
        <div style={{maxWidth: '100%'}}>
            <Radar 
                id="chart"
                className='chartjs-render-monitor'
                data={data}
                options={options}
                width={400}
                height={400}
            />
        </div>
    )
}

export default Abi_Radar