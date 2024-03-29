import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography align="center">Sign In</Typography>
        <TextField
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email && "Email is required"}
          {...register("email", { required: true })}
        />
        <TextField
          label="Your password"
          type="password"
          error={Boolean(errors.password)}
          helperText={errors.password && "Password is required"}
          {...register("password", { required: true })}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <Typography>Or log in with</Typography>
        <Typography>Forget your password</Typography>
      </form>
      <Typography>New to our community</Typography>
      <Typography>Create an account</Typography>
    </div>
  );
};

export default Login;
