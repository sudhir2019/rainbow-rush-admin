import { useState } from "react";

function Login() {
    const [formData, setFormData] = useState({
        user_name: "",
        password: "",
        rememberMe: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // API call or form submission logic goes here
        console.log("Form Submitted", formData);
    };

    return (
        <div className="main-wrapper" id="app">
            <div className="page-wrapper full-page">
                <div className="page-content d-flex align-items-center justify-content-center">
                    <div className="row w-100 mx-0 auth-page">
                        <div className="col-md-8 col-xl-6 mx-auto">
                            <div className="card">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="auth-form-wrapper px-4 py-5">
                                            <a href="#" className="noble-ui-logo d-block mb-2">
                                                Welcome <span>RainbowRush Casino</span>
                                            </a>
                                            <h5 className="font-semiboldt text-base text-gray-500 mb-4">
                                                Welcome back! Log in to your account.
                                            </h5>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <label htmlFor="user_name">User Name</label>
                                                    <input
                                                        type="text"
                                                        name="user_name"
                                                        className="form-control"
                                                        id="user_name"
                                                        placeholder="User Name"
                                                        value={formData.user_name}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="password">Password</label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {/* <div className="form-check form-check-flat form-check-primary">
                                                        <input type="checkbox" className="form-check-input" />
                                                    <label className="form-check-label">
                                                        Remember me
                                                    </label>
                                                </div> */}
                                                <div className="flex items-start">
                                                    <div className="flex items-center h-5">
                                                        <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                                    </div>
                                                    <label htmlFor="terms" className="ms-2 text-blue-600 hover:underline dark:text-blue-500">Remember me</label>
                                                </div>
                                                <div className="col-md-12 p-0 d-flex">
                                                    <div className="col-md-6 p-0">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary mr-2 mb-2 mb-md-0"
                                                        >
                                                            Login
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default Login;
