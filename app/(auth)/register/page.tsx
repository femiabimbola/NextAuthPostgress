import { getCurrentUser } from "@/lib/authOptions";
import { redirect } from "next/navigation"
import SignUpForm from '@/components/form/registerForm';

const page = async () => {
  const session = await getCurrentUser()
  if (session?.user) redirect('/admin')
  return (
    <div className='w-full'>
      <SignUpForm />
    </div>
  );
};

export default page;