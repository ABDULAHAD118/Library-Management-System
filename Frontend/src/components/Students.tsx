import { Button, Input } from "@material-tailwind/react"

const Students = () => {
    return (
        <>
            <div className="ml-4 text-xl font-bold">Students</div>
            <div className="space-y-4 w-4/5 m-auto my-5">
                <Input title="First Name" label="First Name" />
                <Input title="Last Name" label="Last Name" />
                <Input title="Registration Number" label="Registration Number" />
                <div>

                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Select a Department</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                </div>
                <Input title="Contatct Number" label="Contatct Number" />
                <Input title="CNIC Number" label="CNIC Number" />
                <Button variant="gradient">Add Student</Button>
            </div>
        </>
    )
}

export default Students