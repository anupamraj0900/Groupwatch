import { FunctionComponent } from "react";

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <div className="bg-dark-lighten text-white flex justify-between items-center py-6 px-4 shadow-md mt-3 text-center">
      <p className="flex gap-2 text-align-center">
        Copyright 2022 © GroupWatch
      </p>
      
    </div>
  );
};

export default Footer;
