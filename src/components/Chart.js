import React, { Component } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';

const data = [
    {
        year: '2010',
        mp: 4000,
        up: 2400,
        del: 2400,
    },
    {
        year: '2011',
        mp: 3000,
        up: 1398,
        del: 2210,
    },
    {
        year: '2012',
        mp: 2000,
        up: 9800,
        del: 2290,
    },
    {
        year: '2013',
        mp: 2780,
        up: 3908,
        del: 2000,
    },
    {
        year: '2014',
        mp: 1890,
        up: 4800,
        del: 2181,
    },
    {
        year: '2015',
        mp: 2390,
        up: 3800,
        del: 2500,
    },
    {
        year: '2016',
        mp: 3490,
        up: 4300,
        del: 2100,
    },
    {
        year: '2017',
        mp: 3490,
        up: 4300,
        del: 2100,
    },
    {
        year: '2018',
        mp: 3490,
        up: 4300,
        del: 2100,
    },
    {
        year: '2019',
        mp: 3490,
        up: 4300,
        del: 2100,
    },
    {
        year: '2020',
        mp: 3490,
        up: 4300,
        del: 2100,
    },
];

class Chart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lineData: []
        }
    }

    async componentDidMount() {
        const chardData = await axios.get("https://my.api.mockaroo.com/rainfall.json?key=652173a0")
        // console.log('chardData = ', chardData);
        // if(chardData.data)
        this.setState({ lineData: chardData.data })
    }

    render() {
        const linedata = this.state.lineData
        // console.log('linedata = ', linedata);
        return (
            <>
                <section className="report">
                    <h2>Railfall Chart</h2><br/><br/>
                    <LineChart
                        width={500}
                        height={300}
                        data={linedata}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="NY" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="CA" stroke="#82ca9d" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="FL" stroke="#ffc658" activeDot={{ r: 8 }} />
                        {/* <Line type="monotone" dataKey="mp" stroke="#82ca9d" /> */}
                    </LineChart>

                    <br/><br/>
                    <div className="text-left"><strong>note*</strong> Chart is shown using random data generated from https://my.api.mockaroo.com/rainfall.json?key=652173a0</div>
                </section>
            </>
        )
    }
}

export default Chart;