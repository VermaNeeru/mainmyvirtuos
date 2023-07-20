import Image from 'next/image'
import Dashboardcount from '@/Component/Dashboard/dashboardcount'
import Monthlyexpensechart from '@/Component/Dashboard/monthlyexpensechart'
import Calendar from '@/Component/Dashboard/Calendar'
import Birthdays from '@/Component/Dashboard/birthdays'
import Leavechart from '@/Component/Dashboard/Leavechart'
import Facebook from '@/Component/Dashboard/Facebook'
import PublicDocument from '@/Component/Dashboard/PublicDocument'
import GoogleDrive from '@/Component/Dashboard/GoogleDrive'
import EmployeeDistribution from '@/Component/Dashboard/EmployeeDistribution'
import LeaveApproval from '@/Component/Dashboard/LeaveApproval'
import WorkAnniversary from '@/Component/Dashboard/WorkAnniversary'


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (


    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
      <div className="relative flex items-center space-x-3 rounded-lg  px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <Dashboardcount />
      </div>
      <EmployeeDistribution />
      <div className="relative flex items-center space-x-3 rounded-lg  px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <LeaveApproval />
      </div>
      <div className="relative flex items-center space-x-3 rounded-lg  px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <Monthlyexpensechart />
      </div>
      <div className="relative flex items-center space-x-3 rounded-lg  px-6 py-5  focus-within:ring-2 focus-within:ring-indigo-500 hover:border-gray-400">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xs:grid-cols-1">
          <Birthdays />
          <WorkAnniversary />

        </div>
      </div>
      <div className="relative flex items-center space-x-3 rounded-lg  px-6 py-5  focus-within:ring-2 focus-within:ring-indigo-500 hover:border-gray-400">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xs:grid-cols-1">

          <Leavechart />

        </div>
      </div>
      <div className="grid grid-rows-1 relative  items-center space-x-3 rounded-lg  px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xs:grid-cols-1">
          <Calendar />
          <Facebook />

        </div>
      </div>

      <div className="grid grid-rows-1 relative flex items-center space-x-3 rounded-lg  px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xs:grid-cols-1">
          <PublicDocument />

        </div>
      </div>

      <div className="relative items-center  rounded-lg  px-6 py-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
          <GoogleDrive />
        </div>
      </div>

    </div>




  )
}
