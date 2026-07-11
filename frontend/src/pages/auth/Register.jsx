import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { registerUser } from "../../services/authService";

function Register() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {

            await registerUser(data);

            toast.success("Registration Successful!");

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration failed"
            );

        }
    };

    return (

        <AuthLayout>

            <h1 className="text-3xl font-bold text-center mb-6">

                Create Account

            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    register={register}
                    placeholder="Enter your name"
                />

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    register={register}
                    placeholder="Enter your email"
                />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    register={register}
                    placeholder="Enter your password"
                />

                <Button>

                    {isSubmitting
                        ? "Creating Account..."
                        : "Register"}

                </Button>

            </form>

            <p className="text-center mt-5">

                Already have an account?{" "}

                <Link
                    to="/"
                    className="text-blue-600 font-semibold"
                >

                    Login

                </Link>

            </p>

        </AuthLayout>

    );
}

export default Register;