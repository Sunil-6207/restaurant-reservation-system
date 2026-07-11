import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginUser(data);

            // Save user in Auth Context + localStorage
            login(response.token, response.user);

            toast.success("Login Successful!");

            // Redirect based on role
            if (response.user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold text-center mb-6">
                Welcome Back
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </form>

            <p className="text-center mt-5">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 font-semibold"
                >
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}

export default Login;