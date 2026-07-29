import type {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

import Input from "../common/Input";
import Select from "../common/Select";

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    role: "Admin" | "User";
    isActive: boolean;
}

interface UserFormProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    showRole?: boolean;
}

const UserForm = <T extends FieldValues>({
    register,
    errors,
    showRole = true,
}: UserFormProps<T>) => {

    return (

        <>

            <Input
                label="First Name"
                placeholder="Enter first name"
                error={errors.firstName?.message as string | undefined}
                {...register("firstName" as Path<T>)}
            />

            <Input
                label="Last Name"
                placeholder="Enter last name"
                error={errors.lastName?.message as string | undefined}
                {...register("lastName" as Path<T>)}
            />

            <Input
                label="Email"
                type="email"
                placeholder="Enter email"
                error={errors.email?.message as string | undefined}
                {...register("email" as Path<T>)}
            />

            {showRole && (

                <Select
                    label="Role"
                    error={errors.role?.message as string | undefined}
                    {...register("role" as Path<T>)}
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

            )}

        </>

    );

};

export default UserForm;