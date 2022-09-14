import * as React from "react"
import classNames from "classnames"
import { useSession } from "next-auth/react"

interface FormContactProps extends React.HTMLProps<HTMLFormElement> {}

interface FormStatus {
  status: "success" | "error" | "fetching"
  message?: string
}

export function FormContact({ className, ...props }: FormContactProps) {
  const { data: session, status } = useSession()
  const [formStatus, setFormStatus] = React.useState<FormStatus>(null)

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)

    setFormStatus({ status: "fetching" })

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(data)),
    })

    if (!response.ok) {
      return setFormStatus({
        status: "error",
        message: "Произошла ошибка, попробуйте еще раз",
      })
    }

    return setFormStatus({
      status: "success",
      message: "Ваше сообщение было отправлено",
    })
  }

  return (
    <form
      className={classNames("grid gap-4", className)}
      onSubmit={onSubmit}
      {...props}
    >
      {formStatus?.message && (
        <p
          className={classNames("py-3 px-4 border", {
            "border-link bg-link/10 text-link":
              formStatus?.status === "success",
            "border-error bg-error/10 text-error":
              formStatus?.status === "error",
          })}
        >
          {formStatus.message}
        </p>
      )}

      <div className="relative z-0">
        
        {status === "authenticated" ? (
          <>
            <p>{session?.user.name}</p>
            <input type="hidden" name="mail" value={session?.user.name} />
          </>
        ) : (
          <input
            id="name"
            name="name"
            maxLength={255}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " />
        )}
        <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {"Ваше имя"} <span className="text-sm text-red-500">*</span>
        </label>
      </div>
      <div className="relative z-0">
        
        {status === "authenticated" ? (
          <>
            <p>{session?.user.email}</p>
            <input type="hidden" name="mail" value={session?.user.email} />
          </>
        ) : (
          <input
            type="email"
            id="mail"
            name="mail"
            maxLength={255}
            required
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " />
        )}
        <label htmlFor="mail" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {"Ваш e-mail"}{" "}
          <span className="text-sm text-red-500">*</span>
        </label>
      </div>
      
      <div className="relative z-0">
        
        <textarea
          id="message"
          name="message"
          required
          placeholder=" "
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></textarea>
        <label htmlFor="message" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {"Сообщение"} <span className="text-sm text-red-500">*</span>
        </label>
      </div>
      <div>
        <input
          type="submit"
          className="py-2 px-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-semibold rounded-md shadow-md shadow-cyan-500/50 focus:outline-none hover:shadow-lg"
          disabled={formStatus?.status === "fetching"}
          value={
            formStatus?.status === "fetching"
              ? "подождите..."
              : "Отправить"
          }
        />
      </div>
    </form>
  )
}
