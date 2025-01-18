
import React from "react";
import useLogin from "../../hooks/Authentication/useLogin"; // Import the custom hook

function Login() {
    const {
        register,
        isLoading,
        handleSubmit,
        errors,
        Errors,
        onSubmit,
        successMessage,
        serverError,
    } = useLogin(); // Destructure values from the custom hook

    return (
        <div className="main-wrapper" id="app">
            <div className="page-wrapper full-page">
                <div className="page-content d-flex justify-content-center ">
                    <div className="row w-full mx-0 auth-page">
                        <div className="col-md-8 col-xl-6 mx-auto">
                            <div className="card border-blue-600 ">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="auth-form-wrapper px-4 py-5">
                                            <a href="#" className="noble-ui-logo d-block mb-2">
                                                Welcome <span>RainbowRush Casino</span>
                                            </a>
                                            <h5 className="font-semiboldt text-base text-gray-500 mb-4">
                                                Welcome back! Log in to your account.
                                            </h5>

                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-group relative">
                                                    <label htmlFor="userEmail">Email</label>
                                                    <input
                                                        type="email"
                                                        name="userEmail"
                                                        id="userEmail"
                                                        className="form-control"
                                                        placeholder="Enter your email"
                                                        {...register("userEmail", {
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                                message: "Invalid email format",
                                                            },
                                                        })}
                                                    />
                                                    {errors.userEmail && (
                                                        <p className="absolute right-3 top-19 p-1 text-red-500">{errors.userEmail.message}</p>
                                                    )}
                                                </div>
                                                <div className="form-group relative">
                                                    <label htmlFor="userPassword">Password</label>
                                                    <input
                                                        type="password"
                                                        name="userPassword"
                                                        id="userPassword"
                                                        className="form-control"
                                                        placeholder="Enter your password"
                                                        {...register("userPassword", {
                                                            required: "Password is required",
                                                            minLength: {
                                                                value: 6,
                                                                message: "Password must be at least 6 characters",
                                                            },
                                                        })}
                                                    />
                                                    {errors.userPassword && (
                                                        <p className="absolute right-3 top-19 p-1 text-red-500">{errors.userPassword.message}</p>
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-start mt-4 relative">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                id="rememberMe"
                                                                name="rememberMe"
                                                                type="checkbox"
                                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50"
                                                                {...register("rememberMe", {
                                                                    required: "Remember Me is required",
                                                                },
                                                                )}
                                                            />
                                                        </div>
                                                        <label
                                                            htmlFor="rememberMe"
                                                            className="ms-2 mt-2 text-blue-600 hover:underline"
                                                        >
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    {errors.rememberMe && (
                                                        <p className="absolute top-9 text-red-500">{errors.rememberMe.message}</p>
                                                    )}
                                                </div>
                                                <div className="col-md-12 p-0 d-flex mt-4 relative">
                                                    <div className="col-md-6 p-0">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary mr-2 mb-2 mb-md-0"
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? "Logging in..." : "Login"}
                                                        </button>
                                                    </div>
                                                    {successMessage && (
                                                        <p className="absolute left-20 pt-1 text-green-500">{successMessage}</p>
                                                    )}
                                                    {serverError && (
                                                        <p className="absolute left-20 pt-1 text-red-500">{serverError}</p>
                                                    )}
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
