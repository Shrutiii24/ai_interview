"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Link from "next/link";
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

type FormType = "sign-in" | "sign_up";

const authFormSchema =(type:FormType)=>{
    return z.object({
        name: type === "sign_up" ? z.string().min(3) : z.string().optional(),
        Email: z.string().email(),
        Password: z.string().min(6),
    }) }

const AuthForm = ({type}:{type:FormType}) => {
    const router= useRouter();
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        Email: "",
        Password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        if(type === "sign_up"){
            toast.success("Account created successfully!")
            router.push("/sign_in");
        } else{
            toast.success("Signed in successfully!")
            router.push("/");
        }

    }catch(error){
        console.log(error);
        toast.error("Something went wrong. Please try again.")
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
            <div className="flex flex-row gap-2 justify-centre">
                <Image src="/logo.svg" alt="logo" width={38} height={32}/>
                <h2 className="text-primary-100">HireReady</h2>
                </div>  
            <h3 className="text-base font-medium text-white">Ace Every Question, Own Every Interview</h3>

            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && (
            <FormField 
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="Email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="Password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

    
            <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create an Account'}</Button>
      </form>
    </Form>
    <p className='text-sm text-center mt-4'>
        {isSignIn ? "No account yet? " : "Already have an account? "}
        <Link href={isSignIn ? "/sign_up" : "/sign_in"} className="font-bold text-user-primary text-blue-500  ml-1 hover:underline">
        {!isSignIn ? "Sign In" : "Sign Up"}
        </Link>
    </p>
    </div>
    </div>
  );
};

export default AuthForm
