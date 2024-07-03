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
        {type === "greeting" &&
         <span className="text-bankGradient">
          &nbsp;{user}
          </span>}
      </h1>
      <p className="header-box-subtext">{subtext}</p>

      {type === "greeting" && (
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome, {user}!
        </h1>
      )}
      
    </div>
  );
};

export default Headerbox;
