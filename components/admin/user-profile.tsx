"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function UserProfile() {
  return (
    <div className="space-y-6 flex gap-8">
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex items-start gap-4">
            <Image
              src="/blog_image.png"
              alt="Miracle Davison"
              className="h-20 w-20 rounded-full"
              width={100}
              height={100}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Miracle Davison</h2>
                <CheckCircle className="h-5 w-5 text-blue-500" />
                <Badge variant="outline" className="ml-2">
                  Active
                </Badge>
              </div>
              <p className="text-muted-foreground">@Mira</p>
              <p className="text-sm text-muted-foreground">
                Miracle is a business owner specializing in digital solutions
                tailored to the tech industry. With a focus on innovation, they
                help businesses enhance their digital
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href="https://www.linkedin.com/"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <LinkIcon className="mr-1 h-4 w-4" />
                  LinkedIn Profile
                </Link>
                <span className="text-muted-foreground">
                  Joined October, 2024
                </span>
              </div>
            </div>
          </div>

         
        </CardContent>
      </Card>
      <Card>
      <div className="items-center gap-4">
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select reason for blocking/suspending user" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spam">Spam</SelectItem>
            <SelectItem value="harassment">Harassment</SelectItem>
            <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="destructive">Block User</Button>
        <Button className="bg-yellow-500 hover:bg-yellow-600">
          Suspend User
        </Button>
      </div>
      </Card>
    </div>
  )
}