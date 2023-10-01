import { getCurrentUser } from "@/lib/authOptions";
import { redirect } from "next/navigation"

import SignInForm from '@/components/form/loginForm';

const page = async () => {
  const session = await getCurrentUser()
  if (session?.user) redirect('/admin')
  return (
    <div className='w-full'>
      <SignInForm />
    </div>
  );
};

export default page;