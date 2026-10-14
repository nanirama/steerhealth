'use client'
import type React from "react"
import { Facebook, Twitter, Message, Link } from "@/components/Elements/Icons"
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton } from "react-share";

export const ArticleMetaBar = ({title, url}:{title: string, url: string}) => {
  return (
    <div className="flex items-center justify-start py-4 mb-8">
      <div className="flex items-center gap-4">
        <FacebookShareButton url={url} quote={title}>
          <Facebook className="w-8 h-8" />
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title}>
          <Twitter className="w-6 h-6" />
        </TwitterShareButton>
        <EmailShareButton url={url} subject={title} body={`Check out this article: ${url}`}>
          <Message className="w-8 h-8" />
        </EmailShareButton>
        <LinkedinShareButton url={url} title={title}>
          <Link className="w-7 h-7" />
        </LinkedinShareButton>
      </div>
    </div>
  )
}
