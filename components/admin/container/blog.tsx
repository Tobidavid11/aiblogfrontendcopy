import Link from 'next/link'
import React from 'react'

const UserTotalBlog = () => {
  return (
    <div>
      <div className="mt-6 grid grid-cols-3 gap-4">
            <Link
              href=""
              className="rounded-lg bg-muted p-4 text-center hover:bg-muted/80"
            >
              <div className="text-xl font-bold">120k</div>
              <div className="text-sm text-muted-foreground">Posts Created</div>
            </Link>
            <Link
              href=""
              className="rounded-lg bg-muted p-4 text-center hover:bg-muted/80"
            >
              <div className="text-xl font-bold">850</div>
              <div className="text-sm text-muted-foreground">Jobs Completed</div>
            </Link>
            <Link
              href=""
              className="rounded-lg bg-muted p-4 text-center hover:bg-muted/80"
            >
              <div className="text-xl font-bold">3,200ETH</div>
              <div className="text-sm text-muted-foreground">Earnings</div>
            </Link>
          </div>
    </div>
  )
}

export default UserTotalBlog