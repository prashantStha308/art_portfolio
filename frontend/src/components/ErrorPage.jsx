const ErrorPage = ({ title , message }) => {
    return (
      <div className="grid justify-center items-center gap-8">

        <div className="uppercase text-gray-800 text-3xl text-center font-bold"> 
            { title || "Some Error Occured" }
        </div>

        <div>
          <p className="text-gray-700 text-2xl text-center">
            { message || "An error has occured" }
          </p>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;
  