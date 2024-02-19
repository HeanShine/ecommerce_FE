import TotalSpent from "../../afake/TotalSpent";
import Header from "../homeMain/header";
import React from "react";

const RevenueByYear = () => {

    return (
        <div>
            <Header/>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2"><TotalSpent/></div>
        </div>
    );
};

export default RevenueByYear;