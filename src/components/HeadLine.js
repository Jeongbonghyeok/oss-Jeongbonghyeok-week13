
export default function HeadLine(props){
    return (<>
        <div className="mt-5" style={{ textAlign: "center" }}>
            <h1 style = {{fontFamily: "Montserrat", fontWeight:600 }} >Student List {props.title} Page</h1>
            <br/>
            <hr/>
        </div>
    </>);
}
