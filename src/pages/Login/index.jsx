import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

function Login() {
  const navigate = useNavigate();

  const { login } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const result = login(
      data.email,
      data.password
    );

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Login Successful");

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-8 text-center">
          Login
        </h1>

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

        <div className="mb-6">

          <label>Password</label>

          <input
            type="password"
            className="w-full border rounded-lg p-3 mt-2"
            {...register("password", {
              required: "Password is required",
            })}
          />

          <p className="text-red-500 text-sm mt-1">
            {errors.password?.message}
          </p>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-5 text-center">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;