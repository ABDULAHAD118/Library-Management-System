import { BookOpenIcon, BuildingOffice2Icon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'

interface PropsTypes {
    title: string;
    icon: string;
    total: number;
}

const CustomCard = (props: PropsTypes) => {
    const { title, icon, total } = props;
    return (
        <div>
            <Card className='w-72 m-4 flex-row justify-between items-center'>
                <CardHeader className='mt-2 grid h-12 w-12 place-items-center bg-gray-800'>
                    {icon == 'students' && <UserCircleIcon className='h-6 w-6' color='white' />}
                    {icon == 'books' && <BookOpenIcon className='h-6 w-6' color='white' />}
                    {icon == 'departments' && <BuildingOffice2Icon className='h-6 w-6' color='white' />}
                </CardHeader>
                <CardBody className='p-4 text-right w-3/4'>
                    <Typography className='font-normal text-blue-gray-600' >{title}</Typography>
                    <Typography className="blue-gray font-semibold">{total}</Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default CustomCard