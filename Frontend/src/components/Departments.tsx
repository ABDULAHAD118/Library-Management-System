import { Button, Input } from "@material-tailwind/react"
import CustomCard from "./Card"
import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const Departments = () => {
    const [departments, setDepartments] = useState('');
    const fetchDepartment = async () => {
        const result = await axios.get('http://localhost:3000/departments');
        return result.data;
    }
    const { data: totalDepartments, isFetched } = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartment,
        staleTime: 1000 * 60 * 10
    })
    const createDepartment = async (department: string) => {
        const result = await axios.post('http://localhost:3000/departments', { name: department });
        return result.data;
    }
    const addDepartmentMutation = useMutation({
        mutationFn: createDepartment,
        onSuccess: (data) => {
            console.log('Department added successfully');
            console.log(data);
        }
    })

    const addDepartment = () => {
        addDepartmentMutation.mutate(departments);
    }

    return (
        <>
            <div className="ml-4 text-xl font-bold">Departments</div>
            <div className=" w-4/5 m-auto my-14 flex flex-row">
                <Input size="lg" color="gray" label="Department Name" onChange={(e) => setDepartments(e.target.value)} />
                <Button style={{ marginLeft: '30px', width: '230px' }} variant="gradient" onClick={addDepartment}>Add Department</Button>
            </div>
            <div className="mr-4 flex justify-end">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>

                        <input
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Search Departments"
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
            {
                totalDepartments && totalDepartments.map((department: any) => (
                    <CustomCard title={department.name} icon="departments" key={department._id} />
                ))
            }
        </>
    )
}

export default Departments