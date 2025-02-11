import { BookOpenIcon, BuildingOffice2Icon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'

interface PropsTypes {
    title: string;
    icon: string;
    total?: number;
    checkButton?: boolean;
    onEdit?: () => void;
    onView?: () => void;
    onDelete?: () => void;
}

const CustomCard = (props: PropsTypes) => {
    const { title, icon, total, onEdit, onView, checkButton, onDelete } = props;
    return (
        <div>
            <Card className={`p-2 m-4 flex flex-row  items-center ${total && 'w-72'} `}>
                <CardHeader className='mt-2 grid h-12 w-12 place-items-center bg-gray-800'>
                    {icon == 'students' && <UserCircleIcon className='h-6 w-6' color='white' />}
                    {icon == 'books' && <BookOpenIcon className='h-6 w-6' color='white' />}
                    {icon == 'departments' && <BuildingOffice2Icon className='h-6 w-6' color='white' />}
                </CardHeader>
                <CardBody className={`p-4 w-1/2 ${total && 'text-right w-4/6'}`}>
                    <Typography className='font-normal text-blue-gray-600' >{title}</Typography>
                    {total !== undefined && (
                        <Typography className="blue-gray font-semibold">{total}</Typography>
                    )}
                </CardBody>
                {
                    checkButton && <CardFooter className='flex space-x-3'>
                        <Button variant="gradient" onClick={onView}>View</Button>
                        <Button variant="gradient" color='green' onClick={onEdit}>Edit</Button>
                        <Button variant="gradient" color='red' onClick={onDelete}>Delete</Button>
                    </CardFooter>
                }
            </Card>
        </div>
    )
}

export default CustomCard