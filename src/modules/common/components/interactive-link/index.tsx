import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex justify-center items-center border py-2 px-6 gap-x-2 text-white bg-black hover:bg-transparent hover:text-black hover:border hover:border-black group font-light text-center tracing-widest"
      href={href}
      onClick={onClick}
      {...props}
    >
      <Text className="">{children}</Text>
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-150"
      />
    </LocalizedClientLink>
  )
}

export default InteractiveLink
