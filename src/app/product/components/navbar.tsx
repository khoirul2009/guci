import AuthStatus from "@/app/components/auth-status";
import Link from "next/link";

const Navbar = () => {
  const navbarClasses = `navbar lg:px-36  top-0 w-full py-2 transition-all duration-300 bg-neutral text-white  ${
    true ? "fixed z-[9999] " : "absolute"
  }`;

  return (
    <div className={navbarClasses}>
      <div className="lg:flex-none flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl ">
          Logo
        </Link>
      </div>
      <div className="flex-none hidden lg:block ">
        <ul className="menu menu-horizontal px-1 gap-3 text-primary"></ul>
      </div>
      {/* <div className="flex-1 ms-5 hidden lg:block">
        <div className="flex bg-white rounded-lg p-2 max-w-5xl w-full">
          <svg
            className="w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
                fill="#989898"
              ></path>
            </g>
          </svg>
          <input
            type="text"
            placeholder="Telusuri disini..."
            className=" text-base-content ms-2 outline-none max-w-2xl w-full"
          />
        </div>
      </div> */}
      <div className="hidden lg:block ms-auto">
        <AuthStatus />
      </div>
      <div className="navbar-end lg:hidden">
        <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
