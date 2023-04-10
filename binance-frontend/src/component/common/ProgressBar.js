export default function ProgressBar({id, pbColor, pbWidth, value}) {
    return (
        <div className="progress">
            <div id={id}
                 className={"progress-bar ".concat(pbColor)}
                 style={{"width": pbWidth}}>{value}</div>
        </div>
    );
}