import { forwardRef } from "react"
import { FaCheck as Check } from "react-icons/fa6";
import { IoIosClose as X } from "react-icons/io";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked: boolean;
}
  
const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => (
    <label className="switch-label">
      <input
        type="checkbox"
        className="switch-input"
        ref={ref}
        {...props}
      />
      <div className={`switch-bg ${props.checked ? "checked" : ""}`}>
        <div className={`switch-toggle ${props.checked ? "checked" : ""}`}>
          {props.checked ? <Check size={20} /> : <X size={30} />}
        </div>
      </div>
    </label>
  ));
  
  export default Switch;