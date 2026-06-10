import { Film, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full  px-30 h-80 mt-10 flex items-center justify-between bg-[#303F9F] text-white">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Film size={50} className="text-white" />
          <h1 className="text-3xl font-bold text-white">Movie Z</h1>
        </div>
        <span>© 2026 Movie Z. All Rights Reserved.</span>
      </div>
      <div className="flex gap-30">
        <div className="flex flex-col gap-4">
          <span>Contact Information</span>
          <div className="flex gap-3 items-center">
            <Mail />
            <span>
              Email: <br />
              Support@movieZ.com
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <Phone />
            <span>
              Phone: <br />
              247247247247
            </span>
          </div>
        </div>
        <div className="flex gap-4 flex-col">
          <span>Follow us</span>
          <div className="flex gap-3">
            <a href="https://youtu.be/dQw4w9WgXcQ?si=lbcLpkp5-s7CJoKe">
              Facebook
            </a>
            <a href="https://youtu.be/SfT4FMkh1-w?si=vgjGMv8E9EDqlqbM">
              Instagram
            </a>
            <a href="https://youtu.be/Uij52P2q0sQ?si=5KRmzoze_wvpTrAW">
              Twitter
            </a>
            <a href="https://youtu.be/YBNOkGsI47E?si=69o6Z6tNDiw_QKqx">
              Youtube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
