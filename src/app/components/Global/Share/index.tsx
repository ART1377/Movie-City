import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
type Props = {};

const Share = (props: Props) => {
  const shareUrl = window.location.href;
  return (
    <div className="p-2 mt-6 grid grid-cols-1 xs:grid-cols-2 gap-2 min-w-[240px] xxs:min-w-[280px] xs:min-w-[360px] sm:min-w-[500px]">
      <div className="border-2 p-2 text-text-dark rounded-2xl shadow-lg min-w-[160px] xs:col-span-2 cursor-pointer">
        <EmailShareButton url={shareUrl} className="flex items-center justify-between w-full">
          <EmailIcon size={36} round />
        <p className="font-medium">Email</p>
        </EmailShareButton>
      </div>
      <div className="border-2 p-2 text-text-dark rounded-2xl shadow-lg min-w-[160px] cursor-pointer">
        <FacebookShareButton url={shareUrl} className="flex items-center justify-between w-full">
          <FacebookIcon size={36} round />
        <p className="font-medium">Facebook</p>
        </FacebookShareButton>
      </div>
      <div className="border-2 p-2 text-text-dark rounded-2xl shadow-lg min-w-[160px] cursor-pointer">
        <TelegramShareButton url={shareUrl} className="flex items-center justify-between w-full">
          <TelegramIcon size={36} round />
        <p className="font-medium">Telegram</p>
        </TelegramShareButton>
      </div>
      <div className="border-2 p-2 text-text-dark rounded-2xl shadow-lg min-w-[160px] cursor-pointer">
        <WhatsappShareButton url={shareUrl} className="flex items-center justify-between w-full">
          <WhatsappIcon size={36} round />
        <p className="font-medium">Whatsapp</p>
        </WhatsappShareButton>
      </div>
      <div className="border-2 p-2 text-text-dark rounded-2xl shadow-lg min-w-[160px] cursor-pointer">
        <TwitterShareButton url={shareUrl} className="flex items-center justify-between w-full">
          <TwitterIcon size={36} round />
        <p className="font-medium">Twitter</p>
        </TwitterShareButton>
      </div>
    </div>
  );                
};

export default Share;
