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

function Abi_Radar({id}) {

    const [color, setColor] = useState('#fff')

    const options = {
        maintainAspectRatio: false,
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
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
    };
    const data = {
        labels: ['Frontend Development', 'Backend Development', 'Full-Stack Development', 'Desktop Development', 'Web Development', 'Database Development', 'Mobile Development', 'DevOps Engineering'],
        datasets: [
        {
            label: 'Skills',
            data: [3, 2, 2, 1, 5, 2, 1, 2],
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
        <div className='m-2' id={id} style={{maxWidth: '100%'}}>
            <Radar 
                id="chart"
                className='chartjs-render-monitor'
                data={data}
                options={options}
                width={500}
                height={500}
            />
        </div>
    )
}

export default Abi_Radar