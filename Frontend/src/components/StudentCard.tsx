import { Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react"

const StudentCard = () => {
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
                    <Button variant="gradient">View</Button>
                    <Button variant="gradient" color='green'>Edit</Button>
                    <Button variant="gradient" color='red'>Delete</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default StudentCard