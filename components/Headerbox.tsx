const Headerbox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="Headerbox">
      <h1 className="header-box-title ">
        {title}
        {type === "greeting" &&(
         <span className="text-bankGradient">
          &nbsp;{user}
          </span>
          )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>    
    </div>
  );
};

export default Headerbox;
