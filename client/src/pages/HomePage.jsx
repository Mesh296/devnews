import React, { useEffect, useRef, useState } from 'react'
import { Card } from './Card'
import { Sidebar } from '../components/Sidebar'
import { content } from 'flowbite-react/tailwind'

export const HomePage = () => {

  return (
    <div >
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />
        <Card
          title={"abc"}
          content={"as dasda sda dasd lk; jl;k jwlqkje"}
        />

      </div>

    </div>
  )
}
