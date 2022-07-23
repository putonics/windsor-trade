import React from 'react'
import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    FacebookIcon,
    WhatsappIcon,
    TelegramIcon,
    TwitterIcon,
    LinkedinIcon,
    InstapaperIcon,
    EmailIcon,
    PinterestIcon,
    RedditIcon,
    ViberIcon,
    HatenaIcon,
    LineIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PocketIcon,
    TumblrIcon,
    VKIcon,
    WorkplaceIcon
} from "react-share"

const SocialShare = ({ url }) => {
    return (
        <div className='flex space-x-2 flex-wrap justify-between'>
            <div className='relative w-fit h-fit'>
                <FacebookShareButton url={url} className='inline-block'>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <TelegramShareButton url={url}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <EmailShareButton url={url}>
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <InstapaperShareButton url={url}>
                    <InstapaperIcon size={32} round />
                </InstapaperShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <PinterestShareButton url={url}>
                    <PinterestIcon size={32} round />
                </PinterestShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <RedditShareButton url={url}>
                    <RedditIcon size={32} round />
                </RedditShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <ViberShareButton url={url}>
                    <ViberIcon size={32} round />
                </ViberShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <HatenaShareButton url={url}>
                    <HatenaIcon size={32} round />
                </HatenaShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <LineShareButton url={url}>
                    <LineIcon size={32} round />
                </LineShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <LivejournalShareButton url={url}>
                    <LivejournalIcon size={32} round />
                </LivejournalShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <MailruShareButton url={url}>
                    <MailruIcon size={32} round />
                </MailruShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <OKShareButton url={url}>
                    <OKIcon size={32} round />
                </OKShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <PocketShareButton url={url}>
                    <PocketIcon size={32} round />
                </PocketShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <TumblrShareButton url={url}>
                    <TumblrIcon size={32} round />
                </TumblrShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <VKShareButton url={url}>
                    <VKIcon size={32} round />
                </VKShareButton>
            </div>
            <div className='relative w-fit h-fit'>
                <WorkplaceShareButton url={url}>
                    <WorkplaceIcon size={32} round />
                </WorkplaceShareButton>
            </div>
        </div>
    )
}

export default SocialShare