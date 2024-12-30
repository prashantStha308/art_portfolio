const ErrorPage = () => {
    return (
      <div className="grid justify-center items-center gap-8">

        <div className="uppercase text-gray-800 text-3xl text-center font-bold">
            No Internet
        </div>

        <div>
          <p className="text-gray-700 text-2xl text-center">
            Please check your internet connection and try again
          </p>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;
  