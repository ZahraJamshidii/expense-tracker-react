import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

function Register() {
  const navigate = useNavigate();

 const {
  register: registerUser,
} = useUser();


  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
    },
  } = useForm();

function onSubmit(data) {
  const result = registerUser({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  if (!result.success) {
    alert(result.message);
    return;
  }

  alert("Registration Successful");

  navigate("/login");
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">
          Register
        </h1>

        {/* Name */}

        <div className="mb-4">

          <label>Name</label>

          <input
            className="w-full border rounded-lg p-3 mt-2"
            {...register("name", {
              required: "Name is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.name?.message}
          </p>

        </div>

        {/* Email */}

        <div className="mb-4">

          <label>Email</label>

          <input
            type="email"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("email", {
              required: "Email is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.email?.message}
          </p>

        </div>

        {/* Password */}

        <div className="mb-4">

          <label>Password</label>

          <input
            type="password"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>

        </div>

        {/* Confirm Password */}

        <div className="mb-6">

          <label>Confirm Password</label>

          <input
            type="password"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("confirmPassword", {
              required: "Confirm your password",

              validate: (value) =>
                value === watch("password") ||
                "Passwords do not match",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword?.message}
          </p>

        </div>

        <button
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
        >
          Register
        </button>

        <p className="mt-5 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-600 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;