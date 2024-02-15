const Button = ({ action, children }) => {
    return (
      <button className="px-4 py-2 font-bold text-sm bg-green-500 text-white rounded shadow-md" onClick={action}>
        {children}
      </button>
    );
  }
  
export default Button;