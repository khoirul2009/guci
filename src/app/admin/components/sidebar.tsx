import Menu from "./menu";

export default function Sidebar() {
  return (
    <div className="p-5 pt-20 w-2/12 fixed top-0 left-0 h-full lg:block hidden">
      <ul className="space-y-5">
        <Menu />
      </ul>
    </div>
  );
}
