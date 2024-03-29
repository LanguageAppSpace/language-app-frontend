import { useForm } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase";
import { useNavigate } from "react-router-dom";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();

  const handleSumbit = async (data: FormData) => {
    const { email, password, firstName, lastName } = data;

    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {
        displayName: `${firstName} ${lastName}`,
      });
      navigate("/login");
    } catch (error) {
      console.error("User creation encountered an error", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Create an account</Typography>
      <form onSubmit={handleSubmit(handleSumbit)}>
        <TextField
          label="firstName"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          {...register("firstName", { required: true })}
        />
        <TextField
          label="lastName"
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          {...register("lastName", { required: true })}
        />
        <TextField
          label="email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register("email", { required: true })}
        />
        <TextField
          label="password"
          type="password"
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register("password", { required: true })}
        />
        <TextField
          label="confirm password"
          type="password"
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword", { required: true })}
        />
        <Button type="submit" variant="contained" color="primary">
          Create an account
        </Button>
      </form>
    </Container>
  );
};

export default SignUpForm;
