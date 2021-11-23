import { useEffect, useRef } from 'react';
import './PasswordCriteria.css';

export default function PasswordCriteria(props) {
    const { password, setLengthBool, setCasingBool, setNumberBool, setSpecialBool } = props;
    const casingCheck = new RegExp("(?=.*[a-z])(?=.*[A-Z])");
    const numberCheck = new RegExp("(?=.*[0-9])");
    const specialCheck = new RegExp("(?=.*[!@#$%^&*])");
    let lengthContent = useRef(<p id="length-criteria" className="criteria red"><i className="bi bi-x-circle-fill criteria-icon"></i>Length check</p>);
    let casingContent = useRef(<p id="casing-criteria" className="criteria red"><i className="bi bi-x-circle-fill criteria-icon"></i>Casing check</p>);
    let numberContent = useRef(<p id="number-criteria" className="criteria red"><i className="bi bi-x-circle-fill criteria-icon"></i>Number check</p>);
    let specialContent = useRef(<p id="special-criteria" className="criteria red"><i className="bi bi-x-circle-fill criteria-icon"></i>Special character check</p>);

    useEffect(() => {
        if (password.length > 7) {
            setLengthBool(true);
            lengthContent.current = <p id="length-criteria" className="criteria"><i className="bi bi-check-circle-fill criteria-icon"></i>Length check</p>;
            const criteria = document.getElementById("length-criteria");
            criteria.classList.remove("red");
            criteria.classList.add("green");
        } else {
            setLengthBool(false);
            lengthContent.current = <p id="length-criteria" className="criteria"><i className="bi bi-x-circle-fill criteria-icon"></i>Length check</p>;
            const criteria = document.getElementById("length-criteria");
            criteria.classList.remove("green");
            criteria.classList.add("red");
        };

        if (casingCheck.test(password)) {
            setCasingBool(true);
            casingContent.current = <p id="casing-criteria" className="criteria"><i className="bi bi-check-circle-fill criteria-icon"></i>Casing check</p>;
            const criteria = document.getElementById("casing-criteria");
            criteria.classList.remove("red");
            criteria.classList.add("green");
        } else {
            setCasingBool(false);
            casingContent.current = <p id="casing-criteria" className="criteria"><i className="bi bi-x-circle-fill criteria-icon"></i>Casing check</p>;
            const criteria = document.getElementById("casing-criteria");
            criteria.classList.remove("green");
            criteria.classList.add("red");
        };

        if (numberCheck.test(password)) {
            setNumberBool(true);
            numberContent.current = <p id="number-criteria" className="criteria"><i className="bi bi-check-circle-fill criteria-icon"></i>Number check</p>;
            const criteria = document.getElementById("number-criteria");
            criteria.classList.remove("red");
            criteria.classList.add("green");
        } else {
            setNumberBool(false);
            numberContent.current = <p id="number-criteria" className="criteria"><i className="bi bi-x-circle-fill criteria-icon"></i>Number check</p>;
            const criteria = document.getElementById("number-criteria");
            criteria.classList.remove("green");
            criteria.classList.add("red");
        };

        if (specialCheck.test(password)) {
            setSpecialBool(true);
            specialContent.current = <p id="special-criteria" className="criteria"><i className="bi bi-check-circle-fill criteria-icon"></i>Special character check</p>;
            const criteria = document.getElementById("special-criteria");
            criteria.classList.remove("red");
            criteria.classList.add("green");
        } else {
            setSpecialBool(false);
            specialContent.current = <p id="special-criteria" className="criteria"><i className="bi bi-x-circle-fill criteria-icon"></i>Special character check</p>;
            const criteria = document.getElementById("special-criteria");
            criteria.classList.remove("green");
            criteria.classList.add("red");
        };
    });

    return (
        <div id="password-criteria">
            {lengthContent.current}
            {casingContent.current}
            {numberContent.current}
            {specialContent.current}
        </div>
    );
};