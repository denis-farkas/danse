import { useEffect } from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = (props) => {
    const { onClick, text, type } = props;

    useEffect(() => {
        return () => {
            console.log("MOUNT AND UNMOUNT BUTTON");
        };
    }, []);

    return (
        <button
            type={type || "button"}
            className="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
};
Button.propTypes = {
    onClick: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};
export default Button
