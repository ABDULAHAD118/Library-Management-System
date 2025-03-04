import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react"

interface StudentCardProps {
    firstName: string;
    lastName?: string;
    regNo: string;
    department: string;
    contact: string;
    cnic: string;
    handleEdit: () => void;
    handleDelete: () => void;
}
const StudentCard = (props: StudentCardProps) => {
    const { firstName, lastName, regNo, department, cnic, contact, handleEdit, handleDelete } = props;
    return (
        <>
            <Card className="w-80">
                <CardBody>
                    <div>{firstName} {lastName}</div>
                    <div>{regNo}</div>
                    <div>{department ? department : 'Nill'}</div>
                    <div>{contact}</div>
                    <div>{cnic}</div>
                </CardBody>
                <CardFooter className='flex space-x-3 justify-around'>
                    <Button variant="gradient" color='green' onClick={handleEdit} >Edit</Button>
                    <Button variant="gradient" color='red' onClick={handleDelete}>Delete</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default StudentCard