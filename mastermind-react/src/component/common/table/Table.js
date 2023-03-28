export default function Table({id, children}){
    return(
      <table id={id} className="table table-bordered table-hover table-striped table-responsive">
          {children}
      </table>
    );
}