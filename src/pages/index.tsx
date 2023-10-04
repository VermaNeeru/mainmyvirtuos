import Image from 'next/image'
import Dashboardcount from '@/components/Dashboard/dashboardcount'
// import Monthlyexpensechart from '@/components/Dashboard/monthlyexpensechart'
import Calendar from '@/components/Dashboard/Calendar'
import Birthdays from '@/components/Dashboard/birthdays'
import Leavechart from '@/components/Dashboard/Leavechart'
import Facebook from '@/components/Dashboard/Facebook'
import PublicDocument from '@/components/Dashboard/PublicDocument'
import GoogleDrive from '@/components/Dashboard/GoogleDrive'
// import EmployeeDistribution from '@/components/Dashboard/EmployeeDistribution'
import LeaveApproval from '@/components/Dashboard/LeaveApproval'
import WorkAnniversary from '@/components/Dashboard/WorkAnniversary'
import NewJoinee from '@/components/Dashboard/NewJoinee'


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (


    <div className="grid grid-cols-1 lg:grid-cols-1 lg:space-y-4 space-y-2">
      <Dashboardcount />
      {/* <EmployeeDistribution /> */}
      <LeaveApproval />

      {/* <Monthlyexpensechart /> */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2 xs:grid-cols-1">
        <Birthdays />
        <WorkAnniversary />

      </div>
      <Leavechart />

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2 xs:grid-cols-1">
        <Calendar />
        <Facebook />

      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 sm:grid-cols-2 xs:grid-cols-1">
        <NewJoinee />
        <PublicDocument />
      </div>

      {/* <div className="grid grid-rows-1 relative flex items-center space-x-3 rounded-lg  px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xs:grid-cols-1">

        </div>
      </div> */}

      <GoogleDrive />
    </div>


  )
}
