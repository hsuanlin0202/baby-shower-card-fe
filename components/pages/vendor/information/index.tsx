import { InputLayoutProps } from "types"

export const InputLayout = ({ label, children }: InputLayoutProps): JSX.Element => {
  return (

    <div className="flex space-x-4">
      <label htmlFor="address" className="bg-gray-400 p-3 h-1/2 w-1/6">{label}</label>
      <div className="flex-col space-y-4 flex-1">
        {children}
      </div>
    </div>
  )
}