import { Link } from "react-router-dom";

export default function ButtonConnect({ className, icon, title }) {
  return (
    <center className="btn__connectContainer">
      <Link to="/connect">
        <div className={className}>
          <div>
            <img
              src={`/icons/bulk/${icon}`}
              alt="money-recive.svg"
              height="30px"
              style={{ margin: "0" }}
            />
          </div>
          <p>{title}</p>
        </div>
      </Link>
    </center>
  );
}
