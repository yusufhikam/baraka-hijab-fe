import { Link } from "react-router-dom";
import Button from "../components/elements/Button/Button";
import Card from "../components/elements/Card/Card";
import { Eye, EyeOff, Loader, Lock, User } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../utililties/customHook/useAuth";
import ErrorResponseMessages from "../components/elements/ErrorMessage/ErrorMessages";

const LoginPage = () => {
	const { login, isAuthenticated } = useAuth();

	if (isAuthenticated) {
		// <Navigate to='/' replace />
		window.location.href = "/";
	}

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<{ email?: string; password?: string }>(
		{},
	);

	const { mutate, status, error } = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			login(data.email, data.password),
		// onSuccess: () => {
		//     window.location.href = '/';
		// },
	});

	const isLoading = status === "pending";

	const formValidation = () => {
		const newError: { email?: string; password?: string } = {};

		if (!email) {
			newError.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			newError.email = "Invalid email format";
		}

		if (!password) {
			newError.password = "Password is required";
		}

		setErrors(newError);
		return Object.keys(newError).length === 0; // Return true if there are no errors
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (formValidation()) {
			mutate({ email, password });
		}
	};

	return (
		<div className="from-barakaprimary-madder font-krona-one-regular flex h-screen items-center justify-center bg-linear-to-b via-gray-900 to-slate-700 text-white">
			<Card variant="w-[75%] md:w-[60%] lg:w-[30%] flex flex-col gap-y-2 p-5 rounded-lg shadow-md bg-white/30 backdrop-blur">
				<Link
					to={"/"}
					className="text-center text-3xl font-bold transition-all duration-300 hover:scale-105 hover:text-yellow-500"
				>
					BARAKA
				</Link>
				<hr />
				<h1 className="text-2xl">Welcome Back!</h1>
				<p className="font-krub-regular mb-10">Please Enter Your Details</p>
				<form
					onSubmit={handleSubmit}
					className="font-poppins-semibold flex flex-col gap-y-2"
				>
					<div className="flex items-center">
						<User
							size={30}
							className="rounded-tl-md rounded-bl-md border border-r-0 p-2 backdrop-blur"
						/>
						<input
							type="text"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="h-8 w-full rounded-tr-md rounded-br-md text-black"
							placeholder="Enter your email"
						/>
					</div>
					{errors.email && (
						<ErrorResponseMessages>{errors.email}</ErrorResponseMessages>
					)}
					<div className="relative flex items-center">
						<Lock
							size={30}
							className="rounded-tl-md rounded-bl-md border border-r-0 p-2 backdrop-blur"
						/>
						<input
							type={`${showPassword ? "text" : "password"}`}
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-input h-8 w-full rounded-tr-md rounded-br-md text-black"
							placeholder="Enter your password"
						/>
						<Button
							type="button"
							variant="absolute right-3"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (
								<EyeOff className="hover:text-barakaprimary-madder text-black" />
							) : (
								<Eye className="hover:text-barakaprimary-madder text-black" />
							)}
						</Button>
					</div>
					{errors.password && (
						<ErrorResponseMessages>{errors.password}</ErrorResponseMessages>
					)}
					<div className="">
						<input
							type="checkbox"
							id="remember"
							className="form-checkbox rounded-full"
						/>
						<label htmlFor="remember" className="ml-2 font-sans">
							Remember Me
						</label>
					</div>
					<Button
						type="submit"
						variant="bg-white text-black hover:bg-barakaprimary-madder mt-10 p-3 hover:text-white rounded-md transition-all duration-300"
					>
						{isLoading ? (
							<div className="flex justify-center">
								<Loader className="me-3 animate-spin" />
								<p>Logging in...</p>
							</div>
						) : (
							"Login"
						)}
					</Button>

					{error && <p className="text-red-500">{error.message}</p>}
				</form>

				<p className="text-center font-sans text-base">
					Don't have an account?{" "}
					<Link
						to={"/register"}
						className="hover:text-barakaprimary-snow text-blue-400"
					>
						Sign Up
					</Link>
				</p>
			</Card>
		</div>
	);
};

export default LoginPage;
