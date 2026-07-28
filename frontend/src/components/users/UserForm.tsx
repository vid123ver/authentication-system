import Input from "../common/Input";
import Select from "../common/Select";

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    role: "Admin" | "User";
    isActive: boolean;
}

interface UserFormProps {
    formData: UserFormData;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

const UserForm = ({
    formData,
    onChange,
}: UserFormProps) => {

    return (

        <>

            <Input
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={onChange}
                required
            />

            <Input
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={onChange}
                required
            />

            <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={onChange}
                required
            />

            <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={onChange}
                options={[
                    {
                        label: "User",
                        value: "User",
                    },
                    {
                        label: "Admin",
                        value: "Admin",
                    },
                ]}
            />

        </>

    );

};

export default UserForm;