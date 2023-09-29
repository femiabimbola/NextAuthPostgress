import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'


/**
 *  Getserversession is much faster than usesession
 * @returns 
 */
const AdminPage = async () => {
  const session = await getServerSession(authOptions)
  // console.log(session)
  // return by default { user: { name: undefined, email: 'tush@mail.com', image: undefined } }
  return (
    <div>
      <h1> Welcome to the admin Page {session?.user.username}</h1>
    </div>

  )
}

export default AdminPage;