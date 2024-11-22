import Portfolio from "@/components/Portfolio";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";

const PortfolioPage = () => {
  return (
    <div className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip">
      <FloatingNav navItems={navItems} />
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;
