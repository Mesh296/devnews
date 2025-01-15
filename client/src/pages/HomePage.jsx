import React, { useEffect, useRef, useState } from 'react'
import { Card } from './Card'
import { Sidebar } from '../components/Sidebar'
import { content } from 'flowbite-react/tailwind'

export const HomePage = () => {

  return (
    <div >
      <Sidebar />
      <div className="p-4 laptop:ml-64  grid grid-cols-1 gap-6 big-smartphone:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 place-items-center desktop:px-32">
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
