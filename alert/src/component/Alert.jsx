import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { MdInfo, MdWarning, MdCheckCircle, MdError } from "react-icons/md";

function Alert({ type = "info", message, onClose }) {
    const alertRef = useRef(null);

    const icons = {
        success: <MdCheckCircle size={30} className="text-[#1fd11f]" />,
        info: <MdInfo size={30} className="text-[#1f6cd1]"/>,
        warning: <MdWarning size={30} className="text-[#daa619]" />,
        error: <MdError size={30} className="text-[#e95353]" />,
    };

      useGSAP(() => {
        gsap.fromTo(
          alertRef.current,
          { opacity: 0, scale: 0.8, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.Out" }
        );

        const timer = setTimeout(() => {
          gsap.to(alertRef.current, {
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 0.3,
            ease: "power2.Out",
            onComplete: () => {
              if (onClose) onClose();
            },
          });
        }, 5000);

        return ()=> clearTimeout(timer)

      }, [onClose]);

    return (
        <div
            ref={alertRef}
            className={`fixed bottom-10 right-5 z-50 flex items-center justify-between px-4 py-3 rounded-full bg-black-200`}
        >
            <div className="block">
                {icons[type]}
            </div>
            <div className="text-left ml-3 text-white">
                <span>{message}</span>
            </div>
        </div>
    );
}

export default Alert;
