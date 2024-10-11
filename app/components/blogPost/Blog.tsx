import { Card, CardContent, CardTitle, CardHeader, CardFooter } from '@/components/ui/card'
import { ThumbsUp, MessageCircle, Share2, ArrowUp } from 'lucide-react'
import React from 'react'
import FollowCard from '../follow-card';
import { article } from '@/data/mock/articles';
import { formatNumber } from "@/lib/helper";
import Image from "next/image"
import BlogTags from './tags';
import { CardDescription } from '@/components/ui/card';



interface Article {
  author: string;
  authorImage: string;
  title: string;
  description?:string;
  imageUrl: string;
  likes: number;
  comments: number;
  shares: number;
  timePosted: string;
  tags: string[];
}

const Blog = ({   
  title, 
  imageUrl, 
  likes, 
  comments, 
  shares,
  description, 
  tags,
  
  
}: Article) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
      <FollowCard className="" user={article.user} />
      </CardHeader>
      
      <CardContent className="p-4 text-start">
        <CardTitle className="text-xl mb-2 line-clamp-2">{title}</CardTitle>
        <CardDescription className='min-h-[60px] line-clamp-3'>{description}</CardDescription>
        <Image width={1000} height={500} src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md mt-2" />
      </CardContent>
      
      <CardFooter className="p-4 flex items-center justify-between">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <span className="flex items-center"><ThumbsUp className="mr-1 h-4 w-4" /> {formatNumber(likes)}</span>
          <span className="flex items-center"><MessageCircle className="mr-1 h-4 w-4" /> {formatNumber(comments)}</span>
          <span className="flex items-center"><Share2 className="mr-1 h-4 w-4" /> {formatNumber(shares)}</span>
        </div>
        <BlogTags tags={tags} icon={<ArrowUp color="#574EFA" />} className="text-[#574EFA] hover:bg-[#574EFA]/35 bg-[#ECEBFF]" />
      </CardFooter>
    </Card>
  )
}

export default Blog;
