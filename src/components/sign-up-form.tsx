import React, { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../utils/firebase/firebase";

interface Props {
  onRegister: (email: string, password: string) => void;
}

const defaultFormFields = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm: React.FC<Props> = ({ onRegister }) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { firstName, lastName, email, password, confirmPassword } = formFields;

    const handleSumbit = async (event: React.FormEvent) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const user = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName: `${firstName} ${lastName}` });
            
            setFormFields(defaultFormFields);
            
            onRegister(email, password);
        } catch(error) {
            console.error('User creation encountered an error', error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <div>
            <h1>Create an account</h1>
            <form onSubmit={handleSumbit}>
                <label>First name</label>
                <input 
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='firstName' 
                    value={firstName} 
                />

                <label>Last name</label>
                <input 
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="lastName" 
                    value={lastName} 
                />

                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email} 
                />

                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />

                <label>Confirm password</label>
                <input 
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword"  
                    value={confirmPassword} 
                />
                
                <button type='submit'>Create an account</button>
            </form>
        </div>
    );
};

export default SignUpForm;
