import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useSWR from 'swr';
// Imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  import { useConfirmRedirectIfDirty } from '../components/useUnsavedChanges';
// const fetcher: Fetcher<User, string> = (id) => getUserById(id)

//   fetcher("localhost", {}, {}, {});  //fetcher();
//   const fetcher = (...args:any) => fetch(...args).then((res) => res.json())
const Form: NextPage = () => {
    const fetcher = async (
        input: RequestInfo,
        init: RequestInit,
        ...args: any[]
      ) => {
        const res = await fetch(input, init);
        return res.json();
      };
    //  const fetcher: Fetcher<User, string> = (id) => getUserById(id)
    const {register, reset, handleSubmit, setError, formState: {isSubmitting, errors, isDirty}} = useForm();
    const [email, setEmail] = useState("")
    const {data, error} = useSWR('/api/form', fetcher)
    useConfirmRedirectIfDirty(isDirty)
    
    
    async function saveFormData(data: object) {
        return await fetch("/api/form", {
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"},
            method: "POST"
        })
    }
  
      
    useEffect(() => {
        if (!data) {
            return; // loading
        }
        reset(data);
    }, [reset, data]);

    if (error) {
     //   return <div>An unexpected error occurred while loading, please try again</div>
    } else if (!data) {
        return <div>Loading...</div>
    }

    const onSubmit = async (data: object) => {
        const response = await saveFormData(data)
        if (response.status === 400) {
            // Validation error
            // Expect response to be a JSON response with the structure:
            // {"fieldName": "error message for that field"}
            const fieldToErrorMessage: {[fieldName: string]: string} = await response.json()
            for (const [fieldName, errorMessage] of Object.entries(fieldToErrorMessage)) {
                setError(fieldName, {type: 'custom', message: errorMessage})
            }
                      // in our submit handler
            } else if (response.ok) {
                // successful
                toast.success("Successfully saved")
            } else {
                // unknown error
                toast.error("An unexpected error occurred while saving, please try again")
            }

    }
        
    return <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer position="bottom-center" />
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" autoComplete="email" {...register("email", {required: true})} />
            {/* <div className="error">{errors.email?.message}</div> */}
        </div>
        <button disabled={isSubmitting}>
            {isSubmitting ? "Loading" : "Submit"}
        </button>
    </form>
}

export default Form