import { useFormStore } from "@/api/formStore";
import { Button } from "@/components/ui/button";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const theme = useFormStore((state) => state.theme);
  const toggleTheme = useFormStore((state) => state.toggleTheme);

  return (
    <Button onClick={toggleTheme} className="flex items-center space-x-2">
      {theme === "light" ? (
        <>
          <FaMoon size={20} />
        </>
      ) : (
        <>
          <FaSun size={20} />
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
