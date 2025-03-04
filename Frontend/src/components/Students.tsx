import { Button, Input, Spinner } from "@material-tailwind/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import StudentCard from "./StudentCard";
import { fetchDepartments } from "../services/departmentServices";
import { createStudent, deleteStudent, fetchStudents } from "../services/studentServices";
import toast from "react-hot-toast";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const Students = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [regNo, setRegNo] = useState('');
    const [contact, setContact] = useState('');
    const [cnic, setCnic] = useState('');
    const queryClient = useQueryClient();

    const { data, isFetching } = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
        staleTime: 1000 * 60 * 5,
    })
    const { data: studentData, isFetching: studentFetching } = useQuery({
        queryKey: ['students'],
        queryFn: fetchStudents,
        staleTime: 1000 * 60 * 5,
    })

    const { mutate: studentMutation, isPending } = useMutation({
        mutationKey: ['createStudent'],
        mutationFn: createStudent,
        onSuccess: (data) => {
            toast.success(data.message);
            setFirstName('');
            setLastName('');
            setRegNo('');
            setDepartment('');
            setContact('');
            setCnic('');
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        }
    })

    const handleStudent = () => {
        if (firstName === '' || lastName === '' || department === '' || regNo === '' || contact === '' || cnic === '') {
            toast('Please fill all the fields', {
                duration: 2500,
                icon: <InformationCircleIcon width={30} color="blue" />,
            });
        } else {
            studentMutation({ firstName, lastName, regNo, department, cnic, contact });
        }
    }
    const handleEdit = () => { }

    const { mutate: deleteStudentMutation } = useMutation({
        mutationKey: ['deleteStudent'],
        mutationFn: deleteStudent,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        }
    })
    const handleDelete = (id: string) => {
        deleteStudentMutation(id);
    }

    if (isFetching) {
        return <div className="flex justify-center">
            <Spinner />
        </div>
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
                <Button variant="gradient" className="flex justify-center" onClick={handleStudent}>{isPending ? <Spinner /> : 'Add Student'}</Button>
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
            {studentFetching ? <div className="mt-10 flex justify-center"><Spinner /></div> : !studentData || studentData && studentData.length === 0 ? <div className="mt-10 flex justify-center">No Student Found</div> :
                <div className="flex mt-10 space-y-3 flex-wrap justify-evenly">
                    {studentData && studentData.map((student: any) => (
                        <StudentCard key={student._id} firstName={student.firstName} lastName={student.lastName} regNo={student.regNo} contact={student.contact} cnic={student.cnic} department={student.department?.name} handleEdit={handleEdit} handleDelete={() => handleDelete(student._id)} />
                    ))}
                </div>}
        </>
    )
}

export default Students


