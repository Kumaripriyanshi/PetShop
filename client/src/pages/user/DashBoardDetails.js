import React from 'react'
import DashBoardLayout from './DashBoardLayout'
import FormPage from '../FormPage'
import { Divider } from 'antd'

const DashBoardDetails = () => {
  return (
    <DashBoardLayout>
        <h1 className='mx-auto text-center mb-5'>User Dashboard</h1>
        <Divider />
        <FormPage />
    </DashBoardLayout>
  )
}

export default DashBoardDetails