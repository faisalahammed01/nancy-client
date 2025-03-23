import { FaEarthAsia, FaFacebook, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          <p>© {new Date().getFullYear()} - Developed by Faisal Ahammed</p>
        </p>
        <div className="flex gap-2">
          <a
            href="https://www.facebook.com/FaisalAhammed00/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            <FaFacebook />
          </a>
          <a
            href="https://faisal-ahammed.vercel.app/?fbclid=IwY2xjawJM8g9leHRuA2FlbQIxMAABHWdytWXwPnDmX4mMmK6ZFEjqFSM_HuRMdemw6pk8I313Vw2GXwuJJm3wgQ_aem_zgLL2rCOVQPv41UC8npsHw"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            <FaEarthAsia></FaEarthAsia>
          </a>
          <a
            href="https://www.linkedin.com/in/faisalahammed/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
