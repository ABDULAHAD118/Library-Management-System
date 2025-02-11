import { Dialog } from "@material-tailwind/react";
import CustomCard from "./CustomCard";
interface ModalProps {
    title: string;
    open: boolean;
    handleOpen: () => void;
}

export function Modal(props: ModalProps) {
    const { title, open, handleOpen } = props;

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <CustomCard icon="departments" checkButton={false} title={title} />
            </Dialog>
        </>
    );
}