import React, {useEffect, useState} from "react";

import {
    MdArrowDropUp,
    MdOutlineCalendarToday,
    MdBarChart,
} from "react-icons/md";
import Card from "./Card";
import {
    lineChartOptionsTotalSpent,
} from "./charts";
import LineChart from "./LineChart";
import oderService from "../service/OderService";
const TotalSpent = () => {
    const [lineChartData, setLineChartData] = useState([]);
    const [load, setLoad] = useState(true)
    useEffect(() => {
        oderService.getRevenueByYear(2024).then((response) => {
            let Revenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let data = response.data;
            for (let i = 0; i < Revenue.length + 1; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (data[j].month == i + 1) {
                        Revenue[i] = data[j].total;
                    }
                }
            }
            const lineChartData123 = [
                {
                    name: "Doanh thu",
                    data: Revenue,
                    color: "#4318FF",
                },
            ];
            setLineChartData(lineChartData123)
        })
        setLoad(false)
    }, [load]);

    const dataRevenueNew = () => {
        const lineChartData123 = [
            {
                name: "Revenue",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                color: "#4318FF",
            }
        ];
        setLineChartData(lineChartData123)
        console.log(lineChartData123)
    }

    useEffect(() => {
        dataRevenueNew()
    } , [])

    return (

        <Card extra="!p-[20px] text-center">

            <div style={{display:"flex", height:"400px",border:"1px solid black", borderRadius:"8px"}}>
                <div className="flex justify-between" style={{marginTop:"110px"}}>

                    <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
                        <MdOutlineCalendarToday />
                        <span className="text-sm font-medium text-gray-600">This month</span>
                    </button>

                    <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                        <MdBarChart className="h-6 w-6" />
                    </button>

                    <div className="flex flex-col" style={{height:"200px"}}>
                        <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
                            $37.5K
                        </p>
                        <div className="flex flex-col items-start">
                            <p className="mt-2 text-sm text-gray-600">Total Spent</p>
                            <div className="flex flex-row items-center justify-center">
                                <MdArrowDropUp className="font-medium text-green-500" />
                                <p className="text-sm font-bold text-green-500"> +2.45% </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden" style={{width:"1000px",position:"absolute", transform: `translate(180px, 200px)`}}>

                    <div className="h-full w-full">
                        <LineChart
                            options={lineChartOptionsTotalSpent}
                            series={lineChartData}
                        />
                    </div>
                </div>
            </div>

        </Card>

    );
};

export default TotalSpent;