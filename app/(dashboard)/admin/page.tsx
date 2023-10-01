import { getCurrentUser } from "@/lib/authOptions";
import { redirect } from "next/navigation"

/**
 *  Getserversession is much faster than usesession
 * @returns 
 *  console.log(session)
  // return by default { user: { name: undefined, email: 'tush@mail.com', image: undefined } }
 */
const AdminPage = async () => {
  const session = await getCurrentUser()
  if (!session?.user) redirect('/login')
  return (
    <div>
      <h1> Welcome to the admin Page {session?.user.username}</h1>
    </div>

  )
}

export default AdminPage;