import React from 'react';

const Input = ({autoFocus, name, placeholder, type, className, fullWidth=true, value, onChange, required = true, hidden, ...rest}: {
    name: string,
    placeholder: string,
    type: string,
    fullWidth?: boolean,
    className?: string,
    value?: string | number | readonly string[],
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    required?: boolean,
    hidden?: boolean,
    ref?:  React.MutableRefObject<string>,
    autoFocus?: boolean,
    [key: string]: any // additional props
}, ref:any) => {
    return (
        <div className={`input-bar w-full ${!fullWidth ? 'md:w-1/2' : ''} px-3 ${hidden ? 'hidden' : ''}`}>
            <div className="relative w-full flex flex-wrap items-stretch my-3">
                <input
                    autoFocus={autoFocus}
                    ref={ref}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required={required}
                    className={`${className || ''} flex-grow px-4 py-3 placeholder-grey-dark text-bg-dark relative bg-white rounded-md text-sm border-2 border-input-border outline-none focus:outline-none focus:border-primary focus:shadow-outline w-full disabled:opacity-50 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-black`}
                    {...value ? {value} : {}}
                    onChange={onChange}
                    {...(rest ? rest : {}) }
                />
            </div>
        </div>
    );
};

export const InputField = React.forwardRef(Input);
