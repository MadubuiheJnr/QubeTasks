import logo_icon from "/logo_icon.png";

export const LogoIcon = ({ className }: { className: string }) => {
  return <img src={logo_icon} alt="" className={className} />;
};

export const LogoText = ({ className }: { className: string }) => {
  return <p className={className}> QubeTask</p>;
};
