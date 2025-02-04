import CustomCard from './CustomCard'

const Dashboard = () => {
    return (
        <>
            <div className="ml-4 text-xl font-bold">Dashboard</div>
            <div className='flex  justify-center items-center content-start flex-wrap'>
                <CustomCard title='Toatal Books' total={4500} icon='books' />
                <CustomCard title='Total Students' total={1000} icon='students' />
                <CustomCard title='Issued Books' total={300} icon='books' />
                <CustomCard title='Computer Science Department Books' total={600} icon='departments' />
                <CustomCard title='Biomedical Departments Books' total={900} icon='departments' />
                <CustomCard title='Electrical Department Books' total={400} icon='departments' />
            </div>
        </>
    )
}

export default Dashboard