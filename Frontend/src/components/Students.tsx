import { Button, Input } from "@material-tailwind/react"
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"
import StudentCard from "./StudentCard";

const Students = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [regNo, setRegNo] = useState('');
    const [contact, setContact] = useState('');
    const [cnic, setCnic] = useState('');

    const fetchDepartments = async () => {
        const response = await axios.get('http://localhost:3000/departments');
        const active = response.data.departments.filter((department: any) => !department.deletedAt);
        return active;
    }

    const { data } = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
        staleTime: 1000 * 60 * 5,
    })

    const createStudent = async (student: any) => {
        const response = await axios.post('http://localhost:3000/users', student,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    }

    const { mutate: studentMutation } = useMutation({
        mutationKey: ['createStudent'],
        mutationFn: createStudent,
        onSuccess: () => {
            console.log('Student Added');
        },
        onError: (error: any) => {
            console.log(error.response.data.message);
        }
    })

    const handleStudent = () => {
        if (firstName === '' || lastName === '' || department === '' || regNo === '' || contact === '' || cnic === '') {
            console.log('Please fill all the fields');
        } else {
            studentMutation({ firstName, lastName, regNo, department, cnic, contact });
        }
    }
    return (
        <>
            <div className="ml-4 text-xl font-bold">Students</div>
            <div className="space-y-4 w-4/5 m-auto my-5">
                <Input title="First Name" onChange={(e) => setFirstName(e.target.value)} label="First Name" />
                <Input title="Last Name" label="Last Name" onChange={(e) => setLastName(e.target.value)} />
                <Input title="Registration Number" label="Registration Number" onChange={(e) => setRegNo(e.target.value)} />
                <div>

                    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setDepartment(e.target.value)} >
                        <option value='' >Select a Department</option>
                        {Array.isArray(data) && data.length > 0 ? data.map((department: any) => (
                            <option value={department._id} key={department._id}>{department.name}</option>
                        )) : <option value='' >No Registered Department</option>}
                    </select>
                </div>
                <Input title="Contact Number" label="Contact Number" onChange={(e) => setContact(e.target.value)} />
                <Input title="CNIC Number" label="CNIC Number" onChange={(e) => setCnic(e.target.value)} />
                <Button variant="gradient" onClick={handleStudent}>Add Student</Button>
            </div>
            <div className="mr-4 flex justify-end">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>

                        <input
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Search Students"
                        />

                        <button
                            className="rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex space-y-4 flex-wrap justify-evenly">
                <StudentCard />
                <StudentCard />
                <StudentCard />
                <StudentCard />
                <StudentCard />
            </div>
        </>
    )
}

export default Students


