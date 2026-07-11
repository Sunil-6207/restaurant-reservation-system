function Input({
    label,
    type = "text",
    placeholder,
    register,
    name
}) {
    return (
        <div className="mb-4">
            <label className="block mb-2 font-medium">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

export default Input;