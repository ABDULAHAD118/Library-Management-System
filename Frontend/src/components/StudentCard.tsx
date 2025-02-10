import { Button, Card, CardBody, CardFooter } from "@material-tailwind/react"

interface StudentCardProps {
    firstName: string;
    lastName?: string;
    redgNo: string;
    department: string;
    contact: string;
    cnic: string;
    handleView: () => void;
    handleEdit: () => void;
    handleDelete: () => void;
}
const StudentCard = (props: StudentCardProps) => {
    const { firstName, lastName, redgNo, department, cnic, contact, handleView, handleEdit, handleDelete } = props;
    return (
        <>
            <Card className="w-80">
                <CardBody>
                    <div>FirstName</div>
                    <div>LAstNAme</div>
                    <div>2022-cs-549</div>
                    <div>Computer Science & Engineering</div>
                    <div>03071390118</div>
                    <div>3660167721451</div>
                </CardBody>
                <CardFooter className='flex space-x-3'>
                    <Button variant="gradient" onClick={handleView}>View</Button>
                    <Button variant="gradient" color='green' onClick={handleEdit} >Edit</Button>
                    <Button variant="gradient" color='red' onClick={handleDelete}>Delete</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default StudentCard