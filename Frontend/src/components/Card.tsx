import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'

const CustomCard = () => {
    return (
        <div>
            <Card className='w-72 m-4 flex-row justify-between items-center'>
                <CardHeader className='mt-2 grid h-12 w-12 place-items-center bg-gray-800'>
                    <UserCircleIcon className='h-6 w-6' color='white' />
                </CardHeader>
                <CardBody className='p-4 text-right'>
                    <Typography className='font-normal text-blue-gray-600' >Total Books</Typography>
                    <Typography className="blue-gray font-semibold">4500</Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default CustomCard