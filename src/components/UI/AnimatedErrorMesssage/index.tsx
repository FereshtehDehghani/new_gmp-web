const AnimatedErrorMessage = ({ message, show }: any) => (
  <div className={`transition-all duration-300 ${show ? "opacity-100" : "opacity-0"}`}>
    {show && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-right">
        {message}
      </div>
    )}
  </div>
);

export default AnimatedErrorMessage