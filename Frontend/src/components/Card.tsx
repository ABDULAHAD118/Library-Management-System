import { BookOpenIcon, BuildingOffice2Icon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'

interface PropsTypes {
    title: string;
    icon: string;
    total?: number;
}

const CustomCard = (props: PropsTypes) => {
    const { title, icon, total } = props;
    return (
        <div>
            <Card className={`p-2 m-4 flex flex-row  items-center ${total && 'w-72'} `}>
                <CardHeader className='mt-2 grid h-12 w-12 place-items-center bg-gray-800'>
                    {icon == 'students' && <UserCircleIcon className='h-6 w-6' color='white' />}
                    {icon == 'books' && <BookOpenIcon className='h-6 w-6' color='white' />}
                    {icon == 'departments' && <BuildingOffice2Icon className='h-6 w-6' color='white' />}
                </CardHeader>
                <CardBody className={`p-4 w-8/12 ${total && 'text-right'}`}>
                    <Typography className='font-normal text-blue-gray-600' >{title}</Typography>
                    {total !== undefined && (
                        <Typography className="blue-gray font-semibold">{total}</Typography>
                    )}
                </CardBody>
                {
                    !total && <CardFooter className='flex space-x-3'>
                        <Button variant="gradient">View</Button>
                        <Button variant="gradient" color='green'>Edit</Button>
                        <Button variant="gradient" color='red'>Delete</Button>
                    </CardFooter>
                }
            </Card>
        </div>
    )
}

export default CustomCard