export default function Button({id, label, click, bgColor}){
    return(
      <button id={id}
              onClick={click}
              className={"btn ".concat(bgColor)}>{label}</button>
    );
}