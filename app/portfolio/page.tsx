import Portfolio from "@/components/Portfolio";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";

const PortfolioPage = () => {
  return (
    <div>
      <FloatingNav navItems={navItems} />
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;
