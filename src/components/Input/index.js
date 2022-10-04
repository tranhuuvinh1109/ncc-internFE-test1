function Input({name,type,handleInputChange,value,validate}) {
    return (
        <div className='input-component mt-2.5'>
          <label className='font-medium' htmlFor={name}>{name.toUpperCase()} :</label>
          <input className='input-add py-1.5 px-2 border border-amber-500 w-full' id={name} name={name} type={type} onChange={handleInputChange} value={value}></input>
          <p className="text-red-500 font-medium">
            {
              validate[name]
            }
          </p>
        </div>
      );
}

export default Input;