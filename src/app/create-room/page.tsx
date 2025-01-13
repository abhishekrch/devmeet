import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage() {
    return (
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-12">
            <div className="text-4xl font-bold">
                Create Room
                <CreateRoomForm />
            </div>
        </div>
    )
}