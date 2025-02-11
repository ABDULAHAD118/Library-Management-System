import { Button, Input, Spinner } from "@material-tailwind/react"
import CustomCard from "./CustomCard"
import { useState } from "react";
import axios from "axios";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Modal } from "./Modal";
import { useSearchParams } from "react-router";

const Departments = () => {
    const [departments, setDepartments] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const fetchDepartment = async () => {
        const result = await axios.get('http://localhost:3000/departments');
        const active = result.data.departments.filter((department: any) => !department.deletedAt);
        return active;
    }
    const { data: totalDepartments, isFetching, isError } = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartment,
        staleTime: 1000 * 60 * 5
    })


    const createDepartment = async (department: string) => {
        const result = await axios.post('http://localhost:3000/departments', { name: department });
        return result.data;
    }
    const { mutate: addDepartmentMutation, isPending } = useMutation({
        mutationFn: createDepartment,
        onSuccess: (data) => {
            toast.success(data.message);
            setDepartments('');
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    })

    const handleDepartment = () => {
        if (!departments) return toast.error('Department Name is required');
        addDepartmentMutation(departments);
    }

    const handleEdit = async (id: string) => {
        console.log('Edit clicked', id);
    }

    const onDelete = async (id: string) => {
        const result = await axios.delete(`http://localhost:3000/departments/${id}`);
        return result.data;
    }

    const { mutate: deleteDepartmentMutation } = useMutation({
        mutationFn: onDelete,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        },
        onError: (error: any) => {
            toast.error(error.message);
        }
    })



    const handleDelete = async (id: string) => {
        deleteDepartmentMutation(id);
    }
    const handelModal = () => {
        setOpen(!open);
    }

    const { mutate, isPending: fetching } = useMutation({
        mutationKey: ['singleDepartment'],
        mutationFn: (id: string) => { return axios.get(`http://localhost:3000/departments/${id}`) },
        onSuccess(data) {
            setDepartmentName(data.data.department.name)
        }
    })

    const handleView = async (id: string) => {
        mutate(id);
        setOpen(!open)
    }

    const searchDepartments = async () => {
        const response = await axios.get(`http://localhost:3000/departments/search`, {
            params: { search },
        });
        return response.data.departments.filter((dept: any) => !dept.deletedAt);
    };

    const { mutate: searchData, isPending: searchLoading, } = useMutation({
        mutationKey: ["searchDepartments"], // Refetch when search changes
        mutationFn: searchDepartments,
        onSuccess(data) {
            console.log(data);
        },
        onError(error: any) {
            toast.error(error.message)
        }
    });
    const handleSearch = async () => {
        searchData();
    }


    return (
        <>
            <div className="ml-4 text-xl font-bold">Departments</div>
            <div className=" w-4/5 m-auto my-14 flex flex-row">
                <Input size="lg" color="gray" label="Department Name" value={departments} onChange={(e) => setDepartments(e.target.value)} />
                <Button style={{ marginLeft: '30px', width: '230px' }} className="flex justify-center" variant="gradient" onClick={handleDepartment}>{isPending ? <Spinner /> : 'Add Department'}</Button>
            </div>
            <div className="mr-4 flex justify-end">
                <div className="mr-4 flex justify-end">
                    <div className="w-full max-w-sm min-w-[200px]">
                        <div className="relative flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>

                            <input
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Search Departments"
                                value={search} onChange={(e) => setSearchParams({ search: e.target.value })}
                            />

                            <button
                                className="rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                                type="button" onClick={handleSearch}
                            >
                                {searchLoading ? <div className="flex justify-center"><Spinner /></div> : 'Search'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isError && <div className="mt-10 flex justify-center">Check Your internet connection</div>}
            {isFetching ? <div className="mt-10 flex justify-center"><Spinner /></div> : Array.isArray(totalDepartments) && totalDepartments.length === 0 ? <div className="mt-10 flex justify-center">No Department Found</div> :
                totalDepartments && totalDepartments.map((department: any) => (
                    <CustomCard title={department.name} icon="departments" key={department._id} onDelete={() => handleDelete(department._id)} onEdit={() => handleEdit(department._id)} onView={() => handleView(department._id)} checkButton={true} />
                ))}
            {fetching ? <div className="mt-10 flex justify-center"><Spinner /></div>
                :
                <Modal open={open} handleOpen={handelModal} title={departmentName} />}
        </>
    )
}


export default Departments