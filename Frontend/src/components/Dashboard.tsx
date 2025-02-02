import React from 'react'
import CustomCard from './Card'

const Dashboard = () => {
    return (
        <div className='flex justify-center items-center content-start flex-wrap mt-20 '>
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
        </div>
    )
}

export default Dashboard