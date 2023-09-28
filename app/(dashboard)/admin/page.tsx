import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth'

const AdminPage = async () => {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div>
      <h1> Welcome to the admin Page</h1>
    </div>

  )
}

export default AdminPage;