import "./app-input.css"

export const AppInput = ({ id, warningTextId, lengthCriteriaId, lengthCriteriaIdText, passwordComparisonId, passwordComparisonIdText, numberAndSymbolCriteriaId, numberAndSymbolCriteriaIdText, warningTextColor, showWarningText, warningText, onChangehandler, onFocushandler, validInputcharaters, Title, label, name, value, className, placeholder, type = "text", required = false, fill = true, style = '' }) => {
    return (
        <div className="w-full">
            <label htmlFor="matricule" className="block text-sm font-medium text-gray-500">
                {label}<span className="text-red-500">*</span>
            </label>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                className="mt-1 text-sm block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => onChangehandler(e.target.value)}
            />
        </div>
    )
}
