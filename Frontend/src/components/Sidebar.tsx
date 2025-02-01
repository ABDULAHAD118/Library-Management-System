import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    BuildingOfficeIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";

export default function Sidebar() {
    return (
        <Card className="h-[calc(100vh-1rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Library Management System
                </Typography>
            </div>
            <List>
                <Link to="/">
                    <ListItem >
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </Link>
                <Link to="/departments">
                    <ListItem>
                        <ListItemPrefix>
                            <BuildingOfficeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Departments
                    </ListItem>
                </Link>
                <Link to="/users">
                    <ListItem>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Students
                    </ListItem>
                </Link>
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}